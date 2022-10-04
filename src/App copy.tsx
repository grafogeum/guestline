import "./App.css";
import hotels from "./hotels.json";
import { Hotel } from "./types";
import SwipeableTextMobileStepper from "./components/Carousel";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

type StyleParameter = {
	[key: string]: string | number;
};

const checkTypeStyleParameter = (HotelStyle: StyleParameter) => HotelStyle;

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
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary
}));

const CardLabels = {
	hotelName: "Hotel name",
	hotelAddress1: "Hotel address 1:",
	hotelAddress2: "Hotel address 2:"
};

function App() {
	return (
		<div className="App">
			<h2>Hołtels Mołtels 🏨</h2>
			{hotels &&
				hotels.map(
					({
						id,
						name,
						description,
						address1,
						address2,
						images
					}: Pick<
						Hotel,
						"id" | "name" | "description" | "address1" | "address2" | "images"
					>) => (
						<div key={id} style={HotelsListContainer}>
							<SwipeableTextMobileStepper
								images={images as [{ url: string; alt: string }]}
							/>
							<div style={HotelInfo}>
								<Typography variant="h4" component="h4" mb={2}>
									{name}
								</Typography>
								<Typography>
									{CardLabels.hotelAddress1} {address1}
								</Typography>
								<Typography>
									{CardLabels.hotelAddress2} {address2}
								</Typography>
							</div>
						</div>
					)
				)}
			<hr></hr>
			<hr></hr>
			🎉🎉🎉🎉
			<hr></hr>
			<hr></hr>
			{hotels &&
				hotels.map(
					({
						id,
						name,
						description,
						address1,
						address2,
						images
					}: Pick<
						Hotel,
						"id" | "name" | "description" | "address1" | "address2" | "images"
					>) => (
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Item> TOOP 12 kolumn</Item>
								</Grid>
								<Grid item xs={4}>
									<SwipeableTextMobileStepper
										images={images as [{ url: string; alt: string }]}
									/>
								</Grid>
								<Grid item xs={3}>
									<Item>
										<Typography variant="h4" component="h4" mb={2}>
											{CardLabels.hotelName} {name}
										</Typography>
										<Typography>
											{CardLabels.hotelAddress1} {address1}
										</Typography>
										<Typography>
											{CardLabels.hotelAddress2} {address2}
										</Typography>
									</Item>
								</Grid>
								<Grid item xs={5}>
									<Item>⭐️⭐️⭐️⭐️⭐️</Item>
								</Grid>
								<Grid item xs={12}>
									<Item>Description</Item>
								</Grid>
							</Grid>
						</Box>
					)
				)}
		</div>
	);
}

export default App;
