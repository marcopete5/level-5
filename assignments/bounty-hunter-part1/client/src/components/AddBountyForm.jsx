import React, { useState } from 'react';

export default function AddBountyForm(props) {
    const initInputs = {
        firstName: props.firstName || '',
        lastName: props.lastName || '',
        status: props.status || 'Alive', // Replaced 'living' with 'status'
        bountyAmount: props.bountyAmount || '',
        type: props.type || 'Sith'
    };

    const [inputs, setInputs] = useState(initInputs);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submit(inputs);

        if (!props._id) {
            setInputs(initInputs);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bounty-form">
            <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="number"
                name="bountyAmount"
                value={inputs.bountyAmount}
                onChange={handleChange}
                placeholder="Bounty Amount"
                required
            />
            <select name="type" value={inputs.type} onChange={handleChange}>
                <option value="Sith">Sith</option>
                <option value="Jedi">Jedi</option>
            </select>
            {/* New dropdown for status */}
            <select name="status" value={inputs.status} onChange={handleChange}>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="Dead or Alive">Dead or Alive</option>
            </select>
            <button>{props.btnText}</button>
        </form>
    );
}
