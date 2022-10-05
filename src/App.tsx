import { useState, useEffect } from "react";
import "./App.css";
import { Hotel, Rooms } from "./types";
import SwipeableTextMobileStepper from "./components/Carousel";
import {
	Grid,
	Paper,
	Box,
	styled,
	Typography,
	CircularProgress
} from "@mui/material";
import { ThumbSection, CardLabels } from "./constants/constants";
import { Rating } from "./components/Rating";
import { RoomDetails } from "./components/RoomDetails";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getHotelList, getRoomType } from "./utils/requests";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: "#fff",
	padding: theme.spacing(1),
	textAlign: "left",
	color: theme.palette.text.secondary
}));

const HotelInstance = {
	width: "100%",
	height: "100%",
	border: "2px solid black",
	display: "flex",
	flexWrap: "wrap"
};

const peopleCapacity = {
	adultsInitial: 2,
	minAdults: 0,
	maxAdults: 5,
	minChildren: 0,
	maxChildren: 3
};

const App = () => {
	const [hotelsList, setHotelsList] = useState<Hotel[]>([]);
	const [roomType, setRoomType] = useState<Array<Rooms>>([]);
	const [filterRankingVal, filterRankingValSet] = useState<number>(3);
	const [filterMaxAdults, filterMaxAdultsSet] = useState<number>(
		peopleCapacity.adultsInitial
	);
	const [filterMaxChildren, filterMaxChildrenSet] = useState<number>(
		peopleCapacity.minChildren
	);

	useEffect(() => {
		getHotelList().then((hotelsList: Hotel[]) => setHotelsList(hotelsList));
		return () => {};
	}, []);

	useEffect(() => {
		hotelsList.map(({ id }) => {
			getRoomType(id).then(({ rooms }: { rooms: Rooms[] }) => {
				setRoomType((prev) => [...prev, ...rooms]);
			});
			return null;
		});
	}, [hotelsList]);

	const handleSelect = (i: number) => {
		const value = i;
		value && filterRankingValSet(value);
	};
	const handleIncrease = (filterType: string) => {
		filterType === "maxAdults"
			? filterMaxAdults >= peopleCapacity.minAdults &&
			  filterMaxAdults <= peopleCapacity.maxAdults &&
			  filterMaxAdultsSet(filterMaxAdults + 1)
			: filterMaxChildren >= peopleCapacity.minChildren &&
			  filterMaxChildren <= peopleCapacity.maxChildren &&
			  filterMaxChildrenSet(filterMaxChildren + 1);
	};

	const handleDecrease = (filterType: string) => {
		filterType === "maxAdults"
			? filterMaxAdults >= 1 && filterMaxAdultsSet(filterMaxAdults - 1)
			: filterMaxChildren >= 1 && filterMaxChildrenSet(filterMaxChildren - 1);
	};

	return (
		<div className="App">
			<Grid pb={10} container>
				<Grid item justifyContent="center" alignItems="center" xs={12}>
					<Item>
						<Typography variant="h2" component="h2" align="center">
							{ThumbSection.hotelTitle}
						</Typography>
					</Item>
				</Grid>
			</Grid>
			{hotelsList.length < 1 && <CircularProgress />}
			<Rating value={filterRankingVal} handleSelect={handleSelect} />

			<Typography> Adults </Typography>
			<button onClick={() => handleIncrease("maxAdults")}>
				<AddIcon />
			</button>
			<Typography
				variant="h6"
				component="h6"
				color="secondary"
				textAlign={"center"}
			>
				{filterMaxAdults}
			</Typography>
			<button onClick={() => handleDecrease("maxAdults")}>
				<RemoveIcon />
			</button>
			<Typography> Children </Typography>
			<button onClick={() => handleIncrease("maxChildren")}>
				<AddIcon />
			</button>
			<Typography
				variant="h6"
				component="h6"
				color="secondary"
				textAlign={"center"}
			>
				{filterMaxChildren}
			</Typography>
			<button onClick={() => handleDecrease("maxChildren")}>
				<RemoveIcon />
			</button>
			{hotelsList &&
				hotelsList
					.filter(({ starRating }) => +starRating >= filterRankingVal)
					.map(
						({
							id,
							name,
							address1,
							address2,
							images,
							starRating
						}: Pick<
							Hotel,
							"id" | "name" | "address1" | "address2" | "images" | "starRating"
						>) => (
							<Box
								justifyContent="center"
								alignItems="center"
								sx={{ flexGrow: 1, display: "flex" }}
								key={id}
							>
								<Grid
									container
									spacing={1}
									justifyContent="space-between"
									xs={10}
									my={2}
									sx={HotelInstance}
								>
									<Grid item xs={4}>
										<div style={{ padding: "1rem" }}>
											<SwipeableTextMobileStepper images={images || []} />
										</div>
									</Grid>
									<Grid item xs={3}>
										<Typography variant="h6" component="h6" mb={1}>
											{name}
										</Typography>
										<Typography>
											{CardLabels.hotelAddress1} {address1}
										</Typography>
										<Typography>
											{CardLabels.hotelAddress2} {address2}
										</Typography>
									</Grid>
									<Grid item xs={5}>
										<Rating value={Number(starRating)} />
									</Grid>
									<Grid container>
										{roomType &&
											roomType
												.filter(
													({ occupancy }) =>
														occupancy.maxAdults >= filterMaxAdults
												)
												.filter(
													({ occupancy }) =>
														occupancy.maxChildren >= filterMaxChildren
												)
												.map(
													(
														{ name, occupancy, longDescription }: Rooms,
														i: number
													) => (
														<>
															{roomType.length < 1 && <CircularProgress />}
															<RoomDetails
																{...{ name, occupancy, longDescription }}
																key={i}
															/>
														</>
													)
												)}
									</Grid>
								</Grid>
							</Box>
						)
					)}
		</div>
	);
};

export default App;
