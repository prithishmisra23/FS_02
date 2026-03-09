const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    source: {
        type: String,
        required: [true, 'Please specify a source'],
        enum: ['Website', 'LinkedIn', 'Referral', 'Event', 'Other']
    },
    status: {
        type: String,
        required: [true, 'Please specify a status'],
        enum: ['new', 'contacted', 'converted'],
        default: 'new'
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);
