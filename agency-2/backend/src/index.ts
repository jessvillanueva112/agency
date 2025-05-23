import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRoutes from './routes/student'; // <-- Make sure this is here
import counselorRoutes from './routes/counselor';
import eventRoutes from './routes/event';
import consentRoutes from './routes/consent';
import communicationRoutes from './routes/communication';
import auditLogRoutes from './routes/auditLog';
import incidentRoutes from './routes/incident';
import assessmentRoutes from './routes/assessment';
import aiAssistantRoutes from './routes/ai_assistant';

// Load environment variables
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const app: Express = express();
const port = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());

// Register your routes here!
app.use('/api/students', studentRoutes);
app.use('/api/counselors', counselorRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/consents', consentRoutes);
app.use('/api/communications', communicationRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/ai-assistant', aiAssistantRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Agency API' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agency';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Basic Auth Middleware (for demo only)
app.use((req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth || auth !== 'Bearer agencytoken112secretshh') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

// Add this at the end of the file for the entry point skeleton
// import { AgencyAssistant } from './core/ai/assistant';
// async function main() {
//   const assistant = new AgencyAssistant(...);
//   await assistant.processWorkflow();
// }
// main().catch(console.error); 