import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { GuestTypes } from "../constants/constants";
import { GuestCapacity } from "../state/action-types";
import { Button } from "./Button";

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
				<Button
					onClick={() =>
						dispatch({
							type: GuestCapacity.INCREASE_ADULTS_CAPACITY,
							payload:
								adultsInitial <= maxAdults ? adultsInitial + 1 : adultsInitial
						})
					}
				>
					<AddIcon />
				</Button>
			}
			<Typography variant="h6" color={"primary"}>
				{adultsInitial}
			</Typography>
			{
				<Button
					onClick={() =>
						dispatch({
							type: GuestCapacity.DECREASE_ADULTS_CAPACITY,
							payload: adultsInitial >= 1 ? adultsInitial - 1 : 0
						})
					}
				>
					<RemoveIcon />
				</Button>
			}
			<Typography variant="h6">{GuestTypes.Children}</Typography>
			{
				<Button
					onClick={() =>
						dispatch({
							type: GuestCapacity.INCREASE_CHILDREN_CAPACITY,
							payload:
								childrenInitial <= maxChildren
									? childrenInitial + 1
									: childrenInitial
						})
					}
				>
					<AddIcon />
				</Button>
			}
			<Typography variant="h6" color={"primary"}>
				{childrenInitial}
			</Typography>
			{
				<Button
					onClick={() =>
						dispatch({
							type: GuestCapacity.DECREASE_CHILDREN_CAPACITY,
							payload: childrenInitial >= 1 ? childrenInitial - 1 : 0
						})
					}
				>
					<RemoveIcon />
				</Button>
			}
		</div>
	);
};
