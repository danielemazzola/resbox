# 📦 Res-Box: Final Project for Rock the Code 🎸

## Introduction

Res-Box is an innovative web application designed to provide its users with the ability to purchase boxes or packs of beverages, enabling them to save money. Users can redeem their bonuses at any establishment affiliated with the platform, offering them flexibility and convenience.

## 🚀 Technologies Used

Here's a list of the key technologies and libraries utilized in this project:

| Technology                    | Version      |
| ----------------------------- | ------------ |
| **Node.js**                   | ^22.4.0      |
| **Express**                   | ^4.19.2      |
| **Mongoose**                  | ^8.4.5       |
| **jsonwebtoken**              | ^9.0.2       |
| **bcrypt**                    | ^5.1.1       |
| **Multer**                    | ^1.4.5-lts.1 |
| **Cloudinary**                | ^1.41.3      |
| **multer-storage-cloudinary** | ^4.0.0       |
| **Nodemailer**                | ^6.9.14      |
| **CORS**                      | ^2.8.5       |
| **Dotenv**                    | ^16.4.5      |
| **xlsx**                      | ^0.18.5      |

### Dev Dependencies

| Technology  | Version |
| ----------- | ------- |
| **Nodemon** | ^3.1.4  |

## 🏗️ Project Architecture

### Folder Structure and Explanation

#### `config/`

- **`helpers/`**
  - **`generateJWT.js`**: Used to create JWT tokens for user authentication and authorization.
  - **`generateToken.js`**: Used to generate password recovery tokens and secure tokens for various operations.
- **`CONFIGEMAIL.js`**: Contains configuration settings for sending emails through the application.
- **`CONNECTDDBB.js`**: Handles the connection setup to the MongoDB database.
- **`CONNECTION_CLOUDINARY.js`**: Manages the configuration and connection setup to Cloudinary for image and video management.

### Architecture Diagram

```
config/
│
├── helpers/
│   ├── generateJWT.js
│   └── generateToken.js
│
├── CONFIGEMAIL.js
├── CONNECTDDBB.js
└── CONNECTION_CLOUDINARY.js
```

#### `controllers/`

- **`adminController/`**

  - **`boxController/`**
    - **`boxController.js`**: Manages operations related to the boxes or packs of beverages.
  - **`customerController/`**
    - **`customerController.js`**: Manages customer-related operations and interactions.
  - **`emails/`**
    - **`sendEmails.js`**: Contains logic for sending emails within various controllers.
  - **`restaurantController/`**
    - **`restaurantController.js`**: Handles operations related to restaurants within the application.
  - **`adminController.js`**: Handles administrative functions and operations within the application.

- **`operationController/`**

  - **`operationController.js`**: Manages various operational functions and processes.

- **`restaurantController/`**

  - **`emails/`**
    - **`sendEmails.js`**: Email sending logic specific to user-related functions.
  - **`helpers/`**
    - **`isAdmin.js`**: Validate if user is Admion.
  - **`restaurantController.js`**: Handles operations related to restaurants within the application.

- **`reviewCommentsController/`**

  - **`reviewCommentsController.js`**: Handles operations related to review comments and feedback.

- **`userController/`**

  - **`emails/`**
    - **`sendEmails.js`**: Email sending logic specific to restaurant-related functions.
  - **`userController.js`**: Manages user-related operations and interactions.

    - **`isAdmin.js`**: Helper function to check if a user has administrative privileges.

  - **`userRestaurantController.js`**: Manages restaurant-related user operations.

### Architecture Diagram

```
controllers/
│
├── adminController/
│ ├── boxController/
│ │ └── boxController.js
│ ├── customerController/
│ │ └── customerController.js
│ ├─  emails/
│ │ └── sendEmails.js
│ ├── restaurantController/
│ │  └── restaurantController.js
│ └── adminController.js
│
├── operationController/
│ └── operationController.js
│
├── restaurantController/
│ ├── emails/
│ │ └── sendEmails.js
│ ├── helpers/
│ │ └── isAdmin.js
│ └── userRestaurantController.js
│
├── reviewCommentsController/
│ └── reviewCommentsController.js
│
└── userController/
  ├── emails/
  │ └── sendEmails.js
  └── userController.js

```

## 📂 Controller Functions

### 🔏 ADMIN CONTROLLER 🔏

#### 📦 `boxController.js` Functions

| Function Name | Description                          |
| ------------- | ------------------------------------ |
| `createBox`   | Creates a new box.                   |
| `update_box`  | Updates an existing box.             |
| `remove_box`  | Removes a box from the system.       |
| `get_box`     | Retrieves details of a specific box. |
| `get_boxes`   | Retrieves a list of all boxes.       |

#### 👤 `customerController.js` Functions

