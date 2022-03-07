import { useEffect, useState } from "react";
import { Grommet, Box } from "grommet";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LogInPage";
import WodsPage from "./pages/WodsPage";

import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon";
import CollapsableNav from "./components/Navbar/CollapsableNav";
import { Home } from "grommet-icons";

const theme = {
  notification: { container: { background: "brand" } },
  global: {
    font: {
      family: "Poppins",
      size: "14px",
      height: "20px",
    },
  },
};

export default function App() {
  return (
    <Grommet theme={theme}>
      {/* <Navbar /> */}
      <Box wrap direction="row">
        <Box
          height="100vh"
          direction="column"
          background="brand"
          align="center"
          justify="around"
        >
          <CollapsableNav flex />
        </Box>
        <Box align="center" flex background="light-2">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/wods"
              element={
                <IsPrivate>
                  {" "}
                  <WodsPage />{" "}
                </IsPrivate>
              }
            />

            {/*    ADD    */}
            <Route
              path="/signup"
              element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
              }
            />
            <Route
              path="/login"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Grommet>
  );
}
