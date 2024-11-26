// import React, { useState, useEffect } from 'react';
// import { Container, Card, Alert, Badge, ListGroup, Button } from 'react-bootstrap';
// import { useLocation, useNavigate } from 'react-router-dom';

// const BlockchainValidation = () => {
//   const [validationStatus, setValidationStatus] = useState('pending');
//   const [validationSteps, setValidationSteps] = useState([]);
//   const [nodeResponses, setNodeResponses] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const transaction = location.state?.transaction;

//   useEffect(() => {
//     if (!transaction) {
//       navigate('/transfer');
//       return;
//     }
    
//     simulateBlockchainValidation();
//   }, [transaction, navigate]);

//   const simulateBlockchainValidation = async () => {
//     const steps = [
//       { id: 1, status: 'pending', message: 'Verifying transaction signature' },
//       { id: 2, status: 'pending', message: 'Checking account balances' },
//       { id: 3, status: 'pending', message: 'Validating with network nodes' },
//       { id: 4, status: 'pending', message: 'Adding to blockchain' }
//     ];
//     setValidationSteps(steps);

//     // Simulate validation steps with delays
//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setValidationSteps(prev => 
//         prev.map(step => 
//           step.id === i + 1 ? { ...step, status: 'completed' } : step
//         )
//       );

//       // Simulate node responses for step 3
//       if (i === 2) {
//         const nodes = [
//           { id: 1, hash: generateRandomHash(), status: 'verified' },
//           { id: 2, hash: generateRandomHash(), status: 'verified' },
//           { id: 3, hash: generateRandomHash(), status: 'verified' }
//         ];
//         setNodeResponses(nodes);
//       }
//     }

//     setValidationStatus('completed');
//   };

//   const generateRandomHash = () => {
//     return Array.from({ length: 16 }, () => 
//       Math.floor(Math.random() * 16).toString(16)
//     ).join('');
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case 'completed':
//         return <Badge bg="success"><i className="bi bi-check-circle me-1"></i>Completed</Badge>;
//       case 'pending':
//         return <Badge bg="warning"><i className="bi bi-clock me-1"></i>Pending</Badge>;
//       default:
//         return <Badge bg="secondary">Unknown</Badge>;
//     }
//   };

//   const handleReturn = () => {
//     navigate('/transfer');
//   };

//   if (!transaction) {
//     return <Container className="py-4">
//       <Alert variant="danger">No transaction data found. Please create a transaction first.</Alert>
//     </Container>;
//   }

//   return (
//     <Container className="py-4">
//       <Card>
//         <Card.Header>
//           <Card.Title>Blockchain Validation</Card.Title>
//         </Card.Header>
//         <Card.Body>
//           <Card className="mb-4">
//             <Card.Header>Transaction Details</Card.Header>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <strong>Transaction Hash:</strong>
//                   <pre className="mt-1 bg-light p-2 rounded">
//                     {transaction.hash}
//                   </pre>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>From:</strong> {transaction.email}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>Points:</strong> {transaction.points}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>Platform:</strong> {transaction.platform}
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>

//           <Card className="mb-4">
//             <Card.Header>Validation Progress</Card.Header>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 {validationSteps.map((step) => (
//                   <ListGroup.Item key={step.id} className="d-flex justify-content-between align-items-center">
//                     {step.message}
//                     {getStatusBadge(step.status)}
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Card.Body>
//           </Card>

//           {nodeResponses.length > 0 && (
//             <Card className="mb-4">
//               <Card.Header>Network Node Responses</Card.Header>
//               <Card.Body>
//                 <ListGroup variant="flush">
//                   {nodeResponses.map((node) => (
//                     <ListGroup.Item key={node.id} className="d-flex justify-content-between align-items-center">
//                       <div>Node {node.id}: <code>{node.hash}</code></div>
//                       {getStatusBadge(node.status)}
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//           )}

//           {validationStatus === 'completed' && (
//             <Alert variant="success" className="mb-4">
//               <i className="bi bi-check-circle-fill me-2"></i>
//               Transaction has been successfully validated and added to the blockchain!
//             </Alert>
//           )}

