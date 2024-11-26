import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import successIcon from '../assets/Success Icon with Checkmark.webp'; // Ensure correct path
import './paymentSucess.css'; // Import the CSS file

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { points, amount, transactionId } = location.state || {};

    const handleReturnToDashboard = () => {
        navigate('/');
    };

    return (
        <Container fluid className="payment-success-container">
            <div className="payment-success-content">
                {/* Success Icon */}
                <img
                    src={successIcon}
                    alt="Payment Successful"
                    className="payment-success-icon"
                />

                {/* Success Message */}
                <h1 className="payment-success-header">Points Transferred Successfully!</h1>
                <p className="payment-success-text">
                    Your points have been successfully transferred to your bank account as cash.
                </p>

                {/* Transaction Summary */}
                <Card className="text-start mt-4">
                    <Card.Header className="payment-success-card-header">
                        Transaction Summary
                    </Card.Header>
                    <Card.Body>
                        <p>
                            <strong>Transaction ID:</strong> {transactionId || 'N/A'}
                        </p>
                        <p>
                            <strong>Date:</strong> {new Date().toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Points Transferred:</strong> {points || 'N/A'}
                        </p>
                        <p>
                            <strong>Amount Credited:</strong> ₹{amount || 'N/A'}
                        </p>
                        <p>
                            <strong>Transfer Method:</strong> Bank Transfer
                        </p>
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className="payment-success-status">Successful</span>
                        </p>
                    </Card.Body>
                </Card>

                {/* CTA Buttons */}
                <div className="mt-4">
                    <Button
                        variant="success"
                        size="lg"
                        onClick={handleReturnToDashboard}
                        className="me-3"
                    >
                        Return to Dashboard
                    </Button>
                    <Button variant="outline-success" size="lg" onClick={() => window.print()}>
                        Print Receipt
                    </Button>
                </div>

                {/* Additional Notes */}
                <p className="payment-success-notes">
                    If you have any questions or concerns about your transfer, please contact our
                    support team at{' '}
                    <a
                        href="mailto:support@example.com"
                        className="payment-success-link"
                    >
                        support@example.com
                    </a>.
                </p>
            </div>
        </Container>
    );
};

export default PaymentSuccess;