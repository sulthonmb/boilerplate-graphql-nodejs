'use strict';
const bcrypt = require('bcrypt')
require('dotenv').config()

function hashPassword (password) {
  const salt = bcrypt.genSaltSync(parseInt(process.env.ROUND_SALT))
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Sulthon',
        lastName: 'Mubarok',
        email: 'sulthonmb@gmail.com',
        password: hashPassword('12345qwert'),
        isEmailVerified: true,
      },
      {
        firstName: 'AAA',
        lastName: 'BBB',
        email: 'aaabbb@gmail.com',
        password: hashPassword('12345qwert'),
        isEmailVerified: true,
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
