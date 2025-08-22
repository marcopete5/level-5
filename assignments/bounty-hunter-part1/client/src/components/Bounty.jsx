import React, { useState } from 'react';
import AddBountyForm from './AddBountyForm';

export default function Bounty(props) {
    const {
        firstName,
        lastName,
        status,
        bountyAmount,
        type,
        _id,
        deleteBounty,
        editBounty
    } = props;
    const [editToggle, setEditToggle] = useState(false);

    const handleEditSubmit = (updates) => {
        editBounty(updates, _id);
        setEditToggle(false);
    };

    return (
        <div className={`bounty-card ${type.toLowerCase()}`}>
            {!editToggle ? (
                <>
                    <h1>
                        {firstName} {lastName}
                    </h1>
                    <p>Status: {status}</p> {/* Display the new status field */}
                    <p>Affiliation: {type}</p>
                    <p className="bounty-amount">
                        Bounty: {bountyAmount} Credits
                    </p>
                    <div className="card-buttons">
                        <button
                            className="delete-btn"
                            onClick={() => deleteBounty(_id)}>
                            Delete
                        </button>
                        <button
                            className="edit-btn"
                            onClick={() =>
                                setEditToggle((prevToggle) => !prevToggle)
                            }>
                            Edit
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <AddBountyForm
                        firstName={firstName}
                        lastName={lastName}
                        status={status} // Pass status instead of living
                        bountyAmount={bountyAmount}
                        type={type}
                        _id={_id}
                        btnText="Submit Edit"
                        submit={handleEditSubmit}
                    />
                    <button
                        className="close-btn"
                        onClick={() =>
                            setEditToggle((prevToggle) => !prevToggle)
                        }>
                        Close
                    </button>
                </>
            )}
        </div>
    );
}
