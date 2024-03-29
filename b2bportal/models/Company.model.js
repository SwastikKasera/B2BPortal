const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: { 
        type: String,
        required: true
    },
    companySize: {
        type: Number,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
