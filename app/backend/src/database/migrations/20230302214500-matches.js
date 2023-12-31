'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('matches', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    home_team_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    home_team_goals: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    away_team_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    away_team_goals: {
      allowNull: false,
      type: Sequelize.INTEGER
      },
    in_progress: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
      },
    },
   )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches')
  }
};
