# URL Shortener

A simple and efficient URL shortening service built with TypeScript and Node.js.

## Features

- Generate short URLs from long URLs.
- Redirect users to the original destination.
- RESTful API architecture.
- Input validation and error handling.
- MongoDB integration.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

```bash
git clone <your-repository-url>
cd <project-directory>
npm install
```

### Environment Variables

Create `backend/src/config/.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/url-shortener
PORT=8000
```

For MongoDB Atlas, use the connection string provided by Atlas as the value of
`MONGODB_URI`. Keep this file private; it is excluded from Git.

### Run Locally

```bash
npm --prefix backend run dev
```

## Project Status

🚧 Currently under development.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.