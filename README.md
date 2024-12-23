# Test Node.js

## Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sanchopancho992/test_node.js.git
   cd test_node.js
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Add .env file**:
   
   Create a `.env` file in the root directory and add your environment variables:

   ```
   DATABASE_URL="postgresql://<username>:<password>@localhost:5432/feedback"
   JWT_SECRET="secret_key"
   ```

4. **Generate Prisma**:

   ```bash
   npx prisma generate
   ```

5. **Run the application locally**:

   ```bash
   npm run dev
   ```

## Testing

### Auth Endpoints (`/auth`)

#### Register a New User
- **Route**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Body (JSON)**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123",
    "avatar": "http://example.com/avatar.jpg"
  }
  ```

#### Log in as an Existing User
- **Route**: `/auth/login`
- **Method**: `POST`
- **Description**: Log in as an existing user.
- **Body (JSON)**:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

#### Get Authenticated User's Details
- **Route**: `/auth/me`
- **Method**: `GET`
- **Description**: Get the currently authenticated user's details.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```

### Feedback Endpoints (`/feedbacks`)

#### Retrieve a List of Feedback Posts
- **Route**: `/feedbacks`
- **Method**: `GET`
- **Description**: Retrieve a list of feedback posts.
- **Query Parameters (optional)**:
  - `category`: Filter by category.
  - `status`: Filter by status.
  - `sort`: Sort by `votes` or `created_at`.
  - `page`: Page number for pagination.
  - `limit`: Number of items per page.

#### Create a New Feedback Post
- **Route**: `/feedbacks`
- **Method**: `POST`
- **Description**: Create a new feedback post.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Body (JSON)**:
  ```json
  {
    "title": "New Feedback",
    "description": "Detailed description here...",
    "category": "UI",
    "status": "Idea"
  }
  ```

#### Update an Existing Feedback Post
- **Route**: `/feedbacks/:id`
- **Method**: `PUT`
- **Description**: Update an existing feedback post.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```
- **Body (JSON)** (only fields to update):
  ```json
  {
    "title": "Updated Feedback Title",
    "description": "Updated description of the feedback.",
    "category": "Feature Request",
    "status": "In Progress"
  }
  ```

#### Delete an Existing Feedback Post
- **Route**: `/feedbacks/:id`
- **Method**: `DELETE`
- **Description**: Delete an existing feedback post.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ```

### Upvote Endpoints (`/upvotes/feedbackID/number/upvote`)

#### Upvote a Feedback Post
- **Route**: `/upvotes/feedbackID/number/upvote`
- **Method**: `POST`
- **Description**: Upvote a feedback post.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <YOUR_TOKEN>"
  }
  ```

#### Get Upvote Information
- **Route**: `/upvotes/feedbackID/number/upvote`
- **Method**: `GET`
- **Description**: Get the information about the upvote.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <YOUR_TOKEN>"
  }
  ```

---

**Note**: The API calls were tested using Postman, and the migrations of Prisma schemas were saved in the repository.
