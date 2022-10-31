/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('../../env')
/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = parseInt(env.ROUND_SALT)
const salt = bcrypt.genSaltSync(saltRounds)
const hashPassword = (password) => {
  const hashedPass = bcrypt.hashSync(password, salt)
  return hashedPass
}

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword)
}

/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
  if (input.replace(/\s/g, '').length) {
    return false
  } return true
}

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true
  }
}

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = ({email, id}) => {
  const token = jwt.sign({
    email,
    id,
  },
  env.secret, { expiresIn: '3d' })
  return token
}

const verifyTokenEmail = (token) => {
  const decoded = jwt.verify(token, env.secret)
  return decoded
}

module.exports={
  hashPassword,
  comparePassword,
  isEmpty,
  empty,
  generateUserToken,
  verifyTokenEmail
}
