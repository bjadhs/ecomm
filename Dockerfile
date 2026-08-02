# syntax=docker/dockerfile:1

# --- frontend-build: compile the Vite SPA -----------------------------------
# VITE_* vars are inlined into the bundle at BUILD time, not read at runtime,
# so they have to arrive as build args (see docker-compose.yml `build.args`).
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci
COPY frontend/ ./

ARG VITE_CLERK_PUBLISHABLE_KEY
# Relative by default: the backend serves this bundle from the same origin, which
# is what keeps the Clerk session cookie working without an Authorization header.
ARG VITE_API_URL=/api
ARG VITE_ADMIN_EMAILS
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY \
    VITE_API_URL=$VITE_API_URL \
    VITE_ADMIN_EMAILS=$VITE_ADMIN_EMAILS
RUN npm run build

# --- backend-deps: production node_modules ----------------------------------
FROM node:22-alpine AS backend-deps
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --omit=dev

# --- runner: minimal production image ---------------------------------------
FROM node:22-alpine AS runner
# WORKDIR must be the backend directory. server.js:25 sets
# `__dirname = path.resolve()` — the process CWD, not the file's directory — so
# the static-serving path `../frontend/dist` only resolves from here.
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -g 1001 -S nodejs && adduser -S ecom -u 1001

COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY --chown=ecom:nodejs backend/ ./
COPY --from=frontend-build --chown=ecom:nodejs /app/frontend/dist /app/frontend/dist

# multer writes uploads to os.tmpdir() before pushing them to Cloudinary
# (multerMiddleware.js sets no `destination`), so /tmp must stay writable.
USER ecom
EXPOSE 3000
CMD ["node", "server.js"]
