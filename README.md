# Live Ecom Admin Dashboard
**Full-stack MERN app** | Deployed: https://ecomm-5xbtn.sevalla.app  
**Proves job-ready skills**: Auth → Protected CRUD → React Query → Dark mode

## Tech Stack

Frontend: React + Tailwind + TanStack Query + Clerk Auth
Backend: Node/Express + MongoDB + Inngest + Cloudinary
Deployment: Sevalla (CICD GitHub → Prod)

## Live Features (Admin Dashboard)
✅ **Dark/Light mode** toggle (persists localStorage)  
✅ **Protected routes** (Clerk auth middleware)  
✅ **Products grid** (React Query fetch + images)  
✅ **Customers list** (full details populated)  
✅ **Orders list** (customer names populated via Mongo populate)  
✅ **Delete/Edit CRUD** (API mutations + auto-refetch)  

## Backend (Production Ready)

✅ User auth (login/register + JWT protect)
✅ Mongo seed scripts (10+ products/customers/orders)
✅ API routes: /api/products/customers/orders (protected)
✅ CORS + Helmet CSP for Clerk scripts
✅ Error middleware + validation

## Development Log (Recent Ships)
**23 Dec**: Product Edit + Delete → Live  
**22 Dec**: Dark/Light theme + Orders populate debug → Live  
**21 Dec**: Signin redirect + Helmet/CORS → Deploy working  
**20 Dec**: Navbar/Sidebar + full CRUD grids → GitHub push  

## Next & Tomorrow
- Admin: Product Page - upload images, refetch on every mutation