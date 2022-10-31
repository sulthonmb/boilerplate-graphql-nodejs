const { 
    Partners
} = require('../database/models')
const { ACTIONS } = require('../constants')
const { Op } = require("sequelize");

module.exports = {
    Query: {
        listPartners: async (_, { filter, limit, offset }, context) => ({
            filter, limit, offset, context
        }),
        partner: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.PARTNERS.GET)){
                    throw new Error('Not authorized')
                }

                const dataPartner = await Partners.findByPk(id)
                return dataPartner
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Partners: {
        data: ({filter, limit, offset, context}) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.PARTNERS.LIST)){
                    throw new Error('Not authorized')
                }

                const filters = (filter) ? {
                    name: {
                        [Op.iLike]: `%${filter}%`
                    }
                } : {}

                const isDeleted = {
                    isDeleted: false
                }

                const where = { ...filters, ...isDeleted }

                return Partners.findAll({
                    where,
                    limit,                    
                    offset, 
                })
            } catch (error) {
                throw new Error(error)
            }
        }, 
        paginationInfo: ({filter, limit, offset, context}) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.PARTNERS.LIST)){
                    throw new Error('Not authorized')
                }

                const filters = (filter) ? {
                    name: {
                        [Op.iLike]: `%${filter}%`
                    }
                } : {}

                const isDeleted = {
                    isDeleted: false
                }

                const where = { ...filters, ...isDeleted }

                const count = Partners.count({
                    where
                })
                
                return { count, limit, offset }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createPartner: async (_, { input }, context) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.PARTNERS.CREATE)){
                    throw new Error('Not authorized')
                }

                const { name } = input
                const partner = await Partners.create({
                    name
                })
                return partner
            } catch (error) {
                throw new Error(error)
            }
        },
        updatePartner: async (_, { id, input }, context) => {
            try{
                if(!context.user || !context.userActions){
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.PARTNERS.EDIT)){
                    throw new Error('Not authorized')
                }

                const { name } = input

                const checkPartner = await Partners.findByPk(id)
                if(!checkPartner){
                    throw new Error('Partner not found')
                }

                return await Partners.update({
                    name
                }, {
                    where: {
                        id
                    }
                }).then(() => {
                    return Partners.findByPk(id)
                }).catch(err => {
                    throw new Error(err)
                })
            } catch (error) {
                throw new Error(error)
            }
        },
        deletePartner: async (_, { id }, context) => {
            try {
                if(!context.user || !context.userActions){
                    throw new Error('Unauthorized')
                }

                if(!context.userActions.includes(ACTIONS.PARTNERS.DELETE)){
                    throw new Error('Not authorized')
                }

                const checkPartner = await partners.findByPk(id)
                if(!checkPartner){
                    throw new Error('Partner not found')
                }

                return await Partners.update({
                    isDeleted: true
                }, {
                    where: {
                        id
                    }
                }).then(() => {
                    return Partners.findByPk(id)
                }).catch(err => {
                    throw new Error(err)
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}