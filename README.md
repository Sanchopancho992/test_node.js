# test_node.js

## Getting Started

These instructions will help you set up and run the project locally.
### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sanchopancho992/test_node.js.git
   cd test_node.js
2. **Install dependencies**:
   ```bash
   npm install
3. **add .env**:
   create a .env file in the root directory and add your environment variables with DATABASE_URL="postgresql://<username>:<password>@localhost:5432/feedback" and JWT_SECRET = secret_key
4. **Generate Prisma**:

3. **run the application locally**:
   ```bash
   npm run dev
### TESTING
1. **Auth Endpoints (/auth)**
Route: /auth/register
Method: POST
Description: Register a new user.
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123",
  "avatar": "http://example.com/avatar.jpg"
}

Route: /auth/login
Method: POST
Description: Log in as an existing user.
Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}

Route: /auth/me
Method: GET
Description: Get the currently authenticated user's details.
Headers
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
2. **Feedback Endpoints (/feedbacks)**
Route: /feedbacks (GET)
Method: GET
Description: Retrieve a list of feedback posts.
Query Parameters (optional):
category: Filter by category.
status: Filter by status.
sort: Sort by votes or created_at.
page: Page number for pagination.
limit: Number of items per page.

Route: /feedbacks (POST)
Method: POST
Description: Create a new feedback post.
Headers
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
Body (JSON):
{
  "title": "New Feedback",
  "description": "Detailed description here...",
  "category": "UI",
  "status": "Idea"
}





