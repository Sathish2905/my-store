# My Store

This project is a full-featured e-commerce store with role-based access control. The platform provides an Admin portal to manage categories, sub-categories, and products, while allowing regular users to browse, add items to their Wishlist or Cart, and proceed to Checkout.

## Features

### 1. User Roles
- **Admin**:
  - Login with username and password.
  - Manage Categories, Sub-categories, and Products (add, edit, delete).
- **User**:
  - Login to browse products by category.
  - Add products to Wishlist or Cart.
  - Checkout items from the Cart.

### 2. Authentication
- Secure username and password login system.
- Role-based access control to manage Admin and User permissions.

### 3. Product Management (Admin)
- Full control over categories, sub-categories, and products.
- Structured database management for scalable growth.

### 4. User Experience (User)
- Category-wise browsing.
- Options to add products to Wishlist or Cart.
- Easy-to-use checkout flow.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sathish2905/my-store.git
   cd my-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file for database configuration, authentication, etc.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- **/components** - Reusable UI components
- **/pages** - Page-level components for routing
- **/public** - Static assets
- **/utils** - Helper functions and utilities

## Technologies Used

- **Frontend**: React, Next.js
- **Backend**: Node.js
- **Database**: SQL-based Database
- **Authentication**: Role-based using username and password
- **State Management**: Context API / Redux (if applicable)

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [Sathish](https://github.com/Sathish2905).
```

This should give a clear overview of the project, its structure, and how to contribute! Let me know if you’d like any adjustments.
