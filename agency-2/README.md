# Agency - AI Assistant for School Counselors

An intelligent assistant designed to help school counselors manage their workload more efficiently by automating administrative tasks and providing smart insights.

## Tech Stack

- **Frontend:** React/Next.js
- **Backend:** Node.js/Express with TypeScript
- **Database:** MongoDB
- **AI Services:** Python microservices

## Project Structure

```
agency-2/
├── backend/           # Node.js/Express backend
├── frontend/          # React/Next.js frontend
├── docs/             # Documentation
└── scripts/          # Utility scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Python 3.8+ (for AI services)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5003
   MONGODB_URI=mongodb://localhost:27017/agency
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- AI-powered task automation
- Student data analysis and risk assessment
- Smart scheduling and reminders
- Secure data management
- Integration with school systems

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 