const express = require('express');
const bountyRouter = express.Router();
const Bounty = require('../models/bounty.js');

// GET all bounties
bountyRouter.get('/', (req, res, next) => {
    Bounty.find()
        .then((bounties) => res.status(200).send(bounties))
        .catch((err) => {
            res.status(500);
            return next(err);
        });
});

// POST a new bounty
bountyRouter.post('/', (req, res, next) => {
    const newBounty = new Bounty(req.body);
    newBounty
        .save()
        .then((savedBounty) => res.status(201).send(savedBounty))
        .catch((err) => {
            res.status(500);
            return next(err);
        });
});

// DELETE a bounty
bountyRouter.delete('/:bountyId', (req, res, next) => {
    Bounty.findOneAndDelete({ _id: req.params.bountyId })
        .then((deletedBounty) =>
            res
                .status(200)
                .send(
                    `Successfully deleted bounty: ${deletedBounty.firstName} ${deletedBounty.lastName}`
                )
        )
        .catch((err) => {
            res.status(500);
            return next(err);
        });
});

// PUT (update) a bounty
bountyRouter.put('/:bountyId', (req, res, next) => {
    Bounty.findOneAndUpdate({ _id: req.params.bountyId }, req.body, {
        new: true
    })
        .then((updatedBounty) => res.status(201).send(updatedBounty))
        .catch((err) => {
            res.status(500);
            return next(err);
        });
});

module.exports = bountyRouter;
