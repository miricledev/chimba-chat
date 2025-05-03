'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Users table
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user'
      },
      lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Stories table
    await queryInterface.createTable('Stories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      level: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
        allowNull: false
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      isPremium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Messages table
    await queryInterface.createTable('Messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Stories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      translations: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quizType: {
        type: Sequelize.ENUM('none', 'multiple-choice', 'fill_in_blank', 'word-match'),
        defaultValue: 'none'
      },
      quizQuestion: {
        type: Sequelize.STRING
      },
      quizOptions: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      quizAnswer: {
        type: Sequelize.STRING
      },
      xpValue: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create UserProgresses table
    await queryInterface.createTable('UserProgresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      storyId: {
        type: Sequelize.UUID,
        references: {
          model: 'Stories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lastMessageIndex: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      xpEarned: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      correctAnswers: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      totalQuestions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('UserProgresses');
    await queryInterface.dropTable('Messages');
    await queryInterface.dropTable('Stories');
    await queryInterface.dropTable('Users');
  }
}; 