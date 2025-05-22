# Agency - AI Assistant for School Counselors

An intelligent assistant wtih blockchain designed to help school counselors manage their workload more efficiently by automating administrative tasks and providing smart insights.

## Tech Stack (Updated)

- **Frontend:** React/Next.js
- **Backend:** Node.js/Express (TypeScript)
- **Database:** MongoDB
- **AI Services:** Python/Flask microservices (risk, NLP)
- **Blockchain:** Ethereum (Ganache local), Solidity, Hardhat, ethers.js
- **Deployment:** Docker Compose

## Quick Start

1. **Start Ganache** (local blockchain, port 7545).
2. **Compile & Deploy Smart Contract:**
   ```sh
   cd agency-2/backend
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   ```
3. **Update `utils/auditLogger.js` with contract address and ABI.**
4. **Start Docker Compose:**
   ```sh
   docker compose up --build
   ```
5. **Start Frontend:**
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
6. **Demo:**
   - Use the dashboard to trigger predictions.
   - Events are logged to blockchain (view in Ganache).

## Features

- AI-powered risk and note-type predictions
- Blockchain audit logging for compliance
- Unified dashboard for counselors

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
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000) (frontend and API).

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