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


//creating function for sending emails
var goMail = function (Email,Firstname,Lastname,Message,Mobile,Companyname,Telephone,PoliciesConsent,MarketingConsent,Time) {

//google account credentials used to send email
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});


        const mailOptions = {
            from: gmailEmail,
            to: Email,
            subject: 'Acknowledgement',
            html: `<h1>Automatic mail from ITURE LTD</h1>
                                <p style="text-align:justify;">
                                Dear `+ Firstname +`&nbsp;`+ Lastname +`,<br><br> 
                                Thank you for contacting iTure Ltd. We have received your query and we will get back to you as soon as possible via this
                                <b>email:</b>`+ Email +`.
                                <br><br>
                                If you have any further query, please do not hesite to call us or send us a mail at info@iture.co.uk.<br><br>
                                Thank you.<br><br>
                                Your sincerely,<br>
                                Mr S.Bundhun<br>
                                iTure Director<br><br>
                                <b>Note:</b><em>Please note that this mail is auto-generated and no reply will be received though this mail. If you have any queury, send us a mail on info@iture.co.uk</em>
                                </p>`
        };

        const mailOptions2 = {
            from: gmailEmail,
            to: 's.bundhun@iture.co.uk',
            subject: 'Contact Us Form - New Leads',
            html: `<h1>New Leads via iTURE Website</h1>
                                <p style="text-align:justify;">
                                Dear Mr S Bundhun,<br><br> 
                                A new client has contacted the company via the contact us form on the website. Below are the client informations:<br><br>
                                <b>Company Name:</b> `+ Companyname +`<br><br>
                                <b>First Name:</b> `+ Firstname +`<br><br>
                                <b>Last Name:</b> `+ Lastname +`<br><br>
                                <b>Email:</b> `+ Email +`<br><br>
                                <b>Mobile:</b> `+ Mobile +`<br><br>
                                <b>Telephone:</b> `+ Telephone +`<br><br>
                                <b>Policies Consent:</b> `+ PoliciesConsent +`<br><br>
                                <b>Marketing Email Consent:</b> `+ MarketingConsent +`<br><br>
                                <b>Time:</b> `+ Time +`<br><br>
                                <b>Message:</b><br><br> `+ Message +`<br><br><br>
                                Your client is waiting for you to get in touch with them.<br><br>
                                Thank you<br><br>
                                Kind Regards,<br>
                                Your Automatic Distributor<br>
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
        transporter.sendMail(mailOptions2,getDeliveryStatus);
    };

//.onDataAdded is watches for changes in database
exports.onDataAdded = functions.database.ref('/client_messages/{sessionId}').onCreate(function (snap, context) {

    //here we catch a new data, added to firebase database, it stored in a snap variable
    const createdData = snap.val();
    var email = createdData.Email;
    var fname = createdData.Firstname;
    var lname = createdData.Lastname;
    var message = createdData.Messages;
    var mobile = createdData.Mobile;
    var companyname = createdData.Companyname
    var telephone = createdData.Telephone;
    var policiesConsent=createdData.PoliciesConsent;
    var marketingConsent=createdData.MarketingEmail;
    var time = createdData.Timestampe;



    //here we send new data using function for sending emails
    goMail(email,fname,lname,message,mobile,companyname,telephone,policiesConsent,marketingConsent,time);
});