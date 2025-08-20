// 1. Import Express and UUID
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

// 2. Define the server port
const PORT = 3000;

// 3. Create the initial in-memory "database"
let bounties = [
    {
        firstName: 'Darth',
        lastName: 'Maul',
        living: true,
        bountyAmount: 50000,
        type: 'Sith',
        _id: uuidv4()
    },
    {
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        living: true,
        bountyAmount: 75000,
        type: 'Jedi',
        _id: uuidv4()
    }
];

// 4. Middleware to parse JSON
app.use(express.json());

// 5. Define the Routes

// GET all bounties
app.get('/bounty', (req, res) => {
    res.send(bounties);
});

app.get('/bounty/:id', (req, res) => {
    const bountyId = req.params.id;

    // Find the index of the bounty with the matching ID
    const bounty = bounties.find((bounty) => bounty._id === bountyId);
    res.send(bounty);
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
    // Get the ID from the request parameters
    const bountyId = req.params.bountyId;

    // Find the index of the bounty with the matching ID
    const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId);

    // Remove the bounty from the array
    bounties.splice(bountyIndex, 1);

    // Send a confirmation message
    res.send('Successfully deleted the bounty!');
});

// PUT (update) a bounty
app.put('/bounty/:bountyId', (req, res) => {
    // Get the ID from the request parameters
    const bountyId = req.params.bountyId;

    // Get the updated bounty data from the request body
    const updatedBountyData = req.body;

    // Find the index of the bounty with the matching ID
    const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId);

    // Use Object.assign to update the existing bounty with the new data
    const updatedBounty = Object.assign(
        bounties[bountyIndex],
        updatedBountyData
    );

    // Send back the updated bounty
    res.send(updatedBounty);
});

// 6. Start the server
app.listen(PORT, () => {
    console.log(`Bounty hunter server is running on port ${PORT}`);
});
