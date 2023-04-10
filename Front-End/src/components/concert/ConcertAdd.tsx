import {
	Autocomplete,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Concert } from "../../models/Concert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Location } from "../../models/Location";
import { debounce } from "lodash";

export const ConcertAdd = () => {
	const navigate = useNavigate();

	const [concert, setConcert] = useState<Concert>({
		name: "",
		location_id: 1,
		ticketPrice: 1,
		organizer: ""
	});

	const [location, setLocation] = useState<Location[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Location[]>(
				`${BACKEND_API_URL}/location/autocomplete?query=${query}`
			);
			const data = await response.data;
			setLocation(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

	const addConcert = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/concert/addConcert`, concert);
			navigate("/concert/AddConcert");
		} catch (error) {
			console.log(error);
		}
	};

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

	return (
		<Container>
			<h1>Add Concert</h1>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/concert/getAllConcerts`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addConcert}>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setConcert({ ...concert, name: event.target.value })}
						/>
						<TextField
							id="description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setConcert({ ...concert, description: event.target.value })}
						/>

						<Autocomplete
							id="teacher_id"
							options={location}
							getOptionLabel={(option) => `${option.name} - ${option.email}`}
							renderInput={(params) => <TextField {...params} label="Teacher" variant="outlined" />}
							filterOptions={(x) => x}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setConcert({ ...concert, location_id: value.id });
								}
							}}
						/>

						<Button type="submit">Add Concert</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
};
