// 1. Import Express and UUID
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

// 2. Define the server port
const PORT = 3000;

// 3. Create the initial in-memory "database"
let bounties = [
    {
        firstName: 'Darth',
        lastName: 'Maul',
        status: 'Alive', // Replaced 'living' with 'status'
        bountyAmount: 50000,
        type: 'Sith',
        _id: uuidv4()
    },
    {
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        status: 'Alive', // Replaced 'living' with 'status'
        bountyAmount: 75000,
        type: 'Jedi',
        _id: uuidv4()
    }
];

// 4. Middleware
app.use(express.json());
app.use(cors());

// 5. Define the Routes

// GET all bounties
app.get('/bounty', (req, res) => {
    res.send(bounties);
});

// POST a new bounty
app.post('/bounty', (req, res) => {
    const newBounty = req.body;
    newBounty._id = uuidv4();
    bounties.push(newBounty);
    res.send(newBounty);
});

// DELETE a bounty
app.delete('/bounty/:bountyId', (req, res) => {
    const bountyId = req.params.bountyId;
    const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId);
    bounties.splice(bountyIndex, 1);
    res.send('Successfully deleted the bounty!');
});

// PUT (update) a bounty
app.put('/bounty/:bountyId', (req, res) => {
    const bountyId = req.params.bountyId;
    const updatedBountyData = req.body;
    const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId);
    const updatedBounty = Object.assign(
        bounties[bountyIndex],
        updatedBountyData
    );
    res.send(updatedBounty);
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Bounty hunter server is running on port ${PORT}`);
});
