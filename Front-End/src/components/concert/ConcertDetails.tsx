import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Concert } from "../../models/Concert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ConcertDetails = () => {
	const { concertId} = useParams();
	const [concert, setConcert] = useState<Concert>();

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/concert/getConcertByID/${concertId}`);
			const concert = await response.json();
			setConcert(concert);
		};
		fetchCourse();
	}, [concertId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Course Details</h1>
					<p>Course Name: {concert?.name}</p>
					<p>Course Description: {concert?.description}</p>
					<p>Course Teacher Name: {concert?.teacher?.name}</p>
					<p>Course students:</p>
					<ul>
						{concert?.artists?.map((artist) => (
							<li key={artist.id}>{astist.name}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${courseId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${courseId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
