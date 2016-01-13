module.exports = {

//    databaseURL: process.env.DATABASE_URL || "postgres://@127.0.0.1:5432/nibs",
    databaseURL: "postgres://foryjqjmofgrez:nDa5AUDuNMAhi0IBSWTS_oFoZF@ec2-54-195-252-202.eu-west-1.compute.amazonaws.com:5432/d7lfvch6ekhl75",

    // Nibs users are created as Contacts under a generic Account in SFDC. This is the id of the generic account.
    contactsAccountId: process.env.CONTACTS_ACCOUNT_ID,

    productFamily: process.env.PRODUCT_FAMILY || "Nibs",

    // Used by nforce to create Cases in real time
    api: {
        // Connected app
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectUri: process.env.OAUTH_REDIRECT_URL,
        apiVersion: 'v29.0',

        // SFDC user used to make API calls from Node server
        userName: process.env.INTEGRATION_USER_NAME,
        password: process.env.INTEGRATION_USER_PASSWORD
    },

    // Used for picture upload (user profile and gallery)
    s3: {
        bucket: process.env.S3_BUCKET_NAME,
        awsKey: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET
    }

};
