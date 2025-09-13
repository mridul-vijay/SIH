// server.js - Main server file for Arogya Kerala Backend

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arogya-kerala', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Models

// User Schema (Healthcare providers, administrators, workers)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'healthcare_provider', 'ngo', 'worker'], 
    required: true 
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    organization: String,
    designation: String,
    language: { type: String, default: 'en' }
  },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Migrant Worker Schema
const migrantWorkerSchema = new mongoose.Schema({
  workerId: { type: String, unique: true, required: true },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    nationality: String,
    homeState: String,
    languages: [String],
    photo: String, // Base64 encoded or file path
    identificationNumber: String,
    identificationType: { type: String, enum: ['aadhaar', 'passport', 'voter_id', 'other'] }
  },
  contactInfo: {
    phone: String,
    alternatePhone: String,
    email: String,
    currentAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String
    },
    homeAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String
    }
  },
  employmentInfo: {
    currentEmployer: String,
    jobType: String,
    workLocation: String,
    employmentStartDate: Date,
    contractEndDate: Date,
    salary: Number,
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    }
  },
  healthRecords: [{
    date: Date,
    provider: String,
    diagnosis: String,
    treatment: String,
    medications: [String],
    allergies: [String],
    chronicConditions: [String],
    visitType: { type: String, enum: ['consultation', 'emergency', 'follow-up', 'vaccination'] },
    documents: [String], // File paths or base64 encoded files
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  vaccinations: [{
    vaccineName: String,
    dateAdministered: Date,
    nextDueDate: Date,
    batchNumber: String,
    administeredBy: String,
    location: String,
    sideEffects: String,
    certificate: String // File path or base64
  }],
  healthStatus: {
    bloodGroup: String,
    height: Number,
    weight: Number,
    bmi: Number,
    lastCheckup: Date,
    currentMedications: [String],
    knownAllergies: [String],
    chronicDiseases: [String],
    mentalHealthStatus: String,
    smokingStatus: { type: String, enum: ['never', 'former', 'current'] },
    alcoholConsumption: { type: String, enum: ['none', 'occasional', 'regular', 'heavy'] }
  },
  registrationDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  consentGiven: { type: Boolean, default: false },
  privacySettings: {
    shareWithEmployer: { type: Boolean, default: false },
    shareWithGovernment: { type: Boolean, default: true },
    shareForResearch: { type: Boolean, default: false }
  }
});

const MigrantWorker = mongoose.model('MigrantWorker', migrantWorkerSchema);

