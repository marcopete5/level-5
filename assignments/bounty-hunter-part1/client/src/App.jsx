import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bounty from './components/Bounty.jsx';
import AddBountyForm from './components/AddBountyForm.jsx';

// The API endpoint is your Express server's address
const API_ENDPOINT = 'http://localhost:3000/bounty';

function App() {
    const [bounties, setBounties] = useState([]);

    // 1. GET all bounties
    const getBounties = () => {
        axios
            .get(API_ENDPOINT)
            .then((res) => setBounties(res.data))
            .catch((err) => console.error(err));
    };

    // 2. POST a new bounty
    const addBounty = (newBounty) => {
        axios
            .post(API_ENDPOINT, newBounty)
            .then((res) => {
                setBounties((prevBounties) => [...prevBounties, res.data]);
            })
            .catch((err) => console.error(err));
    };

    // 3. DELETE a bounty
    const deleteBounty = (bountyId) => {
        axios
            .delete(`${API_ENDPOINT}/${bountyId}`)
            .then(() => {
                setBounties((prevBounties) =>
                    prevBounties.filter((bounty) => bounty._id !== bountyId)
                );
            })
            .catch((err) => console.error(err));
    };

    // 4. PUT (update) a bounty
    const editBounty = (updates, bountyId) => {
        axios
            .put(`${API_ENDPOINT}/${bountyId}`, updates)
            .then((res) => {
                setBounties((prevBounties) =>
                    prevBounties.map((bounty) =>
                        bounty._id !== bountyId ? bounty : res.data
                    )
                );
            })
            .catch((err) => console.error(err));
    };

    // Fetch bounties on initial component mount
    useEffect(() => {
        getBounties();
    }, []);

    return (
        <div className="app-container">
            <header>
                <h1>Bounty Hunter Ledger</h1>
            </header>
            <AddBountyForm submit={addBounty} btnText="Add Bounty" />
            <div className="bounties-list">
                {bounties.map((bounty) => (
                    <Bounty
                        {...bounty}
                        key={bounty._id}
                        deleteBounty={deleteBounty}
                        editBounty={editBounty}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
