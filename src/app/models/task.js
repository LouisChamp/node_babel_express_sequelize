"use strict"

const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { as: "user" })
    }

    toJSON() {
      return (({ id, title, completed }) => ({
        id,
        title,
        completed,
      }))(this.get())
    }

    static async batchUpdateStatuses(user, ids, completed) {
      return this.update(
        { completed },
        {
          where: {
            userId: user.id,
            id: ids,
            completed: !completed,
          },
        }
      )
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "can't be blank",
          },
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "must exist",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
      scopes: {
        completed: {
          where: { completed: true },
        },
        active: {
          where: { completed: false },
        },
        belongingTo(user) {
          return {
            where: {
              userId: user.id,
            },
          }
        },
      },
    }
  )

  return Task
}
