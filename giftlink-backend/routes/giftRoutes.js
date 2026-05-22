const express = require("express");
const router = express.Router();

const connectToDatabase = require("../models/db");

// GET all gifts
router.get('/', async (req, res) => {
    try {

        // Connect to MongoDB
        const db = await connectToDatabase();

        // Get gifts collection
        const collection = db.collection("gifts");

        // Fetch all gifts
        const gifts = await collection.find({}).toArray();

        // Return gifts
        res.json(gifts);

    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// GET gift by ID
router.get('/:id', async (req, res) => {
    try {

        // Connect to MongoDB
        const db = await connectToDatabase();

        // Get gifts collection
        const collection = db.collection("gifts");

        const id = req.params.id;

        // Find gift by ID
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send('Gift not found');
        }

        res.json(gift);

    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// Add a new gift
router.post('/', async (req, res, next) => {
    try {

        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        const result = await collection.insertOne(req.body);

        // return inserted document (safe modern approach)
        res.status(201).json(result);

    } catch (e) {
        next(e);
    }
});

module.exports = router;