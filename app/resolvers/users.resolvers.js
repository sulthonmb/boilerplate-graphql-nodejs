const { Users, Roles, Actions } = require('../database/models')
const { sendVerifyEmail } = require('../utils/mailer')
const { hashPassword, generateUserToken, comparePassword } = require('../utils/validations')

module.exports = {
    Query: {
        me: async (_, {}, context) => {
            try {
                if (!context.user) {
                    throw new Error('Unauthorized')
                }
                const { id } = context.user
                const user = await Users.findOne({
                    where: {
                        id
                    }
                })
                return user
            } catch (error) {
                throw error
            }
        },
    },
    User: {
        roleIds: async ({ id }) => {
            try {
                const userRoles = await Roles.findAll({
                    include: [{
                        model: Users,
                        through: {
                            where: {
                                userId: id
                            }
                        }
                    }]
                })
                return userRoles
            }
            catch (error) {
                throw new Error(error)
            }
        },
        actionIds: async ({ id }) => {
            try {
                const userActions = await Actions.findAll({
                    include: [{
                        model: Roles,
                        include: [{
                            model: Users,
                            through: {
                                where: {
                                    userId: id
                                }
                            }
                        }]
                    }]
                })
                return userActions
            }
            catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        signUp: async (_, { input }) => {
            const { firstName, lastName, email, password } = input

            return new Promise(async (resolve, reject) => {
                try {
                    await Users.findOne({
                        where: {
                            email
                        },
                        attributes: ['id']
                    }).then(async (user) => {
                        if (user) {
                            return reject('Email already exists')
                        }
                        const hashedPass = await hashPassword(password)
                        const createUser = await Users.create({
                            firstName,
                            lastName,
                            email,
                            password: hashedPass 
                        })
        
                        const token = await generateUserToken({
                            id: createUser.id,
                            email: createUser.email,
                        })
                        
                        await sendVerifyEmail({to: email})
                        
                        resolve({
                            token,
                            user: {
                                id: createUser.id,
                                firstName: createUser.firstName,
                                lastName: createUser.lastName,
                                email: createUser.email
                            }
                        })
                    })   
                } catch (error) {
                    throw new Error(error)
                }
            }).then((resolve) => {
                return resolve
            }).catch((reject) => {
                throw new Error(reject)
            })
        },
        signIn: async (_, { input }) => {
            const { email, password } = input
            try {
                const user = await Users.findOne({
                    where: {
                        email
                    }
                })
                if (!user) {
                    throw new Error('User not found.')
                }
                
                const isPasswordValid = await comparePassword(user.password, password)
                if (!isPasswordValid) {
                    throw new Error('Password is incorrect.')
                }
                const token = await generateUserToken({
                    id: user.id,
                    email: user.email,
                })
                return {
                    token,
                    user: {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                }
            }
            catch (error) {
                throw new Error(error)
            }
        },
        
    }
}