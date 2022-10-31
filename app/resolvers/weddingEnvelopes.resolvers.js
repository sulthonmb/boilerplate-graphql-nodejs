const { 
    Weddings,
    WeddingEnvelopes
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize")

module.exports = {
    Query: {
        weddingEnvelopes: async (_, { weddingId, limit, offset }, context) => ({
            weddingId, limit, offset
        })
    },
    WeddingEnvelopes: {
        data: ({weddingId, limit, offset}) => {
            try {
                return WeddingEnvelopes.findAll({
                    attributes: ['id', 'type', 'bankName', 'walletName', 'accountBankNumber', 'accountWalletNumber', 'ownerName'],
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
                const count = WeddingEnvelopes.count({
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
        createWeddingEnvelope: async (_, { weddingId, input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthenticated!')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_ENVELOPES.CREATE)) {
                    throw new Error('Unauthorized!')
                }

                const checkWedding = await Weddings.findOne({
                    where: {
                        id: {
                            [Op.eq]: weddingId
                        }
                    }
                })

                if(!checkWedding) {
                    throw new Error('Wedding not found!')
                }
                
                const newWeddingEnvelope = await WeddingEnvelopes.create({
                    ...input,
                    weddingId
                })

                return newWeddingEnvelope
            } catch (error) {
                throw new Error(error)       
            }
        },
        updateWeddingEnvelope: async (_, { id, input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthenticated!')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_ENVELOPES.UPDATE)) {
                    throw new Error('Unauthorized!')
                }

                const checkWeddingEnvelope = await WeddingEnvelopes.findOne({
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                })

                if(!checkWeddingEnvelope) {
                    throw new Error('Wedding envelope not found!')
                }

                return await WeddingEnvelopes.update({
                    ...input
                }, {
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                }).then(() => {
                    return WeddingEnvelopes.findOne({
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
        deleteWeddingEnvelope: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthenticated!')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_ENVELOPES.DELETE)) {
                    throw new Error('Unauthorized!')
                }

                const checkWeddingEnvelope = await WeddingEnvelopes.findOne({
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                })

                if(!checkWeddingEnvelope) {
                    throw new Error('Wedding envelope not found!')
                }

                return await WeddingEnvelopes.update({
                    isDeleted: true
                }, {
                    where: {
                        id: {
                            [Op.eq]: id
                        }
                    }
                }).then(() => {
                    return WeddingEnvelopes.findOne({
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