const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Import model definitions
const defineUser = require('./User');
const defineStory = require('./Story');
const defineMessage = require('./Message');
const defineUserProgress = require('./UserProgress');
const Settings = require('./Settings');

// Initialize models
const User = defineUser(sequelize);
const Story = defineStory(sequelize);
const Message = defineMessage(sequelize);
const UserProgress = defineUserProgress(sequelize);

// Initialize associations
const models = {
  User,
  Story,
  Message,
  UserProgress,
  Settings
};

// Set up associations
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  ...models
}; 