// Health Alert Schema
const healthAlertSchema = new mongoose.Schema({
  alertId: { type: String, unique: true, required: true },
  type: { 
    type: String, 
    enum: ['outbreak', 'vaccination_due', 'checkup_reminder', 'epidemic_warning'],
    required: true 
  },
  severity: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'],
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  targetAudience: {
    location: [String], // Districts/areas
    ageRange: { min: Number, max: Number },
    gender: String,
    occupation: [String]
  },
  affectedWorkers: [{ type: String, ref: 'MigrantWorker' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  expiryDate: Date,
  actionRequired: String,
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  createdAt: { type: Date, default: Date.now }
});

const HealthAlert = mongoose.model('HealthAlert', healthAlertSchema);

// Telemedicine Consultation Schema
const consultationSchema = new mongoose.Schema({
  consultationId: { type: String, unique: true, required: true },
  worker: { type: String, ref: 'MigrantWorker', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: { 
    type: String, 
    enum: ['general', 'follow-up', 'mental-health', 'emergency'],
    required: true 
  },
  symptoms: [String],
  diagnosis: String,
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  recommendations: String,
  followUpRequired: { type: Boolean, default: false },
  followUpDate: Date,
  sessionNotes: String,
  duration: Number, // in minutes
  meetingLink: String,
  recordingPath: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date
});

const Consultation = mongoose.model('Consultation', consultationSchema);

// Analytics Schema for tracking health trends
const analyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  location: { type: String, required: true }, // District/area
  metrics: {
    totalRegistrations: { type: Number, default: 0 },
    activeWorkers: { type: Number, default: 0 },
    healthCheckups: { type: Number, default: 0 },
    vaccinations: { type: Number, default: 0 },
    consultations: { type: Number, default: 0 },
    alerts: { type: Number, default: 0 }
  },
  diseaseOutbreaks: [{
    disease: String,
    cases: Number,
    recovered: Number,
    active: Number
  }],
  vaccinationCoverage: [{
    vaccine: String,
    administered: Number,
    targetPopulation: Number,
    coveragePercent: Number
  }]
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware for role-based authorization
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Utility functions
const generateId = (prefix) => {
  return `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const generateJWT = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '24h' }
  );
};

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // Or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Routes

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, role, profile } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      role,
      profile,
      verificationToken
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your Arogya Kerala account',
      html: `
        <h1>Welcome to Arogya Kerala</h1>
        <p>Please click the link below to verify your account:</p>
        <a href="${verificationUrl}">Verify Account</a>
      `
    });

    res.status(201).json({ 
      message: 'User registered successfully. Please check your email to verify your account.' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({ error: 'Please verify your email first' });
    }

    // Generate JWT
    const token = generateJWT(user);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Migrant Worker Routes
app.post('/api/workers/register', authenticateToken, authorizeRoles('admin', 'healthcare_provider', 'ngo'), async (req, res) => {
  try {
    const workerData = req.body;
    workerData.workerId = generateId('WKR');

    const worker = new MigrantWorker(workerData);
    await worker.save();

    res.status(201).json({
      message: 'Worker registered successfully',
      workerId: worker.workerId
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Worker already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/workers', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, location, status } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { 'personalInfo.firstName': { $regex: search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: search, $options: 'i' } },
        { workerId: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) {
      query['contactInfo.currentAddress.district'] = location;
    }
    
    if (status) {
      query.isActive = status === 'active';
    }

    const workers = await MigrantWorker.find(query)
      .select('-healthRecords -vaccinations') // Exclude sensitive data in list view
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ registrationDate: -1 });

    const total = await MigrantWorker.countDocuments(query);

    res.json({
      workers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/workers/:workerId', authenticateToken, async (req, res) => {
  try {
    const { workerId } = req.params;
    
    const worker = await MigrantWorker.findOne({ workerId })
      .populate('healthRecords.addedBy', 'profile.firstName profile.lastName email');
    
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/workers/:workerId', authenticateToken, authorizeRoles('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const { workerId } = req.params;
    const updateData = req.body;
    updateData.lastUpdated = new Date();

    const worker = await MigrantWorker.findOneAndUpdate(
      { workerId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.json({ message: 'Worker updated successfully', worker });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Records Routes
app.post('/api/workers/:workerId/health-records', authenticateToken, authorizeRoles('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const { workerId } = req.params;
    const healthRecord = {
      ...req.body,
      date: new Date(),
      addedBy: req.user.userId
    };

    const worker = await MigrantWorker.findOneAndUpdate(
      { workerId },
      { 
        $push: { healthRecords: healthRecord },
        $set: { lastUpdated: new Date() }
      },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.status(201).json({ 
      message: 'Health record added successfully',
      record: worker.healthRecords[worker.healthRecords.length - 1]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vaccination Routes
app.post('/api/workers/:workerId/vaccinations', authenticateToken, authorizeRoles('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const { workerId } = req.params;
    const vaccination = req.body;

    const worker = await MigrantWorker.findOneAndUpdate(
      { workerId },
      { 
        $push: { vaccinations: vaccination },
        $set: { lastUpdated: new Date() }
      },
      { new: true }
    );

    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }

    res.status(201).json({ 
      message: 'Vaccination record added successfully',
      vaccination: worker.vaccinations[worker.vaccinations.length - 1]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Alerts Routes
app.post('/api/alerts', authenticateToken, authorizeRoles('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const alertData = {
      ...req.body,
      alertId: generateId('ALT'),
      createdBy: req.user.userId
    };

    const alert = new HealthAlert(alertData);
    await alert.save();

    // Send notifications to affected workers (implement push notifications/SMS/email)
    // This would integrate with notification services

    res.status(201).json({
      message: 'Health alert created successfully',
      alertId: alert.alertId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/alerts', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, severity, type, location } = req.query;
    
    let query = { isActive: true };
    
    if (severity) query.severity = severity;
    if (type) query.type = type;
    if (location) query['targetAudience.location'] = location;

    const alerts = await HealthAlert.find(query)
      .populate('createdBy', 'profile.firstName profile.lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await HealthAlert.countDocuments(query);

    res.json({
      alerts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Telemedicine Routes
app.post('/api/consultations/schedule', authenticateToken, async (req, res) => {
  try {
    const consultationData = {
      ...req.body,
      consultationId: generateId('CON'),
      provider: req.user.userId
    };

    const consultation = new Consultation(consultationData);
    await consultation.save();

    res.status(201).json({
      message: 'Consultation scheduled successfully',
      consultationId: consultation.consultationId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/consultations', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, date, workerId } = req.query;
    
    let query = {};
    
    if (req.user.role === 'healthcare_provider') {
      query.provider = req.user.userId;
    }
    
    if (status) query.status = status;
    if (workerId) query.worker = workerId;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.scheduledDate = { $gte: startDate, $lt: endDate };
    }

    const consultations = await Consultation.find(query)
      .populate('worker', 'personalInfo.firstName personalInfo.lastName workerId')
      .populate('provider', 'profile.firstName profile.lastName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ scheduledDate: -1 });

    const total = await Consultation.countDocuments(query);

    res.json({
      consultations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/consultations/:consultationId', authenticateToken, async (req, res) => {
  try {
    const { consultationId } = req.params;
    const updateData = req.body;

    if (updateData.status === 'completed') {
      updateData.completedAt = new Date();
    }

    const consultation = await Consultation.findOneAndUpdate(
      { consultationId, provider: req.user.userId },
      updateData,
      { new: true }
    );

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    res.json({ message: 'Consultation updated successfully', consultation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Analytics Routes
app.get('/api/analytics/dashboard', authenticateToken, authorizeRoles('admin', 'healthcare_provider'), async (req, res) => {
  try {
    const { startDate, endDate, location } = req.query;
    
    let matchQuery = {};
    if (startDate && endDate) {
      matchQuery.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }
    if (location) {
      matchQuery.location = location;
    }

    const analytics = await Analytics.find(matchQuery).sort({ date: -1 });

    // Get current statistics
    const totalWorkers = await MigrantWorker.countDocuments({ isActive: true });
    const totalConsultations = await Consultation.countDocuments();
    const activeAlerts = await HealthAlert.countDocuments({ isActive: true });
    
    const recentRegistrations = await MigrantWorker.countDocuments({
      registrationDate: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      analytics,
      summary: {
        totalWorkers,
        totalConsultations,
        activeAlerts,
        recentRegistrations
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// File Upload Route
app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // In production, you would upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
    const fileData = {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer.toString('base64')
    };

    res.json({
      message: 'File uploaded successfully',
      fileId: crypto.randomBytes(16).toString('hex'),
      filename: fileData.filename
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Arogya Kerala server running on port ${PORT}`);
});

module.exports = app;
  