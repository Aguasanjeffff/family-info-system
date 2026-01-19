const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const users = [
  {
    name: 'John Aguasan',
    email: 'john@aguasan.com',
    password: 'password123',
    role: 'admin',
    familyRole: 'Father',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Father of the family, loves spending time with his children and wife.',
    socialLinks: {
      facebook: 'https://facebook.com/john',
      instagram: 'https://instagram.com/john',
      twitter: 'https://twitter.com/john',
    },
    position: { row: 1, order: 1 },
  },
  {
    name: 'Maria Aguasan',
    email: 'maria@aguasan.com',
    password: 'password123',
    role: 'admin',
    familyRole: 'Mother',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Mother of the family, dedicated to raising wonderful children.',
    socialLinks: {
      facebook: 'https://facebook.com/maria',
      instagram: 'https://instagram.com/maria',
      twitter: 'https://twitter.com/maria',
    },
    position: { row: 1, order: 2 },
  },
  {
    name: 'Michael Aguasan',
    email: 'michael@aguasan.com',
    password: 'password123',
    role: 'member',
    familyRole: 'Son',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Eldest son, passionate about technology and sports.',
    socialLinks: {
      facebook: 'https://facebook.com/michael',
      instagram: 'https://instagram.com/michael',
      twitter: 'https://twitter.com/michael',
    },
    position: { row: 2, order: 1 },
  },
  {
    name: 'Sarah Aguasan',
    email: 'sarah@aguasan.com',
    password: 'password123',
    role: 'member',
    familyRole: 'Daughter',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Second child, loves art and music.',
    socialLinks: {
      facebook: 'https://facebook.com/sarah',
      instagram: 'https://instagram.com/sarah',
      twitter: 'https://twitter.com/sarah',
    },
    position: { row: 2, order: 2 },
  },
  {
    name: 'David Aguasan',
    email: 'david@aguasan.com',
    password: 'password123',
    role: 'member',
    familyRole: 'Son',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Third child, enjoys reading and gaming.',
    socialLinks: {
      facebook: 'https://facebook.com/david',
      instagram: 'https://instagram.com/david',
      twitter: 'https://twitter.com/david',
    },
    position: { row: 2, order: 3 },
  },
  {
    name: 'Emily Aguasan',
    email: 'emily@aguasan.com',
    password: 'password123',
    role: 'member',
    familyRole: 'Daughter',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    bio: 'Fourth child, passionate about dance and theater.',
    socialLinks: {
      facebook: 'https://facebook.com/emily',
      instagram: 'https://instagram.com/emily',
      twitter: 'https://twitter.com/emily',
    },
    position: { row: 2, order: 4 },
  },
  {
    name: 'James Aguasan',
    email: 'james@aguasan.com',
    password: 'password123',
    role: 'member',
    familyRole: 'Son',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    bio: 'Youngest child, loves animals and nature.',
    socialLinks: {
      facebook: 'https://facebook.com/james',
      instagram: 'https://instagram.com/james',
      twitter: 'https://twitter.com/james',
    },
    position: { row: 2, order: 5 },
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    console.log('Cleared existing data');

    // Insert seed data
    await User.insertMany(users);
    console.log('Seed data inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
