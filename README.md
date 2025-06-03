# 🌟 Bottle Admin

A powerful and clean admin dashboard system built with Vue 3, Vite, TypeScript, and Element Plus. Designed for scalability, maintainability, and ease of customization.

---

## 🚀 Features

- 🌈 Vue 3 Composition API
- ⚡ Lightning-fast development with Vite
- 🧩 Modular architecture and reusable components
- 🔐 Role-based access control (RBAC0)

---

## 📦 Project Setup
### Clone the project

```bash
git clone https://github.com/Bottle414/BackendManagement-frontend.git
```

### Install dependencies

```bash
npm install
```

### ⚠️ Backend Required

The frontend application **cannot function independently**.
Please make sure the backend server is **running**  
before starting the frontend with `pnpm dev`.
backend: [ManagementBackend](https://github.com/Bottle414/BackendManagement-backend)

### Start development server
```bash
npm run dev
```

## 📂 Directory Structure

<pre>
src/
├─ public/            # Static assets
|—— assets/           # Images, fonts, etc.
|   |—— images       
|   |—— icons         
|—— api/  # Apis
|    |—— ...          # communication interface
|    |—— index.ts     # axios
|
|—— style/            # styles
|   |—— _color.scss   # global color
|   |—— _variable.scss# global variable
|
│── components/       # reusable components
│   ├── Header.vue    # topbar
│   ├── Category.vue  # category component
│   ├── Sidebar.vue   # sidebar
|
|—— layout/           # view frame
|   |—— topbar/       # top
|   |—— main/         # second router view
|   |—— index.ts      # page frame
|   |—— logo.ts       # logo
|
│── views/            # views
│   ├── Home/
│   ├── About/        # [disposed]
│   ├── Login/
|   |—— Register/
|
│── router/           # routers
|   |—— index.ts 
|   |—— asyncRoutes
|   |—— basicRoutes
|   |—— permissions   # router guides
|
│── store/            # Pinia
|   |—— index.ts
|   |—— settingStore.ts  # store sidebar、flash status
|   |—— moudules
|         |—— userStore.ts 
|         |—— catogoryStore.ts
|
|—— .env.*            # environment configuration
|—— utils/
|—— setting.ts        # logo parameter
│── App.vue           # root component
│── main.ts           # entrance