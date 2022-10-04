import React, { useState, useEffect } from "react";
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
import { checkTypeStyleParameter } from "./utils/helper";
import { ThumbSection, CardLabels } from "./constants/constants";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { getHotelList, getRoomType } from "./utils/requests";

const HotelInfo = checkTypeStyleParameter({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	flexWrap: "wrap"
});

const HotelsListContainer = checkTypeStyleParameter({
	width: "100%",
	margin: 0,
	position: "relative",
	display: "flex",
	flexDirection: "row",
	alignItems: "center"
});

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: "#fff",
	padding: theme.spacing(1),
	textAlign: "left",
	color: theme.palette.text.secondary
}));

const Rating = ({ value = 0 }: { value: number }) => {
	const maxRating = 5;
	const ratingStars = [
		...Array(value).fill(value),
		...Array(maxRating - value).fill(null)
	];

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ ml: 2 }}>
				{Array.from(ratingStars, (star, index) =>
					star ? <StarIcon key={index} /> : <StarBorderIcon key={index} />
				)}
			</Box>
		</Box>
	);
};

const RoomsDetails = ({ hotelsList }: { hotelsList: Hotel[] }) => {
	const [roomType, setroomType] = useState<Array<Rooms>>([]);
	useEffect(() => {
		hotelsList.map(({ id }) => {
			getRoomType(id).then(({ rooms }: { rooms: Rooms }) => {
				setroomType(rooms as unknown as Array<Rooms>);
			});
			return null;
		});
	}, [hotelsList]);

	return (
		<>
			{roomType.length < 1 && <CircularProgress />}
			{roomType &&
				roomType.map((room: Rooms, i: number) => {
					return (
						<React.Fragment key={i}>
							<div
								style={{
									width: "100%",
									borderTop: "2px solid black",
									display: "flex"
								}}
							>
								<Grid item xs={6}>
									<Typography variant="h6" component="div">
										{room.name}
									</Typography>
									<Typography color="text.secondary">
										{Object.keys(room.occupancy)[0].replace(/max/i, "")}
										{": "}
										{room.occupancy.maxAdults}
									</Typography>
									<Typography color="text.secondary">
										{Object.keys(room.occupancy)[1].replace(/max/i, "")}
										{": "}
										{room.occupancy.maxChildren}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									{room.longDescription}
								</Grid>
							</div>
						</React.Fragment>
					);
				})}
		</>
	);
};

const App = () => {
	const [hotelsList, setHotelsList] = useState<Hotel[]>([]);
	useEffect(() => {
		getHotelList().then((hotelsList: Hotel[]) => setHotelsList(hotelsList));
		return () => {};
	}, []);

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
			{hotelsList &&
				hotelsList.map(
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
							>
								<div
									style={{
										width: "100%",
										height: "100%",
										border: "2px solid black",
										display: "flex",
										flexWrap: "wrap"
									}}
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
										<RoomsDetails hotelsList={hotelsList} />
									</Grid>
								</div>
							</Grid>
						</Box>
					)
				)}
		</div>
	);
};

export default App;
