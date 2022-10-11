import React from "react";
import { Hotel, Rooms } from "../types";

interface ContextState {
	valueMaxAdults: number;
	valueMaxChildren: number;
	handleIncrease: (guestCapacityType: string) => void;
	handleDecrease: (guestCapacityType: string) => void;
}

const HotelContext = React.createContext({} as ContextState);

export default HotelContext;
