# Product Management App

## Overview
**Product Management App** is a **full-stack web application** that allows users to manage products efficiently. Users can **add, view, edit, and delete products** through an interactive and responsive interface. This project is built to practice full-stack development concepts using **React.js** for the frontend and **Node.js + Express.js** for the backend, with **MongoDB** as the database.

---

## Features
- **Add Product:** Create new products with details like name, price, description, and category.  
- **View Products:** See all products in a clean list format.  
- **Edit Product:** Update product information easily.  
- **Delete Product:** Remove products when needed.  
- **Responsive Design:** Works well on both desktop and mobile screens.  

---

## Project Structure

product_app/
├── backend/
│ ├── models/Product.ts # Defines the product schema for the database
│ ├── routes/products.ts # API endpoints for CRUD operations
│ ├── server.ts # Backend server setup and database connection
│ ├── nodemon.json # Nodemon configuration for auto-reloading
│ ├── package.json # Backend dependencies and scripts
│ └── tsconfig.json # TypeScript configuration
└── frontend/
├── ProductForm.jsx # Form component to add or edit products
├── ProductList.jsx # Component to display all products
├── ProductModal.jsx # Modal popup for add/edit product
└── types/Product.jsx # Type definitions for products in frontend

## How to run this project

In one command prompt,
Navigate to  project folder and then run these commands...
cd backend
npx nodemon dist/server.js 

In another command prompt,
Navigate to project folder and run...
cd frontend
npm install
npm start
