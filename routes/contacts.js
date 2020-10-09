const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new Contact, middleware required
// @route       POST api/contacts
// @desc        Add a new contact
// @access      Private
router.post('/', [auth, [check('name', 'Name is required').not().isEmpty()]], async (req, res) => {
  // Check for errors, if true send a 400
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {name, email, type} = req.body
  try {
    const newContact = new Contact({
      name, email, phone, type, user: req.user.id
    })
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
    
  }
});

// @route       PUT api/contacts/:id
// @desc        Update a contact
// @access      Private
router.put('/:id', (req, res) => {
  res.send('Update a contact');
});

// @route       POST api/contacts/:id
// @desc        Delete a contact
// @access      Private
router.post('/:id', (req, res) => {
  res.send('Delete a contact');
});

module.exports = router;
