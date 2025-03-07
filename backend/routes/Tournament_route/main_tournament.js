import express from "express";
import { RoomModel } from './../../index.js';

const Main_tournament = express.Router();

// Get all tournaments
Main_tournament.get('/', async (req, res) => {
    try {
        const room = await RoomModel.find();
        res.status(200).json({ message: 'tournaments', room });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get a specific tournament by ID
Main_tournament.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const room = await RoomModel.findById(id);
        console.log(room);
        

        if (!room) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        res.status(200).json({ message: 'Tournament found', room });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default Main_tournament;
