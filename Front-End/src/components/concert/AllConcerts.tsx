import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { DEV_BACKEND_URL } from "../../constants";
import { Concert } from "../../models/Concert";
import { Location } from "../../models/Location"
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllConcerts = () => {

	const [loading, setLoading] = useState(false);
	const [concerts, setConcerts] = useState<Concert[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		setLoading(true);
		fetch(`http://127.0.0.1:4000/concert/getAllConcerts`)
			.then((response) => response.json())
			.then((data) => {
				setConcerts(data);
				setLoading(false);
			});
	}, []);
	/*
	useEffect(() => {
		setLoading(true)
		const getData = async () => {
			try {
				const response = await fetch(`http://127.0.0.1:4000/concert/getAllConcerts`);
				const data = await response.json();
				setConcerts(data);
				setLoading(false)
			} catch(error: any){
				setError(error.message);
				setLoading(false)
			}
		}
		getData();
	}, [])


	if (error) {
		return (
			<>
				<h1>Error while fetching :(</h1>
				<p>Error message: {error}</p>
			</>
		)
	}
	*/

	return (
		<Container>
			<h1>All concerts</h1>

			{loading && <CircularProgress />}
			{!loading && concerts.length === 0 && <p>No concerts found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/concert/addConcert`}>
					<Tooltip title="Add a new concert" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && concerts.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 850 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="center">Name</TableCell>
								<TableCell align="center">Location</TableCell>
								<TableCell align="center">Date</TableCell>
								<TableCell align="center">Ticket price</TableCell>
								<TableCell align="center">Organizer</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{concerts.map((concert, index) => (
								<TableRow key={concert._id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/courses/${concert._id}/details`} title="View course details">
											{concert.name}
										</Link>
									</TableCell>
									<TableCell align="center">{concert.location}</TableCell>
									<TableCell align="center">{""+concert.startTime.substring(0,10)}</TableCell>
									<TableCell align="center">{concert.ticketPrice}</TableCell>
									<TableCell align="center">{concert.organizer}</TableCell>
									<TableCell align="center">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/courses/${concert._id}/details`}>
											<Tooltip title="View course details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/concert/updateConcert/${concert._id}`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/concert/deleteConcert/${concert._id}`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};
