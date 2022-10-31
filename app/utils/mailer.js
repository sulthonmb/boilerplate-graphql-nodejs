const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sulthon.glints@gmail.com',
        pass: 'b@ron2019'
    }
})

const sendVerifyEmail = async ({to, token = ''}) => {
    console.log('sending email ', to)
    await transporter.sendMail({
        from: '"Verification Email" <sulthon.glints@gmail.com>', // sender address
        to, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello world? ${token}</b>`, // html
    })
}

const sendInvitationContributor = async ({to, token = ''}) => {
    await transporter.sendMail({
        from: '"Invitation Join in Collection" <sulthon.glints@gmail.com>', // sender address
        to, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Hello world? ${token}</b>`, // html
    })
}  


module.exports = { 
    sendVerifyEmail,
    sendInvitationContributor
}