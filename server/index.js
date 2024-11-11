import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// User Routes
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType
      }
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Service Routes
app.post('/api/services', authenticateToken, async (req, res) => {
  try {
    const { type, description, price, duration, technicianId } = req.body;
    const service = await prisma.service.create({
      data: {
        type,
        description,
        price: parseFloat(price),
        duration: parseInt(duration),
        technicianId: parseInt(technicianId)
      }
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        technician: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    res.json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Appointment Routes
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { serviceId, date, notes } = req.body;
    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user.userId,
        serviceId: parseInt(serviceId),
        date: new Date(date),
        notes
      }
    });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: req.user.userId
      },
      include: {
        service: true
      }
    });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Diagnosis Routes
app.post('/api/diagnosis', authenticateToken, async (req, res) => {
  try {
    const { imageUrl, result } = req.body;
    const diagnosis = await prisma.diagnosis.create({
      data: {
        imageUrl,
        result
      }
    });
    res.json(diagnosis);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});