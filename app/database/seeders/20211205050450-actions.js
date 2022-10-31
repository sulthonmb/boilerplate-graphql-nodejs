"use strict";

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
      "Actions",
      [
        {
          id: "viewUsersPage",
          desc: "View Users Page",
        },
        {
          id: "viewSingleUser",
          desc: "View Single User",
        },
        {
          id: "listUsers",
          desc: "List Users",
        },
        {
          id: 'getUser',
          desc: 'Get User',
        },
        {
          id: "createUser",
          desc: "Create User",
        },
        {
          id: "editUser",
          desc: "Edit User",
        },
        {
          id: "deleteUser",
          desc: "Delete User",
        },
        {
          id: 'viewWeddingsPage',
          desc: 'View Weddings Page',
        },
        {
          id: 'viewSingleWedding',
          desc: 'View Single Wedding',
        },
        {
          id: 'listWeddings',
          desc: 'List Weddings',
        },
        {
          id: 'getWedding',
          desc: 'Get Wedding',
        },
        {
          id: 'createWedding',
          desc: 'Create Wedding',
        },
        {
          id: 'editWedding',
          desc: 'Edit Wedding',
        },
        {
          id: 'deleteWedding',
          desc: 'Delete Wedding',
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
    await queryInterface.bulkDelete("Actions", null, {});
  },
};
