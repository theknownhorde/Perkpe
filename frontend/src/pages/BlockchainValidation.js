import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Badge, ListGroup, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const BlockchainValidation = () => {
  const [validationStatus, setValidationStatus] = useState('pending');
  const [validationSteps, setValidationSteps] = useState([]);
  const [nodeResponses, setNodeResponses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = location.state?.transaction;

  useEffect(() => {
    if (!transaction) {
      navigate('/transfer');
      return;
    }
    
    simulateBlockchainValidation();
  }, [transaction, navigate]);

  const simulateBlockchainValidation = async () => {
    const steps = [
      { id: 1, status: 'pending', message: 'Verifying transaction signature' },
      { id: 2, status: 'pending', message: 'Checking account balances' },
      { id: 3, status: 'pending', message: 'Validating with network nodes' },
      { id: 4, status: 'pending', message: 'Adding to blockchain' }
    ];
    setValidationSteps(steps);

    // Simulate validation steps with delays
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setValidationSteps(prev => 
        prev.map(step => 
          step.id === i + 1 ? { ...step, status: 'completed' } : step
        )
      );

      // Simulate node responses for step 3
      if (i === 2) {
        const nodes = [
          { id: 1, hash: generateRandomHash(), status: 'verified' },
          { id: 2, hash: generateRandomHash(), status: 'verified' },
          { id: 3, hash: generateRandomHash(), status: 'verified' }
        ];
        setNodeResponses(nodes);
      }
    }

    setValidationStatus('completed');
  };

  const generateRandomHash = () => {
    return Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success"><i className="bi bi-check-circle me-1"></i>Completed</Badge>;
      case 'pending':
        return <Badge bg="warning"><i className="bi bi-clock me-1"></i>Pending</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleReturn = () => {
    navigate('/transfer');
  };

  if (!transaction) {
    return <Container className="py-4">
      <Alert variant="danger">No transaction data found. Please create a transaction first.</Alert>
    </Container>;
  }

  return (
    <Container className="py-4">
      <Card>
        <Card.Header>
          <Card.Title>Blockchain Validation</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card className="mb-4">
            <Card.Header>Transaction Details</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Transaction Hash:</strong>
                  <pre className="mt-1 bg-light p-2 rounded">
                    {transaction.hash}
                  </pre>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>From:</strong> {transaction.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Points:</strong> {transaction.points}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Platform:</strong> {transaction.platform}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header>Validation Progress</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {validationSteps.map((step) => (
                  <ListGroup.Item key={step.id} className="d-flex justify-content-between align-items-center">
                    {step.message}
                    {getStatusBadge(step.status)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {nodeResponses.length > 0 && (
            <Card className="mb-4">
              <Card.Header>Network Node Responses</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {nodeResponses.map((node) => (
                    <ListGroup.Item key={node.id} className="d-flex justify-content-between align-items-center">
                      <div>Node {node.id}: <code>{node.hash}</code></div>
                      {getStatusBadge(node.status)}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {validationStatus === 'completed' && (
            <Alert variant="success" className="mb-4">
              <i className="bi bi-check-circle-fill me-2"></i>
              Transaction has been successfully validated and added to the blockchain!
            </Alert>
          )}

          <div className="d-grid">
            <Button onClick={handleReturn} variant="primary">
              Return to Transfer Page
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlockchainValidation;