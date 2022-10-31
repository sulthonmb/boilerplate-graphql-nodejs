const {
    Customers: ModelCustomers,
} = require('../database/models');
const { ACTIONS } = require('../constants');
const { Op } = require("sequelize");

module.exports = {
    Query: {
        listCustomers: async (_, { filter, limit, offset }, context) => ({
            filter, limit, offset, context
        }),
    },
    Customers: {
        data: async ({ filter, limit, offset, context }) => {
            try {
                if (!context.user || !context.userActions) {
                    throw new Error('Unauthorized');
                }

                if (!context.userActions.includes(ACTIONS.CUSTOMERS.LIST)) {
                    throw new Error('Not authorized');
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            firstName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                        {
                            lastName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                    ]
                } : {}
                
                const customers = await ModelCustomers.findAll({
                    where: {
                        isDeleted: false,
                        ...filters
                    },
                    limit,
                    offset
                });

                return customers;
            } catch (error) {
                throw new Error(error);
            }
        },
        paginationInfo: async ({ filter, limit, offset, context }) => {
            try {
                if (!context.user || !context.userActions) {
                    throw new Error('Unauthorized');
                }

                if (!context.userActions.includes(ACTIONS.CUSTOMERS.LIST)) {
                    throw new Error('Not authorized');
                }

                const filters = (filter) ? {
                    [Op.or]: [
                        {
                            firstName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                        {
                            lastName: {
                                [Op.iLike]: `%${filter}%`
                            }
                        },
                    ]
                } : {}

                const where = { ...filters }

                const count = ModelCustomers.count({
                    where
                })

                return { count, limit, offset }

            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        deleteCustomer: async (_, { id }, context) => {
            try {
                if (!context.user || !context.userActions) {
                    throw new Error('Unauthorized');
                }

                if (!context.userActions.includes(ACTIONS.CUSTOMERS.DELETE)) {
                    throw new Error('Not authorized');
                }

                const customer = await ModelCustomers.findOne({
                    where: {
                        id,
                        isDeleted: false
                    }
                });

                if (!customer) {
                    throw new Error('Customer not found');
                }
                
                const deletedCustomer = await customer.update({
                    isDeleted: true
                }, {
                    where: {
                        id
                    }
                });

                return deletedCustomer;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
};