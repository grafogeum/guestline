import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GuestTypes } from "../constants/constants";

const GuestCapacityFilterStyles = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
};

export const GuestCapacityFilter = () => {
	const { adultsInitial, childrenInitial, maxAdults, maxChildren } =
		useSelector(({ filters }: { filters: Record<string, number> }) => filters);

	const dispatch = useDispatch();
	return (
		<div style={GuestCapacityFilterStyles}>
			<Typography variant="h6">{GuestTypes.Adults}</Typography>
			{
				<button
					onClick={() =>
						dispatch({
							type: "INCREASE_ADULTS_CAPACITY",
							payload:
								adultsInitial <= maxAdults ? adultsInitial + 1 : adultsInitial
						})
					}
				>
					<AddIcon />
				</button>
			}
			<Typography variant="h6" color={"primary"}>
				{adultsInitial}
			</Typography>
			{
				<button
					onClick={() =>
						dispatch({
							type: "DECREASE_ADULTS_CAPACITY",
							payload: adultsInitial >= 1 ? adultsInitial - 1 : 0
						})
					}
				>
					<RemoveIcon />
				</button>
			}
			<Typography variant="h6">{GuestTypes.Children}</Typography>
			{
				<button
					onClick={() =>
						dispatch({
							type: "INCREASE_CHILD_CAPACITY",
							payload:
								childrenInitial <= maxChildren
									? childrenInitial + 1
									: childrenInitial
						})
					}
				>
					<AddIcon />
				</button>
			}
			<Typography variant="h6" color={"primary"}>
				{childrenInitial}
			</Typography>
			{
				<button
					onClick={() =>
						dispatch({
							type: "DECREASE_CHILD_CAPACITY",
							payload: childrenInitial >= 1 ? childrenInitial - 1 : 0
						})
					}
				>
					<RemoveIcon />
				</button>
			}
		</div>
	);
};
