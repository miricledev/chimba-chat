const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserProgress extends Model {
    static associate(models) {
      UserProgress.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      UserProgress.belongsTo(models.Story, {
        foreignKey: 'storyId',
        as: 'story'
      });
    }
  }

  UserProgress.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    storyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Stories',
        key: 'id'
      }
    },
    lastMessageIndex: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    xpEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'UserProgress',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'storyId']
      }
    ]
  });

  return UserProgress;
}; 