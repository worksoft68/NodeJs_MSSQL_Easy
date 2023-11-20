

module.exports = {   
    sqlServer: {        
        user: 'sa',
        password: "FutureOffice@123",
        database: "FutureOffice",
        server: '127.0.0.1',
        pool: {
            max: 5000,
            min: 0,
            idleTimeoutMillis: 5000
        },
        options: {
            //encrypt: true, // for azure
            encrypt: false,
            trustServerCertificate: true, // change to true for local dev / self-signed certs
            cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
            //encrypt: true, // for azure
        // trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    },
    sqlServerLog: {
        user: 'sa',
        password: "FutureOffice@123",
        database: "FutureOffice",
        server: '127.0.0.1',
        pool: {
             max: 5000,
            min: 0,
            idleTimeoutMillis: 5000
        },
        options: {
            //encrypt: true, // for azure
            encrypt: false,
            trustServerCertificate: true, // change to true for local dev / self-signed certs
            cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        }
            //encrypt: true, // for azure
        // trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    }
  
};




