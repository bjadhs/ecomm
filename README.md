# Live Ecom Admin Dashboard
**Full-stack MERN app** | Deployed: https://ecomm-5xbtn.sevalla.app  
**Job-ready skills**: Auth → Protected CRUD → React Query → Dark mode

## Tech Stack

Frontend: React + Tailwind + TanStack Query + Clerk Auth
Backend: Node/Express + MongoDB + Inngest + Cloudinary
Deployment: Sevalla (CICD GitHub → Prod)

## Live Features
✅ **Dark/Light mode** toggle (persists localStorage)  
✅ **Protected routes** (Clerk auth + Admin-only access)  
✅ **Products CRUD** (Full admin management + image sync)  
✅ **Customers list** (Full admin view of registered users)  
✅ **Order Management** (Populated customer data + status updates)  
✅ **Address Management** (User CRUD for shipping details)  
✅ **Dynamic Search** (Storefront filtering with debounced logic)  

## Backend (Production Ready)

✅ User auth (login/register + JWT protect)
✅ Mongo seed scripts (10+ products/customers/orders)
✅ API routes: /api/products/customers/orders (protected)
✅ CORS + Helmet CSP for Clerk scripts
✅ Error middleware + validation

## Development Log (Recent Ships)
**23 Dec**: 
- Product Edit + Delete → Live 
- QueryState to handle loading and error states all pages
- Updating backend controller to background image cleanup which slowed down the delete process almost 4sec, Request → Delete MongoDB (50ms) → Send Response IMMEDIATELY → [Background: Cloudinary cleanup] → User gets instant feedback

- Updating backend controller to validate price and stock
- Spend time on refactoring the code based on coderabitai suggestion and git merge





**22 Dec**: Dark/Light theme + Orders populate debug → Live  
**21 Dec**: Signin redirect + Helmet/CORS → Deploy working  
**20 Dec**: Navbar/Sidebar + full CRUD grids → GitHub push  
---
## 2026
**3 Jan **: After checkout to Address page add address, edit and delete

**5 Jan **: Admin and frontend in one that only admin login can access admin dashboard

**7 Jan **: After checkout to Address page add address, edit and delete

**9 Jan **: Search functionality in home page, used useDebounce hook to prevent too many requests and filtered search query in client side. 

**19 Jan **: CAPTCHA error fixed in production adding security policy




## Next & Tomorrow
- View Single Product Page /product/:id
- Admin Dashboard Analytics
- Admin Stock management
- CartPage Checkout Payment Stripe
- Order Status Update
- Review and rating
- Wishlist



# Image reference
https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D