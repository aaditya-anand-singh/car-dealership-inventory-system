//.env file for backend
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Zaxscd@8
DB_NAME=car_dealership

JWT_SECRET=your_secret_keynpm test


//.env file for frontend
VITE_API_URL=http://localhost:3000/api


# 🚗 Car Dealership Inventory System


## 📌 Project Overview


The **Car Dealership Inventory System** is a full-stack web application developed to manage vehicle inventory and provide customers with a platform to explore and purchase vehicles.


The system provides two different user roles:


### Admin

Admin can:

- Add new vehicles
- Update vehicle information
- Delete vehicles
- Restock vehicles
- Manage vehicle inventory
- Search vehicles


### Customer

Customer can:

- Register and login
- View available vehicles
- Search vehicles using filters
- View vehicle details
- Purchase vehicles


The application uses a React frontend, Node.js backend, Express.js API layer, and MySQL database for storing application data.



---

# ✨ Features


## 🔐 Authentication

- User Registration
- User Login
- JWT based authentication
- Password encryption using bcrypt
- Role-based access control


---

## 👨‍💼 Admin Features


Admin dashboard provides:


### Vehicle Management

- Add Vehicle
- Update Vehicle
- Delete Vehicle
- Restock Vehicle


### Inventory Management

- View all vehicles
- Track available stock
- Update stock automatically


---

## 👤 Customer Features


Customers can:


- Browse available cars
- Search vehicles
- Filter vehicles by:

    - Brand
    - Model
    - Fuel Type
    - Transmission
    - Price Range
Vehicle Stock = Vehicle Stock - 1



---

# 🔎 Search and Pagination


Implemented:


## Search

Customers and admins can search vehicles using:


- Vehicle brand
- Vehicle model
- Fuel type
- Transmission
- Price range


## Pagination


Vehicle listing uses pagination to improve performance.


Backend uses:
LIMIT
OFFSET

for fetching records.



---

# 🛠 Technology Stack


## Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Vite


## Backend

- Node.js
- Express.js
- JWT
- bcrypt
- mysql2


## Database

- MySQL 8


---

# 📂 Project Structure

car-dealership-inventory-system

│
├── car-dealership-backend
│
│ ├── config
│ │
│ ├── controllers
│ │
│ ├── middleware
│ │
│ ├── routes
│ │
│ ├── app.js
│ │
│ ├── server.js
│ │
│ └── package.json
│
│
└── car-dealership-frontend
│
├── src
│
├── pages
│
├── components
│
├── api
│
└── package.json



---

# ⚙️ Backend Setup


## Step 1: Navigate to backend

cd car-dealership-backend


## Step 2: Install dependencies

npm install



## Step 3: Create Environment File


Create:

.env


Add:

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=Zaxscd@8
DB_NAME=car_dealership

JWT_SECRET=your_secret_key



## Step 4: Start Backend

npm start



Backend will run:

http://localhost:3000



---

# 🗄 Database Setup


Create database:


```sql
CREATE DATABASE car_dealership;
Required tables:

Users Table

Stores:

User information
Login credentials
Role
Vehicles Table

Stores:

Vehicle details
Price
Fuel type
Transmission
Stock information

Relationship:
Users

  |

  |

createdBy

  |

  |

Vehicles
💻 Frontend Setup
Step 1:

Navigate:

cd car-dealership-frontend
Step 2:

Install dependencies:

npm install

Step 3:

Start React application:

npm run dev


Frontend runs:

http://localhost:5173
🔑 Authentication Flow
User

 |

 |

Login/Register

 |

 |

Backend Authentication

 |

 |

JWT Token Generated

 |

 |

Token Stored In Browser

 |

 |

Dashboard Access
Role based navigation:

Admin

 |

Admin Dashboard



Customer

 |

Customer Dashboard
🔌 API Endpoints
Authentication

Register:

POST /api/auth/register


Login:

POST /api/auth/login
Vehicle APIs

Get Vehicles:

GET /api/vehicles


Search Vehicles:

GET /api/vehicles/search


Add Vehicle:

POST /api/vehicles


Update Vehicle:

PUT /api/vehicles/:id


Delete Vehicle:
DELETE /api/vehicles/:id


Restock:

POST /api/vehicles/:id/restock


Purchase:

POST /api/vehicles/:id/purchase

📸 Screenshots

Add screenshots inside:

screenshots/


Example:

Login Page

Register Page

Admin Dashboard

Add Vehicle

Customer Dashboard

Vehicle Details

🧪 Testing

The application was tested for:

User registration
Login authentication
Admin authorization
Vehicle CRUD operations
Search functionality
Pagination
Purchase flow
Stock updates
🚧 Challenges Faced
1. Authentication

Implemented JWT based authentication and protected routes using middleware.

2. Database Relationships

Handled foreign key relationships between users and vehicles.

3. Dynamic Search

Created dynamic SQL queries based on optional filters.

4. Stock Management

Implemented automatic stock reduction after vehicle purchase.

🤖 My AI Usage

AI tools were used as a development assistant throughout the project.

Areas where AI helped:
1. Understanding Concepts

Used AI assistance to understand:

Express middleware
JWT authentication
Role based authorization
Database relationships
Pagination
2. Debugging

AI was used to analyze and resolve:

SQL errors
Backend API issues
Authentication problems
Frontend integration issues
3. UI Improvement

AI helped with:

Tailwind CSS styling ideas
Responsive layouts
Better component design
4. Documentation

AI assisted in:

Structuring README documentation
Improving project explanation
Organizing technical details

AI was used only as a learning and productivity tool. All implementation, testing, integration, and final decisions were performed manually.

🔮 Future Improvements

Possible future enhancements:

Add vehicle images
Add payment gateway
Add order history
Add customer purchase history
Add admin analytics dashboard
Add email notifications

👨‍💻 Author

Aaditya Anand Singh

GitHub:

https://github.com/aaditya-anand-singh

Thank you! Please consider it



## Additional Documentation

- [Test Report](TEST_REPORT.md)
- [AI Prompt History](PROMPTS.md)