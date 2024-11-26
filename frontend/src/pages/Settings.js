import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../utils/api';

const Settings = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.put('/settings', { password }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setSuccess('Password updated successfully.');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update password.');
        }
    };

    return (
        <Container>
            <h2>Settings</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Update Password
                </Button>
            </Form>
        </Container>
    );
};

export default Settings;