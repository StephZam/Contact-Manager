const express = require('express');
const { ContactModel } = require('../models/ContactModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const contactRouter = express.Router();
const { authenticator } = require('../middlewares/authenticator');
contactRouter.use(authenticator);



//Read
contactRouter.get('/', async(req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
        try{
            let data = await ContactModel.find({user:decoded.userId})
            res.send({
                data: data,
                message: 'Success',
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    })
});



//Create
contactRouter.post('/create', async (req, res) => {
  try {
    // Create a new contact instance with the data from the request body
    const contactData = req.body;
    // Set the "user" field of the contacts to the authenticated user's ID
    contactData.user = req.userId;

    const contact = new ContactModel(contactData);
    await contact.save();
    res.send({
      message: "Contact created",
      status: 1,
    });
  } catch (error) {
    res.send({
      message: error.message,
      status: 0,
    });
  }
});


//Update
contactRouter.patch('/', async (req, res) => {
    let {id} = req.headers
    try {
        await ContactModel.findByIdAndUpdate({_id:id}, req.body)
        res.send({
            message: "Contact updated",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


//Delete
contactRouter.delete('/', async (req, res) => {
    let {id} = req.headers
    try {
        await ContactModel.findByIdAndDelete({_id:id})
        res.send({
            message: "Contact deleted",
            status: 1
        })  
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})


module.exports = {
  contactRouter,
};
