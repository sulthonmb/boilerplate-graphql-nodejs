const admin = require('firebase-admin')

var serviceAccount = require("../../credentials/graphql-assignment-firebase-adminsdk.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://graphql-assignment.firebaseio.com'
})

module.exports=admin
