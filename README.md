
# Loyalty Points Exchange System Using Blockchain




## **Overview**
The Loyalty Points Exchange System is a decentralized, blockchain-based platform that allows users to manage and exchange loyalty points securely and transparently. This system addresses the inefficiencies of traditional loyalty programs by leveraging blockchain technology to create an immutable transaction ledger and enable seamless, real-time transactions with minimal costs.

---

## **Features**
- **Unified Digital Wallet**: Store loyalty points from various businesses in one place.
- **Points Exchange**: Transfer points between users or convert them into rewards such as discounts or cash equivalents.
- **Transaction History**: Maintain a secure, immutable record of all transactions with blockchain technology.
- **Responsive Dashboard**: Provides an intuitive and user-friendly interface for users to manage their loyalty points.
- **Real-Time Notifications**: Alerts users about successful transactions, balance updates, and system announcements.

---

## **Technologies Used**

### **Frontend**
- **React.js**: For building a dynamic and responsive user interface.
- **Redux**: State management for handling user data and transactions efficiently.
- **Material-UI**: Pre-designed responsive components for enhanced user experience.
- **HTML/CSS/JavaScript**: Core technologies for the structure, style, and interactivity of the application.

### **Backend**
- **Node.js**: Handles server-side logic and API endpoints.
- **Express.js**: Facilitates RESTful API development and backend routing.



### **Database**
- **MongoDB**: Stores user profiles, wallet metadata, and application settings.

### **Testing Tools**
- **Selenium**: For automated UI testing.
- **Postman**: For API testing.

---

## **System Requirements**
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **MongoDB**: v5.0 or higher
- **Web Browser**: Chrome, Firefox, or Edge

---

## **Setup and Installation**

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/theknownhorde/Perkpe.git
cd loyalty-points-exchange
```

### **Step 2: Install Dependencies**
Install dependencies for both the frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### **Step 3: Configure Environment Variables**
Create `.env` files in the `backend` and `frontend` directories with the following values:

#### Backend `.env`:
```env
PORT=5000
MONGO_URI=<Your_MongoDB_URI>
```

#### Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5003
REACT_APP_ETH_NETWORK=rinkeby
```

### **Step 4: Start the Application**
Start the backend and frontend servers:
```bash
# Start backend server
cd backend
npm start

# Start frontend server
cd ../frontend
npm start
```

The application will be accessible at `http://localhost:3000`.

---

## **Usage**
1. **Sign Up**: Create an account and securely log in using multi-factor authentication.
2. **Add Points**: Link loyalty points from participating businesses to your digital wallet.
3. **Transfer Points**: Send points to other users in real time.
4. **Redeem Points**: Convert points into cash or discounts seamlessly.
5. **View Transaction History**: Access an immutable record of all transactions.

---

## **Smart Contract Details**
- **Contract Language**: Solidity
- **Key Functions**:
  - `transferPoints(address to, uint amount)`: Transfers points between users.
  - `redeemPoints(uint amount)`: Redeems points for rewards.
  - `getTransactionHistory()`: Retrieves the transaction history for a user.
- **Gas Optimization**: Implements efficient algorithms to minimize transaction costs.

---

## **Testing**
- **Unit Tests**: Validate individual components using Jest.
- **Integration Tests**: Test end-to-end functionality using Selenium.
- **API Tests**: Ensure the APIs return correct responses using Postman.

To run tests:
```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd ../frontend
npm test
```

---

## **Contributors**
- **Akshit Anand** (Data Science)
- **Samay Singh** (Artificial Intelligence)
- **Yogesh Tanwar** (Data Science)

---

## **License**
This project is licensed under the [MIT License](LICENSE).

