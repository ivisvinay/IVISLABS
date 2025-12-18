import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import logger from './config/logger';
import { errorHandler } from './middleware/errorHandler';
import { setSocketServer } from './services/notification.service';
import { verifyToken } from './utils/jwt';

// Routes
import authRoutes from './routes/auth.routes';
import problemRoutes from './routes/problem.routes';
import submissionRoutes from './routes/submission.routes';
import companyRoutes from './routes/company.routes';
import studentRoutes from './routes/student.routes';
import notificationRoutes from './routes/notification.routes';
import creditRoutes from './routes/credit.routes';
import publicRoutes from './routes/public.routes';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.io setup
const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Socket.io authentication and connection handling
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const payload = verifyToken(token);
    socket.data.user = payload;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  const userId = socket.data.user.userId;
  socket.join(userId);
  logger.info(`User ${userId} connected to Socket.io`);

  socket.on('disconnect', () => {
    logger.info(`User ${userId} disconnected from Socket.io`);
  });
});

setSocketServer(io);

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  message: 'Too many requests from this IP, please try again later',
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/public', publicRoutes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📡 Socket.io server running`);
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
