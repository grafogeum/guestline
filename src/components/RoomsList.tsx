import { Grid, CircularProgress } from "@mui/material";
import { Rooms, Occupancy } from "../types";
import { RoomDetails } from "./RoomDetails";
import { GuestCapacity } from "../constants/constants";
import { useSelector } from "react-redux";
import { Hotel, HotelsAvailabilityInitial } from "../types.d";
import { checkTypeStyleParameter } from "../utils/helper";

const RoomsListStyle = checkTypeStyleParameter({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "space-between",
	width: "100%"
});

export const RoomsList = ({ index }: { index: number }) => {
	const roomType = useSelector((state: any) => state.rooms.roomType);
	const filters = useSelector(
		({ filters }: { filters: Record<string, number> }) => filters
	);

	return (
		<Grid container>
			{roomType[index] &&
				roomType[index]
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
								className={`checkList${index}`}
								style={RoomsListStyle}
								key={i}
							>
								{roomType[index].length < 1 && <CircularProgress />}
								<RoomDetails {...{ name, occupancy, longDescription }} />
							</div>
						)
					)}
		</Grid>
	);
};
