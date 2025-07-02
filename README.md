# Admin-Seller Node.js Project

This is a role-based backend system built with **Node.js and MongoDB**, where:
- Admins can create Sellers
- Sellers can manage Products with multiple brand options and images

---

## Flow of the Project

### 1. Admin Created (Seed Script)
We manually write and run a script (`seedAdmin.js`) to insert the first admin into MongoDB.

---

### 2. Admin Login API
Admin enters email and password and logs in.  
If valid, a **JWT token** is generated and stored in Postman under the Authorization section.

---

### 3. Create Seller (Admin Only)
Admin creates a seller.  
Before creating, the backend checks:
- if the role is "admin"
- if the token is valid using `verifyAdmin` middleware

If verified, the seller data is saved in the database.

---

### 4. Seller Login
Same login process as admin.  
If email and password are correct, the seller gets a token.  
This token is used for product-related actions.

---

### 5. Add Product (Seller Only)
Sellers can:
- Add multiple brands
- Add brand details, prices, and images

The data is submitted using **form-data** in Postman.  
We use **Multer** to upload and handle the images on the backend.

---

### 6. Product Listing with Pagination
Sellers can view their products page-wise.  
We use `page` and `limit` in the API:

---

## Security

- **JWT:** Used for managing login sessions.
- **Middlewares:** `verifyAdmin` and `verifySeller` check if the token is valid and if the role matches.
- **bcrypt:** Used to hash passwords before saving.
- **dotenv:** Used to store sensitive data like database URI and secret keys.

---

## Tech Stack

| Purpose        | Tool / Library         |
|----------------|------------------------|
| Backend        | Node.js + Express      |
| Database       | MongoDB + Mongoose     |
| Auth           | JWT                    |
| File Upload    | Multer                 |
| API Testing    | Postman                |

---

## API Endpoints

| Action             | Method | URL                                             |
|--------------------|--------|--------------------------------------------------|
| Admin Login        | POST   | `/api/admin/login`                               |
| Create Seller      | POST   | `/api/admin/create-seller`                       |
| Seller Login       | POST   | `/api/seller/login`                              |
| Add Product        | POST   | `/api/seller/add-product`                        |
| List Products      | GET    | `/api/seller/products?page=1&limit=2`            |
| List Products      | DELETE | `/api/seller/delete-product/<productId>`         |

---

## How to Run the Project

1. Clone the repo
2. Install dependencies:
3. npm install
4. Create a .env file:
    | MONGO_URI=your_mongodb_uri
    | JWT_SECRET=your_secret_key
    | PORT=5000
5. Run admin seed script:
   node seedAdmin.js    
   Admin created successfully.

6. Start server > node index.js
