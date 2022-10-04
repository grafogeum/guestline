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

const App = () => {
	const [hotelsList, setHotelsList] = useState<Hotel[]>([]);
	useEffect(() => {
		getHotelList().then((hotelsList: Hotel[]) => setHotelsList(hotelsList));
		return () => {};
	}, []);

	const [roomType, setRoomType] = useState<Array<Rooms>>([]);
	useEffect(() => {
		hotelsList.map(({ id }) => {
			getRoomType(id).then(({ rooms }: { rooms: Rooms }) => {
				setRoomType(rooms as unknown as Array<Rooms>);
			});
			return null;
		});
	}, [hotelsList]);

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
										roomType.map(
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
