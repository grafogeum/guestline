import { Grid, CircularProgress } from "@mui/material";
import { Rooms, Occupancy, HotelList } from "../types";
import { RoomDetails } from "./RoomDetails";
import { GuestCapacity } from "../constants/constants";
import { useSelector } from "react-redux";
import { checkTypeStyleParameter } from "../utils/helper";

const RoomsListStyle = checkTypeStyleParameter({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-between",
	width: "100%"
});

export const RoomsList = ({ index }: { index: string }) => {
	const roomType = useSelector((state: any) => state.rooms.roomType);
	const filters = useSelector(
		({ filters }: { filters: Record<string, number> }) => filters
	);

	const { hotelsList } = useSelector(
		({ hotels }: { hotels: HotelList }) => hotels
	);

	const checkID = ({ id }: { id: string }) => id === index;

	const trueId = hotelsList.findIndex(checkID);

	return (
		<Grid container>
			{roomType[trueId] &&
				roomType[trueId]
					.filter(
						({
							occupancy
						}: {
							occupancy: Pick<
								Occupancy,
								GuestCapacity.maxAdults | GuestCapacity.maxChildren
							>;
						}) =>
							occupancy?.maxAdults >= filters.adultsInitial &&
							occupancy?.maxChildren >= filters.childrenInitial
					)
					.map(
						(
							{
								name,
								occupancy,
								longDescription
							}: Pick<Rooms, "name" | "occupancy" | "longDescription">,
							i: number
						) => (
							<div
								className={`checkList${trueId}`}
								style={RoomsListStyle}
								key={i}
							>
								{roomType[trueId].length < 1 && <CircularProgress />}
								<RoomDetails {...{ name, occupancy, longDescription }} />
							</div>
						)
					)}
		</Grid>
	);
};
