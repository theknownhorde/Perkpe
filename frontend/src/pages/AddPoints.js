import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from '../utils/api';

const AddPoints = () => {
  const [platform, setPlatform] = useState('');
  const [points, setPoints] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!platform || !points) {
      setError('All fields are required.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      await axios.post(
        '/points/add',
        { platform, points },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Points added successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add points. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4B0082' }}>Add Points</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="platform">
          <Form.Label>Platform</Form.Label>
          <Form.Control
            type="text"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="points">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Add Points
        </Button>
      </Form>
    </div>
  );
};

export default AddPoints;