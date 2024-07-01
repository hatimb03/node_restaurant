//1. create a schema
//2. create a model using the schema
//3. export and import it in server.js

const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    }, 
    age : {
        type: Number
    },
    work: {
        type: String,
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    address: {
        type: String, 
    },
    salary: {
        type: Number, 
        required: true
    }

});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;