import "./App.css";
import hotels from "./hotels.json";
import { Hotel } from "./types";
import SwipeableTextMobileStepper from "./components/Carousel";

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
								<h4>{name}</h4>
								<p>
									{CardLabels.hotelAddress1} {address1}
								</p>
								<p>
									{CardLabels.hotelAddress2} {address2}
								</p>
							</div>
						</div>
					)
				)}
		</div>
	);
}

export default App;
