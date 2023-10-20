# XYZ Restro Project
XYZ Restro Project have two components one Frontend another Backend

## Frontend
Frontend is developed using ReactJS. It is a single page application. It used backend REST API to fetch data. Front end have:

1. Home Page
   Home page have a menu to navigate to other pages. It also have a login button to login to the application.

2. Login Page
    Login page have a login form to login to the application. It also have a register button to register to the application.
    Customers can register to the application. Staffs can be added to the application by admin.

3. Register Page
    Register page have a register form to register to the application. It also have a login button to login to the application.

4. Dashboard Page
    Dashboard page have a menu to navigate to other pages. It also have a logout button to logout from the application. Admin and
    Staffs can access this page. Customers can't access this page.
    
    4.1. Orders Page:    
         Orders page have a table to display all the orders buy the customers. It also have a button to order completed.

    4.2. Customers Page:
         Customers page have a table to display all the customers. It also have a button to delete the customer.

    4.3. Staffs Page:
        Staffs page have a table to display all the staffs. It have a button to add the staff. It also have a button to delete the staff.
        Adding Staffs it will ask for the staff details like name, email, password, role. Role can be admin or staff. Admin can add staffs.

    4.4. Products Page:
        Products page have a table to display all the products. It have a button to add the product. It also have a button to delete the product. Adding Products it will ask for the product details like name, price, image. Admin and Staff can add products.

5. Menu Page
   After login customers can access this page. Menu page have a resturant menu. It have a button to add the product to the cart.


## Backend
Backend is developed using NodeJS. It is a REST API. It is used to fetch data from the database. It have following endpoints.

1. /users
    1. POST /users
        This endpoint is used to register the user. It will ask for the user details like name, email, password, role. Role can be admin or staff. Admin can add staffs. 
    2. POST /users/login
        This endpoint is used to login the user. It will ask for the user details like email, password. It will return a token. This token is used to authenticate the user.
    3. GET /users
        This endpoint is used to get all the users. It will return all the users.
    4. DELETE /users/:id
        This endpoint is used to delete the user. It will ask for the user id. It will delete the user with the given id.

2. /products
    1. POST /products
        This endpoint is used to add the product. It will ask for the product details like name, price, image. Admin and Staff can add products.
    2. GET /products
        This endpoint is used to get all the products. It will return all the products.
    3. DELETE /products/:id
        This endpoint is used to delete the product. It will ask for the product id. It will delete the product with the given id.

3. /orders
    1. POST /orders
        This endpoint is used to add the order. It will ask for the order details like user, orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice. It will return the order.

    2. GET /orders
        This endpoint is used to get all the orders. It will return all the orders.

    3. GET /orders/:id
        This endpoint is used to get the order. It will ask for the order id. It will return the order with the given id.

    4. PUT /orders/:id/pay
        This endpoint is used to update the order. It will ask for the order id. It will return the order with the given id.
        
    5. PUT /orders/:id/deliver
        This endpoint is used to update the order. It will ask for the order id. It will return the order with the given id.        

