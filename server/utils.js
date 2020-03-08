const firebaseConnect = () => {
    const admin = require("firebase-admin");
    const serviceAccount = require("../tourify-ddf38-firebase-adminsdk-y4uye-9666de5e0f.json")

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://tourify-ddf38.firebaseio.com"
    });

    return admin.firestore();
}

const stampBirthday = birthday => {
    const {firestore} = require('firebase-admin')
    return firestore.Timestamp.fromDate(new Date(birthday))
}

const age = birthday => {
    birthday = new Date(birthday);
    return Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0);
}

const verifyLogin = async (idToken, authClient) => {
    const ticket = await authClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.CLIENT_ID
    })
    const payload = ticket.getPayload()
    console.log(payload)
    return payload.email_verified
}

const responseObject = {
    success: false,
    error: false,
    msg: ''
}

module.exports = {firebaseConnect, age, stampBirthday, verifyLogin, responseObject}