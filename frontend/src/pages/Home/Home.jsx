// // import React from 'react'
// // import './Home.scss'
// // import Sidebar from '../../components/Sidebar/Sidebar'
// // import Navbar from '../../components/Navbar/Navbar'
// // import Widget from '../../components/Widget/Widget'
// // import Featured from '../../components/Featured/Featured'
// // import Chart from '../../components/Chart/Chart'
// // import UserList from '../../components/UserList/UserList'

// // const Home = () => {
// //   return (
// //     <div className='home'>
// //       <Sidebar />
// //       {/* <div className='homeContainer'>
// //         <Navbar />
// //         <div className='widgets'>
// //           <Widget type='user' />
// //           <Widget type='order' />
// //           <Widget type='earning' />
// //           <Widget type='balance' />
// //         </div>
// //         <div className='charts'>
// //           <Featured />
// //           <Chart title='Last 6 Months (Revenue)' height={320} />
// //         </div>
// //         <div className='listContainer'>
// //           <div className='listTitle'>send or request from</div>
// //           <UserList />
// //         </div>
// //       </div> */}
// //     </div>
// //   )
// // }

// // export default Home
// import React from 'react'
// import './Home.scss'
// import Sidebar from '../../components/Sidebar/Sidebar'
// import Navbar from '../../components/Navbar/Navbar'
// import Widget from '../../components/Widget/Widget'
// import Featured from '../../components/Featured/Featured'
// import Chart from '../../components/Chart/Chart'
// import UserList from '../../components/UserList/UserList'
// import Card from '../../components/Card/Card' // Import the new Card component

// // const Home = () => {
// //   return (
// //     <div className='home'>
// //       <Sidebar />
// //       <div className='homeContainer'>
// //         <Navbar />
// //         {/* <div className='widgets'>
// //           <Widget type='user' />
// //           <Widget type='order' />
// //           <Widget type='earning' />
// //           <Widget type='balance' />
// //         </div>
// //         <div className='charts'>
// //           <Featured />
// //           <Chart title='Last 6 Months (Revenue)' height={320} />
// //         </div>
// //         <div className='listContainer'>
// //           <div className='listTitle'>send or request from</div>
// //           <UserList />
// //         </div> */}
// //         {/* New Cards Section */}
// //         <div className='cardsContainer'>
// //           <Card title='Amazon' credits='100' />
// //           <Card title='H&M' credits='200' />
// //           <Card title='Myntra' credits='150' />
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// // ... existing imports ...

// const Home = () => {
//   const [selectedToken, setSelectedToken] = useState(null); // State to store selected token

//   const selectToken = () => {
//     const tokens = ['ETH', 'USDT', 'Amazon']; // Example token list
//     const selected = prompt("Select a token: " + tokens.join(", "));
    
//     if (tokens.includes(selected)) {
//       setSelectedToken(selected); // Update state with selected token
//       // Logic to complete the transaction can be added here
//       alert(`Transaction initiated with ${selected} token.`);
//     } else {
//       alert("Invalid token selected.");
//     }
//   };

//   return (
//     <div className='home'>
//       <Sidebar />
//       <div className='homeContainer'>
//         <Navbar />
//         {/* New Cards Section */}
//         <div className='cardsContainer'>
//           <Card title='Amazon' credits='100' onBuyClick={selectToken} /> {/* Pass the function as a prop */}
//           <Card title='H&M' credits='200' />
//           <Card title='Myntra' credits='150' />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home

import React, { useState } from 'react'; // Ensure useState is imported
import './Home.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import Widget from '../../components/Widget/Widget';
import Featured from '../../components/Featured/Featured';
import Chart from '../../components/Chart/Chart';
import UserList from '../../components/UserList/UserList';
import Card from '../../components/Card/Card'; // Import the new Card component

const Home = () => {
  const [selectedToken, setSelectedToken] = useState(null); // State to store selected token

  const selectToken = () => {
    const tokens = ['ETH', 'USDT', 'Amazon']; // Example token list
    const selected = prompt("Select a token: " + tokens.join(", "));
    
    if (tokens.includes(selected)) {
      setSelectedToken(selected); // Update state with selected token
      // Redirect to the specified URL instead of MetaMask
      window.location.href = 'http://localhost:5173/'; // Redirect to localhost
    } else {
      alert("Invalid token selected.");
    }
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        {/* New Cards Section */}
        <div className='cardsContainer'>
          <Card title='Amazon' credits='100' onBuyClick={selectToken} /> {/* Pass the function as a prop */}
          <Card title='H&M' credits='200' />
          <Card title='Myntra' credits='150' />
        </div>
      </div>
    </div>
  );
}

export default Home;