const { 
    InviteGuests,
    Weddings
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize")
const { 
    generateIdInvitationGuest,
    decodeIdInvitationGuest,
} = require('../utils/token')

module.exports = {
    Query: {
        listWeddingGuests: async (_, { weddingId, filter, limit, offset }, context) => ({
            weddingId, filter, limit, offset, context
        }),
        verifyWeddingGuest: async (_, { token, weddingId }) => {
            try {
                if(!token) {
                    throw new Error('Code invitation not found')
                }

                const { guestId } = decodeIdInvitationGuest(token)

                if(!guestId){
                    throw new Error('Code invitation wrong')
                }

                return await InviteGuests.findOne({
                    where: {
                        id: guestId,
                        weddingId
                    }
                })
            } catch (error) {
                throw new Error(error)
            }
        },
    },
    WeddingGuests: {
        data: async ({ weddingId, filter, limit, offset, context }) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GUESTS.LIST)) {
                    throw new Error('Not authorized')
                }

                const checkWedding = await Weddings.findOne({
                        where: {
                            id: weddingId
                        }
                    })
                    
                if(!checkWedding) {
                    throw new Error('Wedding not found')
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

                const wedding = (weddingId) ? {
                    weddingId
                } : {}

                const where = { ...filters, ...wedding, isDeleted: false }

                const guests = await InviteGuests.findAll({
                    limit,                    
                    where,
                    offset,
                })

                return guests.map((guest) => ({ ...guest.dataValues, accessKey: generateIdInvitationGuest({ guestId: guest.dataValues.id, invitationId: weddingId}) }))
            } catch (error) {
                throw new Error(error)
            }
        },
        paginationInfo: ({ weddingId, filter,limit, offset, context }) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GUESTS.LIST)) {
                    throw new Error('Not authorized')
                }

                const checkWedding = Weddings.findOne({
                    where: {
                        id: weddingId
                    }
                })
                
                if(!checkWedding) {
                    throw new Error('Wedding not found')
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

                const wedding = (weddingId) ? {
                    weddingId
                } : {}

                const where = { ...filters, ...wedding }

                const count = InviteGuests.count({
                    where
                })

                return { count, limit, offset }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        verifyAttendance: async (_, { token, weddingId, attendanceConfirmed, totalAttendance }) => {
            try {
                if(!token) {
                    throw new Error('Code invitation not found')
                }

                const { guestId } = decodeIdInvitationGuest(token)

                if(!guestId){
                    throw new Error('Code invitation wrong')
                }

                const guest = await InviteGuests.findOne({
                    where: {
                        id: guestId,
                        weddingId
                    }
                })

                if(!guest) {
                    throw new Error('Guest not found')
                }

                await InviteGuests.update({
                    attendanceConfirmed,
                    totalAttendance
                }, {
                    where: {
                        id: guestId
                    }
                })

                return guest
            } catch (error) {
                throw new Error(error)
            }
        },
        createWeddingGuest: async (_, { weddingId, input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthenticated')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GUESTS.CREATE)) {
                    throw new Error('Unauthorized')
                }

                const checkWedding = await Weddings.findOne({
                    where: {
                        id: weddingId
                    }
                })

                if(!checkWedding) {
                    throw new Error('Wedding not found')
                }

                const guest = await InviteGuests.create({
                    ...input,
                    weddingId
                })

                return guest
            } catch (error) {
                throw new Error(error)
            }
        },
        updateWeddingGuest: async (_, { weddingId, guestId, input }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthenticated')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GUESTS.EDIT)) {
                    throw new Error('Unauthorized')
                }

                const guest = await InviteGuests.findOne({
                    where: {
                        id: guestId,
                        weddingId
                    }
                })

                if(!guest) {
                    throw new Error('Guest not found')
                }

                return await InviteGuests.update({
                    ...input
                }, {
                    where: {
                        id: guestId
                    }
                }).then(() => {
                    return InviteGuests.findOne({
                        where: {
                            id: guestId
                        }
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteWeddingGuest: async (_, { weddingId, guestId }, context) => {
            try {
                if(!context.user || !context.userActions) {
                    throw new Error('Unauthenticated')
                }

                if(!context.userActions.includes(ACTIONS.WEDDING_GUESTS.DELETE)) {
                    throw new Error('Unauthorized')
                }

                const guest = await InviteGuests.findOne({
                    where: {
                        id: guestId,
                        weddingId
                    }
                })

                if(!guest) {
                    throw new Error('Guest not found')
                }

                return await InviteGuests.update({
                    isDeleted: true
                }, {
                    where: {
                        id: guestId
                    }
                }).then(() => {
                    return InviteGuests.findOne({
                        where: {
                            id: guestId
                        }
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}