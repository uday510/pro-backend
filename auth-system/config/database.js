const mongoose = require('mongoose');

const {MONGODB_URL} = process.env;

exports.connect = () => {
    mongoose
     .connect(MONGODB_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
     })
     .then(
         console.log(`DATABASE CONNECTION SUCCESSFUL`)
     )
     .catch(error => {
         console.log(`DATABASE CONNECTION FAILED`);
         console.log(error);
         process.exit(1);
     });
};



