'use strict';

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
     await queryInterface.bulkInsert(
      "RoleActions",
      [
        {
          actionId: "viewUsersPage",
          roleId: 1,
        },
        {
          actionId: "viewSingleUser",
          roleId: 1,
        },
        {
          actionId: "listUsers",
          roleId: 1,
        },
        {
          actionId: "getUser",
          roleId: 1,
        },
        {
          actionId: "createUser",
          roleId: 1,
        },
        {
          actionId: "editUser",
          roleId: 1,
        },
        {
          actionId: "deleteUser",
          roleId: 1,
        },
        {
          actionId: "viewWeddingsPage",
          roleId: 1,
        },
        {
          actionId: "viewSingleWedding",
          roleId: 1,
        },
        {
          actionId: "listWeddings",
          roleId: 1,
        },
        {
          actionId: "getWedding",
          roleId: 1,
        },
        {
          actionId: "createWedding",
          roleId: 1,
        },
        {
          actionId: "editWedding",
          roleId: 1,
        },
        {
          actionId: "deleteWedding",
          roleId: 1,
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("RoleActions", null, {});
  }
};