| Function Name  | Description                           |
| -------------- | ------------------------------------- |
| `getUser`      | Retrieves details of a specific user. |
| `updateStatus` | Updates the status of a user.         |
| `getUsers`     | Retrieves a list of all users.        |

#### 🍽️ `restaurantController.js` Functions

| Function Name               | Description                                 |
| --------------------------- | ------------------------------------------- |
| `newRestaurant`             | Creates a new restaurant profile.           |
| `confirmAccountrestaurant`  | Confirms the account of a restaurant.       |
| `updateRolesUserRestaurant` | Updates user roles within a restaurant.     |
| `getRestaurants`            | Retrieves a list of all restaurants.        |
| `getRestaurant`             | Retrieves details of a specific restaurant. |

#### 🛠️ `adminController.js` Functions

| Function Name     | Description                                 |
| ----------------- | ------------------------------------------- |
| `create`          | Creates a new administrative record.        |
| `login`           | Handles the login process for admins.       |
| `recoverPassword` | Initiates password recovery for admins.     |
| `newPassword`     | Sets a new password for an admin.           |
| `profile`         | Retrieves or updates admin profile details. |
| `updateAvatar`    | Updates the admin's avatar.                 |

### 🛍️ OPERATION CONTROLLER 🛍️

#### 🛠️ `operationController.js` Functions

| Function Name     | Description                                    |
| ----------------- | ---------------------------------------------- |
| `createOperation` | Creates a new operation by a user.             |
| `updateOperation` | Updates an existing operation by a restaurant. |

### 🍽️ RESTAURANT CONTROLLER 🍽️

#### 📧 Emails

| Function Name      | Description                          |
| ------------------ | ------------------------------------ |
| `newUserEmail`     | Sends a new user registration email. |
| `recoverEmail`     | Sends a password recovery email.     |
| `newPasswordEmail` | Sends an email with a new password.  |

#### 🛠️ Helpers

| Function Name | Description                                     |
| ------------- | ----------------------------------------------- |
| `isAdmin`     | Checks if a user has administrative privileges. |

#### 👤 `userRestaurantController.js` Functions

| Function Name     | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `create`          | Creates a new user profile for a restaurant.           |
| `login`           | Handles the login process for a restaurant user.       |
| `recoverPassword` | Initiates password recovery for a restaurant user.     |
| `newPassword`     | Sets a new password for a restaurant user.             |
| `profile`         | Retrieves or updates the profile of a restaurant user. |
| `updateAvatar`    | Updates the avatar of a restaurant user.               |

### 🛩️ REVIEW- COMMENT CONTROLLER 🛩️

#### 🛩️ `reviewCommentsController.js` Functions

| Function Name | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| `new_review`  | Creates a new review.                                              |
| `new_comment` | Adds a new comment to an existing review.                          |
| `reactions`   | Manages reactions (likes, dislikes, etc.) on reviews and comments. |

### 🤗 USER CONTROLLER 🤗

#### 📧 Emails

| Function Name      | Description                          |
| ------------------ | ------------------------------------ |
| `newUserEmail`     | Sends a new user registration email. |
| `recoverEmail`     | Sends a password recovery email.     |
| `newPasswordEmail` | Sends an email with a new password.  |

#### 🤗 `userController.js` Functions

| Function Name    | Description                           |
| ---------------- | ------------------------------------- |
| `create`         | Creates a new user profile.           |
| `confirmAccount` | Confirms the account of a user.       |
| `login`          | Handles the login process for a user. |

## 📂 Middleware Architecture

### Folder Structure

```
middleware/
│
├── deleteImage.js
├── existBox.js
├── existSecureTokenOperation.js
├── existToken.js
├── isAuth.js
├── uploadFile.js
├── uploadImage.js
└── userStatus.js
```

### Explanation

- **`deleteImage.js`**: Middleware to handle the deletion of images from Cloudinary.
- **`existBox.js`**: Middleware to check if a specific box exists in the system.
- **`existSecureTokenOperation.js`**: Middleware to validate the existence of a security code for operations.
- **`existToken.js`**: Middleware for password recovery processes for users, admins, and restaurant users.
- **`isAuth.js`**: Middleware to ensure that a user is authenticated (logged in).
- **`uploadFile.js`**: Middleware for handling file uploads using Multer.
- **`uploadImage.js`**: Middleware for handling image uploads using Multer and Cloudinary.
- **`userStatus.js`**: Middleware to verify if a user has been suspended or not.

## 📂 Routes Architecture

### Folder Structure

```
routes/
│
├── adminRoutes/
│ ├── adminRouter.js
│ └── boxRouter.js
│ └── customerRouter.js
│ └── restaurantRouter.js
│
├── customerRoutes/
│ └── userRouter.js
│
├── operationRoutes/
│ └── operationRouter.js
│
├── restaurantRoutes/
│ └── userRestaurantRouter.js
│
└── review_commentsRoutes/
  └── reviewCommentsRouter.js
```

