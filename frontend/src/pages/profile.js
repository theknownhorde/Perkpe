import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios from '../utils/api';

const Profile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUser(data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch profile.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.put('/api/profile', user, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setSuccess('Profile updated successfully.');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile.');
        }
    };

    return (
        <Container>
            <h2>Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>User Details</Card.Title>
                    <Card.Text><strong>Name:</strong> {user.name}</Card.Text>
                    <Card.Text><strong>Email:</strong> {user.email}</Card.Text>
                    <Card.Text><strong>Balance:</strong> {user.balance} Points</Card.Text>
                </Card.Body>
            </Card>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={user.name || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={user.email || ''}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Update Profile
                </Button>
            </Form>
        </Container>
    );
};

export default Profile;