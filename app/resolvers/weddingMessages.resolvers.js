const { 
    Weddings,
    WeddingMessages
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize")

module.exports = {
    Query: {
        weddingMessages: async (_, { weddingId, limit, offset }, context) => ({
            weddingId, limit, offset
        })
    },
    WeddingMessages: {
        data: ({weddingId, limit, offset}) => {
            try {
                return WeddingMessages.findAll({
                    attributes: ['id', 'name', 'message'],
                    where: {
                        weddingId: {
                            [Op.eq]: weddingId
                        }
                    },
                    limit, offset
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        paginationInfo: ({weddingId, limit, offset}) => {
            try {
                const count = WeddingMessages.count({
                    where: {
                        weddingId: {
                            [Op.eq]: weddingId
                        }
                    },
                })
                return { limit, offset, count }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createWeddingMessage: async (_, { weddingId, input }) => {
            try {
                const { name, message } = input

                const checkWedding = await Weddings.findOne({
                    where: {
                        id: {
                            [Op.eq]: weddingId
                        }
                    }
                })

                if(!checkWedding) {
                    throw new Error('Wedding not found')
                }

                const newWeddingMessage = await WeddingMessages.create({
                    name,
                    message,
                    weddingId
                })

                return newWeddingMessage
            } catch (error) {
                throw new Error(error)
            }
        },
        updateWeddingMessage: async (_, { id, input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unathorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_MESSAGES.EDIT)) {
                    throw new Error('Unathorized')
                }

                const checkWeddingMessage = await WeddingMessages.findOne({
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                })

                if(!checkWeddingMessage) {
                    throw new Error('Wedding message not found')
                }

                const { name, message } = input

                return await WeddingMessages.update({
                    name,
                    message
                }, {
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                }).then(() => {
                    return WeddingMessages.findOne({   
                        where: {
                            id: {
                                [Op.eq]: id
                            }
                        }
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteWeddingMessage: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unathorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_MESSAGES.DELETE)) {
                    throw new Error('Unathorized')
                }

                return await WeddingMessages.update({
                    isDeleted: true,
                }, {
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                }).then(() => {
                    return WeddingMessages.findOne({
                        where: {
                            id: {
                                [Op.eq]: id
                            }
                        }
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}