import { useState, useEffect, useRef } from "react";
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
import { getHotelList, getRoomType } from "./utils/requests";
import { GuestCapacityFilter } from "./components/GuestCapacityFilter";

import { RoomsList } from "./components/RoomsList";
import { useSelector, useDispatch } from "react-redux";

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

type HotelList = {
	loading: boolean;
	hotelsList: Hotel[];
};

const App = () => {
	const [filterRankingVal, filterRankingValSet] = useState<number>(3);
	const [resetHotelList, resetHotelListSet] = useState(false);
	const dispatch = useDispatch();
	const { hotelsList, loading } = useSelector(
		({ hotels }: { hotels: HotelList }) => hotels
	);

	const { adultsInitial, childrenInitial } = useSelector(
		({ filters }: { filters: Record<string, number> }) => filters
	);

	const revealRefs = useRef<HTMLDivElement[]>([]);
	revealRefs.current = [];

	const addToRefs = (el: HTMLDivElement) => {
		if (el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el);
		}
	};

	useEffect(() => {
		revealRefs.current.map((el) => {
			const revealRoomsList = el.children[0]?.children[0]?.children.length;
			let parentVisibility = el.parentElement;

			if (revealRoomsList === 0) {
				parentVisibility!.style.display = "none";
				resetHotelListSet(true);
			} else {
				parentVisibility!.style.display = "flex";
				resetHotelListSet(true);
			}
		});
	}, [adultsInitial, childrenInitial, hotelsList, filterRankingVal]);

	useEffect(() => {
		getHotelList()
			.then(
				(hotelsList: Hotel[]) =>
					dispatch({ type: "SET_HOTELS_LIST", payload: hotelsList }) &&
					hotelsList
			)
			.then(
				(hotels: Hotel[]) =>
					hotels &&
					hotels.map(({ id }: { id: string }) =>
						getRoomType(id).then(({ rooms }: { rooms: Rooms[] | [] }) =>
							dispatch({
								type: "SET_ROOMS",
								payload: rooms
							})
						)
					)
			);
	}, [resetHotelList]);

	const handleSelect = (i: number) => {
		const value = i;
		value && filterRankingValSet(value);
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
			{loading && <CircularProgress />}
			<Rating value={filterRankingVal} handleSelect={handleSelect} />
			<GuestCapacityFilter />
			{hotelsList &&
				hotelsList
					.filter(
						({ starRating }: { starRating: string }) =>
							+starRating >= filterRankingVal
					)
					.map(
						(
							{
								id,
								name,
								address1,
								address2,
								images,
								starRating
							}: Pick<
								Hotel,
								| "id"
								| "name"
								| "address1"
								| "address2"
								| "images"
								| "starRating"
							>,
							i: number
						) => (
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
											{(address1 &&
												`${CardLabels.hotelAddress1}  ${address1}`) ||
												`${CardLabels.hotelAddress1}  N/A`}
											<br></br>
											{(address2 &&
												`${CardLabels.hotelAddress2}  ${address2}`) ||
												`${CardLabels.hotelAddress2}  N/A`}
										</Typography>
									</Grid>
									<Grid item xs={5}>
										<Rating value={Number(starRating)} />
									</Grid>
									<div ref={addToRefs}>
										<Grid className="rooms-list" container>
											<RoomsList index={i} />
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
