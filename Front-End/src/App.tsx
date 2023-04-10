import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllConcerts } from "./components/concert/AllConcerts";
import { ConcertDetails } from "./components/concert/ConcertDetails";
import { ConcertDelete } from "./components/concert/ConcertDelete";
import { ConcertAdd } from "./components/concert/ConcertAdd";

function App() {
	return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/concert/getAllConcerts" element={<AllConcerts />} />
					<Route path="/courses/:courseId/details" element={<ConcertDetails />} />
					<Route path="/courses/:courseId/edit" element={<ConcertDetails />} />
					<Route path="/courses/:courseId/delete" element={<ConcertDelete />} />
					<Route path="/courses/add" element={<ConcertAdd />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App;
