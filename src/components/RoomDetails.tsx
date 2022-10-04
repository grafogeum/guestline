import { Grid, Typography } from "@mui/material";
import { Rooms } from "../types";

export const RoomDetails = (
	{
		name,
		occupancy,
		longDescription = "Veri very nice Hotel"
	}: Pick<Rooms, "name" | "occupancy" | "longDescription">,
	key: number
) => (
	<div
		style={{
			width: "100%",
			borderTop: "2px solid black",
			display: "flex"
		}}
		key={key}
	>
		<Grid item xs={6}>
			<Typography variant="h6" component="div">
				{name}
			</Typography>
			<Typography color="text.secondary">
				{Object.keys(occupancy)[0].replace(/max/i, "")}
				{": "}
				{occupancy.maxAdults}
			</Typography>
			<Typography color="text.secondary">
				{Object.keys(occupancy)[1].replace(/max/i, "")}
				{": "}
				{occupancy.maxChildren}
			</Typography>
		</Grid>
		<Grid item xs={6}>
			{longDescription}
		</Grid>
	</div>
);