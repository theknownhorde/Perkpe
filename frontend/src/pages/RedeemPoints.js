import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../utils/api';
import { useNavigate } from 'react-router-dom';

const RedeemPoints = () => {
    const [formData, setFormData] = useState({
        platform: '',
        points: '',
        amount: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to log in to redeem points.');
                return;
            }

            console.log('[DEBUG] Sending redeem request:', formData);
            const response = await axios.post('/redeem', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const { order } = response.data;
            console.log('[DEBUG] Received Razorpay order:', order);

            handleRazorpayPayment(order);
        } catch (err) {
            console.error('[ERROR] Redeem failed:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Failed to redeem points.');
        }
    };

    const handleRazorpayPayment = (order) => {
        const options = {
            key: 'rzp_test_4E5ZrpYhNWR2ti',
            amount: order.amount,
            currency: order.currency,
            name: 'Loyalty Points System',
            description: 'Redeem Points',
            order_id: order.id,
            handler: async (response) => {
                console.log('[DEBUG] Razorpay payment response:', response);
                try {
                    const token = localStorage.getItem('token');
                    const verifyResponse = await axios.post('/redeem/verify-payment', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    console.log('[DEBUG] Payment verified:', verifyResponse.data);

                    // Redirect to the payment success page with state data
                    navigate('/payment-success', {
                        state: {
                            platform: formData.platform,
                            points: formData.points,
                            amount: formData.amount,
                            transactionId: verifyResponse.data.transactionId,
                        },
                    });
                } catch (err) {
                    console.error('[ERROR] Payment verification failed:', err.response?.data || err.message);
                    setError('Payment verification failed.');
                }
            },
            prefill: { name: 'John Doe', email: 'john.doe@example.com', contact: '9999999999' },
            notes: { address: 'Loyalty Points System Office' },
            theme: { color: '#3399cc' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Container>
            <h2>Redeem Points</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Platform</Form.Label>
                    <Form.Control
                        type="text"
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        placeholder="Enter platform (e.g., Amazon, Flipkart)"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                        type="number"
                        name="points"
                        value={formData.points}
                        onChange={handleInputChange}
                        placeholder="Enter points to redeem"
                        required
                        min="1"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter amount (in ₹)"
                        required
                        min="1"
                    />
                </Form.Group>
                <Button type="submit" className="mt-3">Redeem</Button>
            </Form>
        </Container>
    );
};

export default RedeemPoints;
