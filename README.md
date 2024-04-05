wartur_assighment
Install Required Packages:

Install the necessary packages to support database migration. For this assignment, we will use Prisma as the database ORM (Object-Relational Mapping) tool. You can install Prisma and its required dependencies using npm .

Create Categories Table Migration: Create a migration file to define the structure of the categories table. The table should include fields for id, name, picture, parent_id, created_at, and updated_at. Use the migration file to generate and apply the SQL schema changes to your MySQL database.

Create Products Table Migration: Similarly, create a migration file to define the structure of the products table. Include fields for id, name, picture, category_id, created_at, and updated_at. Generate and apply the SQL schema changes to your MySQL database.

Create CRUD API for Categories: Implement API endpoints to perform CRUD operations (Create, Read, Update, Delete) on categories. Each CRUD operation should correspond to a specific HTTP method (POST, GET, PUT, DELETE) and route.

Show Categories as Tree: Implement functionality to display categories as a tree structure. Each category should be displayed with its children categories, if any, in a hierarchical manner.

Show Count of Products for Recursive Children Categories: Extend the categories list to display the count of products for each category, including the products of its recursive children categories.

Create CRUD API for Products: Implement API endpoints to perform CRUD operations on products. Similar to categories, each CRUD operation should correspond to a specific HTTP method and route.

Show Top Parent Categories and Children of Selected Category in Product Form: Enhance the product form to display a dropdown menu for selecting categories. Display top-level parent categories in the dropdown and dynamically load children categories based on the selected category.

Resize Images While Uploading: Implement image resizing functionality while uploading product images. Use a library like Sharp to resize images to a maximum size of 3200x3200 pixels.

Ensure that you use MySQL as the database backend for storing categories, products, and related data.

steps to run project

first, npm install to install packages in package.json then, npm run migration and npm run migration-deploy then, npm run start to run app in localhost:3000 server there's allowed to test apis in postman collections published: https://documenter.getpostman.com/view/29786034/2sA35LVKoq
