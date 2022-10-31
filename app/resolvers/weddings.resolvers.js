const { 
    Weddings,
    Partners
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize");

module.exports = {
    Query: {
        listWeddings: async (_, { filter, limit, offset }, context) => ({
            filter, limit, offset, context
        }),
        partnerWeddings: async (_, { partnerId, filter, limit, offset }, context) => ({
            partnerId, filter, limit, offset, context
        }),
        getWedding: async (_, { weddingId }) => {
            try {
                const wedding = await Weddings.findOne({
                    where: {
                        id: weddingId,
                        isDeleted: false
                    }
                })
                return wedding
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Weddings: {
        data: async ({ partnerId, filter, limit, offset, context }) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDINGS.LIST)) {
                    throw new Error('Not authorized')
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            groomName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                        {
                            brideName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        }
                    ]
                } : {}

                const partner = (partnerId) ? {
                    partnerId
                } : {}

                const where = { ...filters, ...partner }

                return await Weddings.findAll({
                    limit,                    
                    where,
                    offset,
                })
            } catch(err) {
                throw new Error(err)
            }
        },
        paginationInfo: ({ partnerId, filter,limit, offset, context }) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDINGS.LIST)) {
                    throw new Error('Not authorized')
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            groomName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                        {
                            brideName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        }
                    ]
                } : {}

                const partner = (partnerId) ? {
                    partnerId
                } : {}

                const where = { ...filters, ...partner }

                const count = Weddings.count({
                    where
                })

                return { count, limit, offset }
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        createWedding: async (_, { input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDINGS.CREATE)) {
                    throw new Error('Not authorized')
                }

                const { partnerId } = input

                const checkPartner = await Partners.findOne({
                    where: {
                        id: partnerId,
                        isDeleted: false
                    }
                })

                if(!checkPartner) {
                    throw new Error('Partner not found')
                }

                const newWedding = await Weddings.create({
                    ...input
                })

                return newWedding
            } catch (error) {
                throw new Error(error)
            }
        },
        updateWedding: async (_, { id, input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDINGS.EDIT)) {
                    throw new Error('Not authorized')
                }

                const wedding = await Weddings.findOne({
                    where: {
                        id,
                        isDeleted: false
                    }
                })

                if(!wedding) {
                    throw new Error('Wedding not found')
                }

                return await Weddings.update({
                    ...input
                }, {
                    where: {
                        id,
                        isDeleted: false
                    }
                }).then(() => {
                    return Weddings.findByPk(id)
                })

            } catch (error) {
                throw new Error(error)
            }
        },
        deleteWedding: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDINGS.DELETE)) {
                    throw new Error('Not authorized')
                }

                const wedding = await Weddings.findOne({
                    where: {
                        id,
                        isDeleted: false
                    }
                })

                if(!wedding) {
                    throw new Error('Wedding not found')
                }

                return await wedding.update({
                    isDeleted: true
                }, {
                    where: {
                        id
                    }
                }).then(() => {
                    return Weddings.findByPk(id)
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}