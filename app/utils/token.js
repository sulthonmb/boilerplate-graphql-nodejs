const jwt = require('jsonwebtoken')
const env = require('../../env')

const generateIdInvitationGuest = ({guestId, invitationId}) => {
    const token = jwt.sign({
        guestId,
        invitationId,
    },
    env.secret, { expiresIn: '365d' })
    return token
}

const decodeIdInvitationGuest = (token) => {
    const decoded = jwt.verify(token, env.secret)
    return decoded
}

module.exports = {
    generateIdInvitationGuest,
    decodeIdInvitationGuest
}