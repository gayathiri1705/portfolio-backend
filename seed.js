const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Setting = require('./models/Setting');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Create Admin User
        const adminUsername = 'admin';
        const adminPassword = 'adminpassword'; // User should change this in production

        const existingAdmin = await User.findOne({ username: adminUsername });
        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            const newAdmin = new User({
                username: adminUsername,
                password: hashedPassword
            });
            await newAdmin.save();
            console.log(`Admin user created -> Username: ${adminUsername}, Password: ${adminPassword}`);
        } else {
            console.log('Admin user already exists.');
        }

        // 2. Wipe existing data to remove old static data
        await Setting.deleteMany({});
        console.log('Cleared old settings.');

        const Project = require('./models/Project');
        const Skill = require('./models/Skill');
        const Article = require('./models/Article');

        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Article.deleteMany({});
        console.log('Cleared old projects, skills, and articles.');

        // 3. Insert Default Settings
        const defaultSettings = [
            { key: 'hero_title', value: 'GAYATHIRI R' },
            { key: 'hero_subtitle', value: "Hi, I'm" },
            { key: 'hero_description', value: "I'm a Developer and freelancer passionate about building modern web applications." },
            {
                key: 'about_text',
                value: "I’m Gayathiri, a developer and freelancer.\n\nI specialize in building dynamic and scalable web applications."
            }
        ];

        for (const setting of defaultSettings) {
            await new Setting(setting).save();
            console.log(`Setting created: ${setting.key}`);
        }

        console.log('Seeding complete!');
        process.exit(0);

    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();