### `adminRoutes/`

#### **`adminRouter.js`**

| HTTP Method | Endpoint | Description | Middleware |
| --- | --- | --- | --- |
| POST | `/register-admin` | Create a new admin. | - |
| POST | `/recovery-password` | Initiate password recovery for admin. | - |
| PUT | `/recovery-password/:token` | Set a new password for admin using token. | `existTokenAdmin` |
| POST | `/login` | Admin login. | - |
| GET | `/profile` | Get admin profile. | `isAuthSuperAdmin` |
| PUT | `/update-avatar` | Change admin avatar. | `isAuthSuperAdmin`, `profileAvatar.single('avatar')` |

#### **`boxRouter.js`**

| HTTP Method | Endpoint              | Description                    | Middleware                     |
| ----------- | --------------------- | ------------------------------ | ------------------------------ |
| POST        | `/create-box`         | Create a new box.              | `isAuthSuperAdmin`             |
| PUT         | `/update-box/:id_box` | Update an existing box.        | `existBox`, `isAuthSuperAdmin` |
| DELETE      | `/remove-box/:id_box` | Remove a box.                  | `existBox`, `isAuthSuperAdmin` |
| GET         | `/get-box/:id_box`    | Get details of a specific box. | `existBox`, `isAuthSuperAdmin` |
| GET         | `/get-all-boxes`      | Get a list of all boxes.       | `isAuthSuperAdmin`             |

### `customerRoutes/`

#### **`customerRouter.js`**

| HTTP Method | Endpoint                       | Description                     | Middleware         |
| ----------- | ------------------------------ | ------------------------------- | ------------------ |
| GET         | `/get-user/:id_user`           | Get details of a specific user. | `isAuthSuperAdmin` |
| PUT         | `/update-user-status/:id_user` | Update status of a user.        | `isAuthSuperAdmin` |
| GET         | `/get-users`                   | Get a list of all users.        | `isAuthSuperAdmin` |

### `restaurantRoutes/`

#### **`restaurantRouter.js`**

| HTTP Method | Endpoint | Description | Middleware |
| --- | --- | --- | --- |
| POST | `/create-restaurant` | Create a new restaurant. | `isAuthSuperAdmin`, `uploadFile.single('file')` |
| PUT | `/confirm-restaurant/:id_restaurant` | Confirm a restaurant account. | `isAuthSuperAdmin` |
| PUT | `/update-roles-restaurant/:id_user` | Update roles of users in a restaurant. | `isAuthSuperAdmin` |
| GET | `/get-restaurant/:id_restaurant` | Get details of a specific restaurant. | `isAuthSuperAdmin` |
| GET | `/get-all-restaurants` | Get a list of all restaurants. | `isAuthSuperAdmin` |

### `customerRoutes/`

#### **`userRouter.js`**

| HTTP Method | Endpoint | Description | Middleware |
| --- | --- | --- | --- |
| POST | `/register` | Create a new user. | - |
| PUT | `/confirm-account/:id_user` | Confirm user account. | - |
| POST | `/recovery-password` | Initiate password recovery for user. | - |
| PUT | `/recovery-password/:token` | Set a new password for user using token. | `existTokenUser` |
| POST | `/login` | User login. | - |
| GET | `/profile` | Get user profile. | `isAuthUser` |
| PUT | `/update-avatar` | Change user avatar. | `isAuthUser`, `profileAvatar.single('avatar')` |
| PUT | `/buy-box/:id_box` | Allows user to buy a box. | `existBox`, `isAuthUser` |

### `operationRoutes/`

#### **`operationRouter.js`**

| HTTP Method | Endpoint | Description | Middleware |
| --- | --- | --- | --- |
| POST | `/create-operation/:id_box` | Create a new operation for a box. | `isAuthUser`, `userStatus` |
| PUT | `/update-operation/:secure_token` | Update an existing operation using a secure token. | `isAuthRestaurant`, `existSecureTokenOperation` |

### `review_commentsRoutes/`

#### **`reviewCommentsRouter.js`**

| HTTP Method | Endpoint                     | Description                                    | Middleware         |
| ----------- | ---------------------------- | ---------------------------------------------- | ------------------ |
| POST        | `/new-review/:id_restaurant` | Create a new review for a restaurant.          | `isAuthUser`       |
| PUT         | `/new-comment/:id_review`    | Add a new comment to an existing review.       | `isAuthRestaurant` |
| POST        | `/reaction/:id_review`       | Manage reactions (likes, dislikes) on reviews. | `isAuthUser`       |

### Architecture Diagram

```
├── uploads/

```

## Explanation of the `newRestaurant` Function

This code is part of the `newRestaurant` function, which processes an Excel file containing information about new restaurants. Here's a detailed breakdown of the workflow:

