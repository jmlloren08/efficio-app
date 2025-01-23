import React, { useState } from 'react';

export default function Employees({ employees }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const submit = (e) => {
        e.preventDefault();
    }

    const handleDelete = (e) => {
        alert('Remove');
    }

    return (
        <div>
            <div>
                <h1>Employee Management</h1>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type='submit'>Add Staff</button>
                </form>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <select
                                    value={member.status}
                                    onChange={(e) => updateStatus(employee.id, e.target.value)}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Busy">Busy</option>
                                    <option value="On Break">On Break</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e.target.value)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </div>
        </div>
    );
}