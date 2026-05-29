const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Problem = require('../models/Problem');
const Tutorial = require('../models/Tutorial');
const connectDB = require('../config/database');

const users     = require('./data/users');
const tutorials = require('./data/tutorials');
dotenv.config();
connectDB();

// ─── IMPORT ───────────────────────────────────────────────────
const importData = async () => {
  try {
    await User.deleteMany();
    await Problem.deleteMany();
    await Tutorial.deleteMany();

    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find(u => u.role === 'admin');

    const tutorialsWithCreator = tutorials.map(t => ({
      ...t,
      createdBy: adminUser._id
    }));

    await Tutorial.create(tutorialsWithCreator);

    console.log('✅ Data imported successfully!');
    console.log(`📚 ${tutorials.length} tutorials added`);
    console.log('👤 User  → username: user  | password: user123');
    console.log('🔑 Admin → username: rafay | password: 112233ma');

    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// ─── DESTROY ──────────────────────────────────────────────────
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Problem.deleteMany();
    await Tutorial.deleteMany();

    console.log('🗑️  All data destroyed!');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

// ─── RUN ──────────────────────────────────────────────────────
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
} else {
  console.log('Usage:');
  console.log('  node seeder.js -i   → Import all data');
  console.log('  node seeder.js -d   → Destroy all data');
  process.exit();
}