//           <div className="d-grid">
//             <Button onClick={handleReturn} variant="primary">
//               Return to Transfer Page
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default BlockchainValidation;
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Badge, ListGroup, Button, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const BlockchainValidation = () => {
  const [validationStatus, setValidationStatus] = useState('pending');
  const [validationSteps, setValidationSteps] = useState([]);
  const [nodeResponses, setNodeResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blockData, setBlockData] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = location.state?.transaction;

  useEffect(() => {
    if (!transaction) {
      navigate('/transfer');
      return;
    }
    
    simulateBlockchainValidation();
    generateBlockData();
  }, [transaction, navigate]);

  const generateBlockData = () => {
    const block = {
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString(),
      previousHash: generateRandomHash(),
      merkleRoot: generateRandomHash(),
      nonce: Math.floor(Math.random() * 100000),
      difficulty: 4
    };
    setBlockData(block);
  };

  const simulateBlockchainValidation = async () => {
    try {
      const steps = [
        { id: 1, status: 'pending', message: 'Verifying transaction signature' },
        { id: 2, status: 'pending', message: 'Checking account balances' },
        { id: 3, status: 'pending', message: 'Validating with network nodes' },
        { id: 4, status: 'pending', message: 'Adding to blockchain' }
      ];
      setValidationSteps(steps);

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setValidationSteps(prev => 
          prev.map(step => 
            step.id === i + 1 ? { ...step, status: 'completed' } : step
          )
        );

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
      setIsLoading(false);
    } catch (error) {
      console.error('Error during blockchain validation:', error);
      setValidationStatus('failed');
      setIsLoading(false);
    }
  };

  const generateRandomHash = () => {
    return Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success">✓ Completed</Badge>;
      case 'pending':
        return <Badge bg="warning">⏳ Pending</Badge>;
      case 'verified':
        return <Badge bg="success">✓ Verified</Badge>;
      case 'failed':
        return <Badge bg="danger">✗ Failed</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const handleReturn = () => {
    navigate('/transfer');
  };

  if (!transaction) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          No transaction data found. Please create a transaction first.
        </Alert>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="py-4">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <Card.Title className="h4 mb-0">Blockchain Validation</Card.Title>
        </Card.Header>
        <Card.Body>
          <div className="row">
            {/* Transaction Details */}
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Header className="bg-light">
                  <Card.Title className="h5 mb-0">Transaction Details</Card.Title>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Transaction Hash:</strong>
                      <pre className="mt-1 bg-light p-2 rounded small">
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
            </div>

            {/* Block Information */}
            <div className="col-md-6 mb-4">
              <Card>
                <Card.Header className="bg-light">
                  <Card.Title className="h5 mb-0">Block Information</Card.Title>
                </Card.Header>
                <Card.Body>
                  {blockData && (
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Block Number:</strong> {blockData.blockNumber}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Block Timestamp:</strong> {new Date(blockData.timestamp).toLocaleString()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Previous Hash:</strong>
                        <div className="text-muted small font-monospace mt-1">
                          {blockData.previousHash}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Merkle Root:</strong>
                        <div className="text-muted small font-monospace mt-1">
                          {blockData.merkleRoot}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Nonce:</strong> {blockData.nonce}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Difficulty:</strong> {blockData.difficulty}
                      </ListGroup.Item>
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* Network Nodes */}
          {nodeResponses.length > 0 && (
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <Card.Title className="h5 mb-0">Network Nodes</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="row g-3">
                  {nodeResponses.map((node) => (
                    <div key={node.id} className="col-md-4">
                      <div className="border rounded p-3 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0">Node {node.id}</h6>
                          {getStatusBadge(node.status)}
                        </div>
                        <div className="small font-monospace text-break bg-light p-2 rounded">
                          {node.hash}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Validation Steps */}
          <Card className="mb-4">
            <Card.Header className="bg-light">
              <Card.Title className="h5 mb-0">Validation Progress</Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {validationSteps.map((step) => (
                  <ListGroup.Item
                    key={step.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {step.message}
                    {getStatusBadge(step.status)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Status Messages */}
          {validationStatus === 'failed' && (
            <Alert variant="danger" className="mb-4">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Transaction validation failed. Please try again.
            </Alert>
          )}

          {validationStatus === 'completed' && (
            <Alert variant="success" className="mb-4">
              <i className="bi bi-check-circle-fill me-2"></i>
              Transaction has been successfully validated and added to the blockchain!
            </Alert>
          )}

          {/* Return Button */}
          <div className="d-grid">
            <Button onClick={handleReturn} variant="primary" size="lg">
              Return to Transfer Page
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlockchainValidation;