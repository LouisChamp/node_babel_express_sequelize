"use strict"

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

    const userId = await queryInterface.bulkInsert("Users", [
      {
        name: "John Doe",
        email: "john.doe@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    await queryInterface.bulkInsert("Tasks", [
      {
        userId,
        title: "A",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId,
        title: "B",
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId,
        title: "C",
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Users", null, {})
  },
}
