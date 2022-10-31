const {
    Packets
} = require('../database/models');
const { ACTIONS } = require('../constants');
const { Op } = require("sequelize");

module.exports = {
    Query: {
        listWeddingPacket: async (_, { filter, limit, offset }, context) => ({
            filter, limit, offset, context
        }),
    },
    Packets: {
        data: async ({ filter, limit, offset, context }) => {
            try {
                if (!context.user || !context.userActions) {
                    throw new Error('Unauthorized');
                }

                if (!context.userActions.includes(ACTIONS.PACKET.LIST)) {
                    throw new Error('Not authorized');
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                        {
                            name: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                    ]
                } : {}
                
                const packets = await Packets.findAll({
                    where: {
                        ...filters
                    },
                    limit,
                    offset
                });

                return packets;
            } catch (error) {
                throw new Error(error);
            }
        },
        paginationInfo: async ({ filter, limit, offset, context }) => {
            try {
                if (!context.user || !context.userActions) {
                    throw new Error('Unauthorized');
                }

                if (!context.userActions.includes(ACTIONS.PACKET.LIST)) {
                    throw new Error('Not authorized');
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                        {
                            name: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                    ]
                } : {}

                const where = { ...filters }

                const count = Packets.count({
                    where
                })

                return { count, limit, offset }

            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {

    }
};