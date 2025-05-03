'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const now = new Date();

    const users = [
      // Admins (2)
      {
        id: uuidv4(),
        username: 'admin1',
        email: 'admin1@chimba.com',
        password: hashedPassword,
        role: 'admin',
        isPremium: true,
        xp: 5000,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'admin2',
        email: 'admin2@chimba.com',
        password: hashedPassword,
        role: 'admin',
        isPremium: true,
        xp: 4500,
        createdAt: now,
        updatedAt: now
      },
      // Premium Users (3 more)
      {
        id: uuidv4(),
        username: 'premium1',
        email: 'premium1@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: true,
        xp: 3000,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'premium2',
        email: 'premium2@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: true,
        xp: 2500,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'premium3',
        email: 'premium3@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: true,
        xp: 2000,
        createdAt: now,
        updatedAt: now
      },
      // Free Tier Users (5)
      {
        id: uuidv4(),
        username: 'user1',
        email: 'user1@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: false,
        xp: 1500,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'user2',
        email: 'user2@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: false,
        xp: 1000,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'user3',
        email: 'user3@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: false,
        xp: 500,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'user4',
        email: 'user4@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: false,
        xp: 250,
        createdAt: now,
        updatedAt: now
      },
      {
        id: uuidv4(),
        username: 'user5',
        email: 'user5@example.com',
        password: hashedPassword,
        role: 'user',
        isPremium: false,
        xp: 100,
        createdAt: now,
        updatedAt: now
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
}; 