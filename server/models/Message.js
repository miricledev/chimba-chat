const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.Story, {
        foreignKey: 'storyId',
        as: 'story'
      });
    }
  }

  Message.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    storyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Stories',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    translations: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quizType: {
      type: DataTypes.ENUM('none', 'multiple-choice', 'fill_in_blank', 'word-match'),
      defaultValue: 'none'
    },
    quizQuestion: {
      type: DataTypes.STRING
    },
    quizOptions: {
      type: DataTypes.JSONB,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue('quizOptions');
        return rawValue ? (Array.isArray(rawValue) ? rawValue : JSON.parse(rawValue)) : [];
      }
    },
    quizAnswer: {
      type: DataTypes.STRING
    },
    xpValue: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    }
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: true
  });

  return Message;
}; 