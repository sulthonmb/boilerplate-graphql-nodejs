const ACTIONS = {
    USERS: {
        LIST: 'listUsers',
        GET: 'getUser',
        CREATE: 'createUser',
        EDIT: 'editUser',
        DELETE: 'deleteUser',
    },
    PARTNERS: {
        LIST: 'listPartners',
        GET: 'getPartner',
        CREATE: 'createPartner',
        EDIT: 'editPartner',
        DELETE: 'deletePartner',
    },
    CUSTOMERS: {
        LIST: 'listCustomers',
        GET: 'getCustomer',
        CREATE: 'createCustomer',
        EDIT: 'editCustomer',
        DELETE: 'deleteCustomer',
    },
    INVITATIONS: {
        LIST: 'listInvitations',
        GET: 'getInvitation',
        CREATE: 'createInvitation',
        EDIT: 'editInvitation',
        DELETE: 'deleteInvitation',
    },
    WEDDINGS: {
        LIST: 'listWeddings',
        GET: 'getWedding',
        CREATE: 'createWedding',
        EDIT: 'editWedding',
        DELETE: 'deleteWedding',
    },
    WEDDING_GUESTS: {
        LIST: 'listWeddingGuests',
        GET: 'getWeddingGuest',
        CREATE: 'createWeddingGuest',
        EDIT: 'editWeddingGuest',
        DELETE: 'deleteWeddingGuest',
    },
    WEDDING_MESSAGES: {
        LIST: 'listWeddingMessages',
        GET: 'getWeddingMessage',
        CREATE: 'createWeddingMessage',
        EDIT: 'editWeddingMessage',
        DELETE: 'deleteWeddingMessage',
    },
    WEDDING_ENVELOPES: {
        LIST: 'listWeddingEnvelopes',
        GET: 'getWeddingEnvelope',
        CREATE: 'createWeddingEnvelope',
        EDIT: 'editWeddingEnvelope',
        DELETE: 'deleteWeddingEnvelope',
    },
    WEDDING_GALLERIES: {
        LIST: 'listWeddingGalleries',
        GET: 'getWeddingGallery',
        CREATE: 'createWeddingGallery',
        EDIT: 'editWeddingGallery',
        DELETE: 'deleteWeddingGallery',
    },
    PACKET: {
        LIST: 'listWeddingPacket',
        GET: 'getWeddingPacket',
        CREATE: 'createWeddingPacket',
        EDIT: 'editWeddingPacket',
        DELETE: 'deleteWeddingPacket',
    },
}

const DIRECTORY_FILES = {
    GALLERY: 'weddings/gallery'
}

module.exports = {
    ACTIONS,
    DIRECTORY_FILES,
}