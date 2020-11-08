const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin")
const nodemailer = require('nodemailer');

admin.initializeApp()


//to make it work you need gmail account
const gmailEmail = functions.config().gmail.login;
const gmailPassword = functions.config().gmail.pass;

//google account credentials used to send email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});


exports.sendEmail = functions.firestore
    .document('client_messages')
    .onCreate((snap, context) => {

        const mailOptions = {
            from: gmailEmail,
            to: snap.data().Email,
            subject: 'Acknowledgement',
            html: `<h1>Automatic mail from iTure LTd</h1>
                                <p>
                                Hello ${snap.data().Firstname},<br> Thank you for contacting iTure Ltd. We have received your query and we will get back to you as soon as possible via
                                   <b>Email: </b>${snap.data().Email}.<br>
                                If you have any further query, please do not hesite to call us or send us a mail at info@iture.co.uk.<br>
                                Thank you<br>
                                Kind Regards,<br>
                                S.Bundhun
                                </p>`
        };

        //this is callback function to return status to firebase console
        const getDeliveryStatus = function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    };



        transporter.sendMail(mailOptions,getDeliveryStatus);
    });
