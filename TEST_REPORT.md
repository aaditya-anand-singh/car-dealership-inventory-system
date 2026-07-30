# 🧪 Test Report
# Car Dealership Inventory System


## 1. Testing Overview


Testing was performed to verify that all major features of the application are working correctly.

The testing covered:

- Authentication
- Authorization
- Vehicle Management
- Search Functionality
- Pagination
- Purchase Flow
- Stock Management
- Frontend and Backend Integration



---

# 2. Testing Environment


## Backend


Node.js
Express.js
MySQL



## Frontend


React.js
Vite
Tailwind CSS



## Browser


Google Chrome




---

# 3. Test Cases


| Test Case | Expected Result | Status |
|---|---|---|
| User Registration | New user should be created | ✅ Passed |
| User Login | User should receive JWT token | ✅ Passed |
| Invalid Login | Error message should appear | ✅ Passed |
| Admin Access | Admin dashboard should open | ✅ Passed |
| Customer Access | Customer dashboard should open | ✅ Passed |
| Add Vehicle | Vehicle should be added | ✅ Passed |
| Update Vehicle | Vehicle details should update | ✅ Passed |
| Delete Vehicle | Vehicle should be removed | ✅ Passed |
| Restock Vehicle | Stock quantity should increase | ✅ Passed |
| Search Vehicle | Filtered results should appear | ✅ Passed |
| Pagination | Correct page data should load | ✅ Passed |
| Purchase Vehicle | Stock should decrease | ✅ Passed |



---

# 4. API Testing


## Authentication APIs


### Register API

Endpoint:


POST /api/auth/register



Result:


PASS



---

### Login API

Endpoint:


POST /api/auth/login



Result:


PASS




---

# Vehicle APIs


## Get Vehicles



GET /api/vehicles



Result:


PASS



---

## Add Vehicle



POST /api/vehicles



Result:


PASS



---

## Update Vehicle



PUT /api/vehicles/:id



Result:


PASS



---

## Delete Vehicle



DELETE /api/vehicles/:id



Result:


PASS



---

## Purchase Vehicle



POST /api/vehicles/:id/purchase



Result:


PASS




---

# 5. Frontend Testing


Verified:


✅ Login Page

✅ Register Page

✅ Admin Dashboard

✅ Customer Dashboard

✅ Vehicle Details Page

✅ Search Component

✅ Pagination Component

✅ Navigation

✅ Logout Functionality



---

# 6. Bugs Found During Development


## Issue 1: Foreign Key Constraint Error


Problem:


Cannot add or update a child row:
foreign key constraint fails



Cause:

Invalid createdBy user id was inserted.


Solution:

Verified JWT user id and database relationship.



---

## Issue 2: Pagination Header Issue


Problem:

Total pages were not displaying.


Solution:

Configured exposed headers in CORS.


---

## Issue 3: Authentication Flow


Problem:

Protected APIs were accessible without token.


Solution:

Implemented JWT middleware.



---

# 7. Final Testing Result


| Category | Result |
|-|-|
| Backend APIs | PASS |
| Database Integration | PASS |
| Authentication | PASS |
| Authorization | PASS |
| Frontend UI | PASS |
| CRUD Operations | PASS |
| Purchase Flow | PASS |


## Final Status


ALL TEST CASES PASSED ✅