1. **Temporary File Storage:**

   - The file uploaded by the user is temporarily stored in the `uploads` folder. This folder is used to hold files during the processing phase before they are deleted.

2. **Reading the File:**

   - The `newRestaurant` function accesses the file using the path provided by `req.file.path`.
   - The file is read using the `xlsx` module to extract its contents. The Excel file’s sheet names and data are retrieved and converted into JSON objects for further processing.

3. **Processing the File:**

   - **Reading the Content:**

     - `xlsx.readFile(filePath)` reads the Excel file.
     - `reedFilePath.SheetNames` retrieves the names of the sheets within the file.
     - `xlsx.utils.sheet_to_json` converts the data from the first sheet into an array of JSON objects, where each object represents a row from the spreadsheet.

   - **Processing Each Restaurant:**
     - The `processRestaurant` function handles each restaurant’s data individually.
     - It checks if a restaurant with the provided email already exists in the database.
     - If the restaurant does not exist, a new entry is created in the `Restaurant` collection with the provided data.
     - If the restaurant already exists (i.e., a duplicate email is found), the email is added to the `duplicateEmail` list.

4. **Error Handling:**

   - Any errors encountered during the processing of individual restaurants are logged to the console.

5. **Response to Client:**

   - After processing all restaurants, a response is sent indicating the success of the operation and listing any duplicate emails found.

6. **Deleting the Temporary File:**
   - The temporary file in the `uploads` folder is deleted using `fs.unlink` once processing is complete. Any errors during file deletion are also logged.

## Purpose of the `uploads` Folder

The `uploads` folder is used to temporarily store files uploaded by users during processing. In the context of the `newRestaurant` function, it specifically serves the following purposes:

- **Temporary Storage:** Holds Excel files uploaded by users before processing them.
- **Processing:** Provides a location for files to be read and processed.
- **Cleanup:** Ensures files are removed after processing to avoid clutter and potential security issues.

## Excel File Format

The Excel file must follow a specific format to be processed correctly. The file should contain the following columns:

| Column                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `restaurant_name`     | Name of the restaurant.                            |
| `restaurant_cif`      | CIF of the restaurant.                             |
| `owner_name`          | Name of the restaurant owner.                      |
| `owner_lastName`      | Last name of the restaurant owner.                 |
| `phone`               | Phone number of the restaurant.                    |
| `email`               | Email address of the restaurant.                   |
| `bank_name`           | Name of the bank where transactions are conducted. |
| `bank_number_account` | Bank account number of the restaurant.             |
| `offices_address`     | Address of the restaurant’s offices.               |
| `coordinate_x`        | X-coordinate of the restaurant’s location.         |
| `coordinate_y`        | Y-coordinate of the restaurant’s location.         |

Each row in the Excel file should represent a single restaurant, with data organized according to these columns. The file must be in `.xlsx` format to be properly processed by the `newRestaurant` function.

## Environment Variables

Below are the environment variables used in the project, along with their purposes:

### **`FRONTEND_URL_IP`**

- **Usage:** Specifies the URL for the frontend application. This is used for configuring CORS policies and redirecting users.

### **`CONNECT_DDBB`**

- **Usage:** Contains the connection string for connecting to the MongoDB database. This string includes the database name, username, password, and other connection options.

### **`JWT_KEY`**

- **Usage:** Used for signing and verifying JSON Web Tokens (JWTs). This key ensures the integrity and authenticity of tokens used for authentication and authorization.

### **`CLOUDINARY_NAME`**

- **Usage:** Specifies the Cloudinary account name. This is used for uploading and managing images and videos through the Cloudinary API.

### **`CLOUDINARY_KEY`**

- **Usage:** Cloudinary API key for accessing Cloudinary services. This key is required for authentication when making API requests.

### **`CLOUDINARY_SECRET`**

- **Usage:** Cloudinary API secret used in conjunction with the API key for secure API access. This secret helps authenticate API requests.

### **`EMAIL_HOST`**

- **Usage:** Email address used as the sender for various email communications, such as password recovery and notifications.

### **`PASSWORD_HOST`**

- **Usage:** Password for the email account specified in `EMAIL_HOST`. Used for authenticating the email account when sending emails.

## About Me

### Daniele Mazzola

_Full Stack Developer_

<img src="https://res.cloudinary.com/dikdpoylq/image/upload/v1719298167/avatar/glidqn3ssgmv2njtyqnx.png" alt="Daniele Mazzola's Avatar" width="150" style="border-radius: 20px;"/>

Connect with me on [LinkedIn](https://www.linkedin.com/in/daniele-mazzola/) <img src="https://static.vecteezy.com/system/resources/previews/023/986/970/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png" alt="LinkedIn Icon" width="20" style="vertical-align: middle;" />
