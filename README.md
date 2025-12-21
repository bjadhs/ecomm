# Ecommerce Application
 backend as Nodejs Mongodb and fronend admin as ReactJS and user as ReactNative

## Backend
- First created a boilerplate for the backend using express and mongoose
- User model, router and controller to login and register
- Middleware for authentication to protect each route for user and error middleware
- ✅ address and wishlist router and controller
- [NEXT] connect to mongoatlas 
- fronend admin setup for deployment both to sevalla


20thDecSat:
- Tailwind Navbar/Sidebar + Products/Customers/Orders grids (TanStack Query fetches)
- Fixed CORS/Clerk token/Helmet issues → Sevalla deployed but failed

21stDecSun:
- Solved the issue when signin redirting to dashboard
- Setup helmet for content security policy setting script-src and connect-src for clerk script
- Setup cors for origin and credentials

