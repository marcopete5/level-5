const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Bounty Schema
const bountySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    status: {
        type: String,
        enum: ['Alive', 'Deceased', 'Dead or Alive'],
        required: true
    },
    bountyAmount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Sith', 'Jedi'],
        required: true
    }
});

module.exports = mongoose.model('Bounty', bountySchema);
