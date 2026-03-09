const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Create a new lead
// @route   POST /api/leads
router.post('/', async (req, res) => {
    const { name, email, source, status, notes } = req.body;

    try {
        const newLead = new Lead({
            name,
            email,
            source,
            status,
            notes
        });

        const lead = await newLead.save();
        res.status(201).json(lead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @desc    Update lead status or notes
// @route   PUT /api/leads/:id
router.put('/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        const { status, notes } = req.body;

        if (status) lead.status = status;
        if (notes !== undefined) lead.notes = notes;

        const updatedLead = await lead.save();
        res.json(updatedLead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @desc    Delete lead
// @route   DELETE /api/leads/:id
router.delete('/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        await lead.deleteOne();
        res.json({ message: 'Lead removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
