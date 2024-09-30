import React from "react";
import { Container, Typography, Grid, AppBar, Toolbar, Box } from "@mui/material";
import Balance from "./components/Balance";
import TransferPoints from "./components/TransferPoints";
import ConvertPoints from "./components/ConvertPoints";
import TransactionHistory from "./components/TransactionHistory";
import "./App.css"; // Import CSS for background image

function App() {
  return (
    <>
      {/* Background Image with Blur */}
      <div className="app-background"></div>

      {/* Content on top of the background */}
      <div className="app-content">
        {/* Navbar */}
        <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <Toolbar>
            <Typography variant="h6">Loyalty Points Exchange</Typography>
          </Toolbar>
        </AppBar>

        {/* Centering Container */}
        <Container
          sx={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column", // Centering vertically
          }}
        >
          {/* Centered Title (Optional) */}
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "white", mb: 4 }}>
            Dashboard
          </Typography>

          {/* Grid Layout for Cards */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Balance />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TransferPoints />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ConvertPoints />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TransactionHistory />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
