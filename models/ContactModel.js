const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    body: {type: String, required: true},
    user: {type: String, required: true},
},{
    versionKey: false
})

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = {
    ContactModel,
}