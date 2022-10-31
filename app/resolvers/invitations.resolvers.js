const { 
    Invitations,
    Weddings,
    Partners,
    Packets
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize");

module.exports = {
    Query: {
        listInvitations: async (_, { filter, limit, offset, isWedding }, context) => ({
            filter, limit, offset, isWedding, context
        }),
        getInvitation: async (_, { id }, context) => ({
            id, context
        })
    },
    Invitation: {
        partner: async (wedding) => {
            try {
                return await Partners.findByPk(wedding.partnerId)
            } catch (error) {
                throw new Error(error)
            }
        },
        packet: async (wedding) => {
            try {
                return await Packets.findByPk(wedding.packetId)
            } catch (error) {
                throw new Error(error)
            }
        },
        wedding: async (invitation) => {
            try {
                return await Weddings.findByPk(invitation.weddingId)
            } catch (error) {
                throw new Error(error)
            }
        },
    },
    Invitations: {
        data: async ({ filter, limit, offset, isWedding, context }) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.INVITATIONS.LIST)) {
                    throw new Error('Not authorized')
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                    ]
                } : {}

                const wedding = (isWedding) ? {
                    weddingId: {
                        [Op.ne]: null
                    }
                } : {
                    weddingId: null
                }

                const where = { ...filters, ...wedding, isDeleted: false }

                const invitations = await Invitations.findAll({
                    where,
                    limit,
                    offset
                })

                return invitations
            } catch (error) {
                throw new Error(error)
            }
        },
        paginationInfo: async ({ filter, limit, offset, isWedding, context }) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.INVITATIONS.LIST)) {
                    throw new Error('Not authorized')
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                    ]
                } : {}

                const wedding = (isWedding) ? {
                    weddingId: {
                        [Op.ne]: null
                    }
                } : {
                    weddingId: null
                }

                const where = { ...filters, ...wedding, isDeleted: false }

                const count = await Invitations.count({
                    where
                })

                return { count, limit, offset }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        deleteInvitation: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.INVITATIONS.DELETE)) {
                    throw new Error('Not authorized')
                }

                const invitation = await Invitations.findByPk(id)

                if(!invitation) {
                    throw new Error('Invitation not found')
                }

                invitation.isDeleted = true

                await invitation.save()

                return invitation
            } catch (error) {
                throw new Error(error)
            }
        },
        updatePacket: async (_, { id, packetId }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.INVITATIONS.EDIT)) {
                    throw new Error('Not authorized')
                }

                const invitation = await Invitations.findByPk(id)
                // const invitation = await Invitations.findOne({
                //     where: {
                //         id: id
                //     }
                // })

                if(!invitation) {
                    throw new Error('Invitation not found')
                }

                return await Invitations.update({
                    packetId: packetId
                }, {
                    where: {
                        id: id
                    }
                }).then(() => {
                    return Invitations.findOne({
                        where: {
                            id: id
                        }
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}