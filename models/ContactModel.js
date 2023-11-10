const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    status: {type: String, required: true},
    phone: {type: Number, required: true},
    user: {type: String, required: true},
},{
    versionKey: false
})

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = {
    ContactModel,
}