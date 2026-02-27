const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// Controllers
const createCRUDController = require('../controllers/crudController');
const { getSettings, updateSetting } = require('../controllers/settingsController');
const { register, login, verifyToken, bypassLogin } = require('../controllers/authController');

// Models
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Article = require('../models/Article');
const Message = require('../models/Message');

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/bypass', bypassLogin);
router.get('/auth/verify', authMiddleware, verifyToken);

// Settings Routes (Hero, About, etc.)
router.get('/settings', getSettings);
router.post('/settings', authMiddleware, updateSetting); // Protect update

// Project Routes
const projectController = createCRUDController(Project);
router.get('/projects', projectController.getAll);
router.get('/projects/:id', projectController.getById);
router.post('/projects', authMiddleware, projectController.create);
router.put('/projects/:id', authMiddleware, projectController.update);
router.delete('/projects/:id', authMiddleware, projectController.remove);

// Skill Routes
const skillController = createCRUDController(Skill);
router.get('/skills', skillController.getAll);
router.get('/skills/:id', skillController.getById);
router.post('/skills', authMiddleware, skillController.create);
router.put('/skills/:id', authMiddleware, skillController.update);
router.delete('/skills/:id', authMiddleware, skillController.remove);

// Article Routes
const articleController = createCRUDController(Article);
router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getById);
router.post('/articles', authMiddleware, articleController.create);
router.put('/articles/:id', authMiddleware, articleController.update);
router.delete('/articles/:id', authMiddleware, articleController.remove);

// Message Routes
const messageController = createCRUDController(Message);
router.post('/messages', messageController.create); // Public can send
router.get('/messages', authMiddleware, messageController.getAll); // Only admin can read
router.delete('/messages/:id', authMiddleware, messageController.remove);

module.exports = router;
