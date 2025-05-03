const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Story extends Model {
    static associate(models) {
      Story.hasMany(models.Message, {
        foreignKey: 'storyId',
        as: 'messages',
        onDelete: 'CASCADE'
      });
      Story.hasMany(models.UserProgress, {
        foreignKey: 'storyId',
        as: 'userProgress',
        onDelete: 'CASCADE'
      });
    }
  }

  Story.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Story',
    timestamps: true
  });

  return Story;
}; 