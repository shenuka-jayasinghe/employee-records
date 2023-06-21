const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/CrduDB', (err) => {
    if(!err)
        console.log('MongoDB connection succeeded.');
    else 
        console.log('Erorr in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;