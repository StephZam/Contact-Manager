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
    // Create a new movie instance with the data from the request body
    const movieData = req.body;
    // Set the "user" field of the movie to the authenticated user's ID
    movieData.user = req.userId;

    const movie = new ContactModel(movieData);
    movie.save().then(
    res.send({
      message: "Movie created",
      status: 1,
    }));
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
            message: "Movie updated",
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
            message: "Movie deleted",
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
