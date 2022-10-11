import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { Hotel, Rooms, HotelsAvailabilityInitial } from "./types";
interface InitialState {
	loading: boolean;
	hotelsList?: Hotel[] | [];
	roomType?: Rooms[] | [];
	error: boolean;
}

const initialState: InitialState = {
	loading: false,
	error: false,
	hotelsList: []
};

const hotelsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case "GET_HOTELS_LIST":
			return {
				loading: true
			};
		case "SET_HOTELS_LIST":
			return {
				loading: false,
				hotelsList: action.payload
			};
		default:
			return state;
	}
};

const hotelsAvailabilityInitial: HotelsAvailabilityInitial = {
	availability: []
};

const hotelsAvailabilityReducer = (
	state = hotelsAvailabilityInitial,
	action: any
) => {
	switch (action.type) {
		case "FILTER_ROOMS":
			return {
				availability: [...state.availability, action.payload]
			};

		default:
			return state;
	}
};

const initialStateRooms: InitialState = {
	loading: false,
	error: false,
	roomType: []
};

const roomsReducer = (state = initialStateRooms, action: any) => {
	switch (action.type) {
		case "GET_ROOMS_LIST":
			return {
				loading: true
			};
		case "SET_ROOMS":
			return {
				...state,
				roomType: [...state.roomType!, action.payload]
			};
		default:
			return state;
	}
};

const initialStateFilter: Record<string, number> = {
	adultsInitial: 2,
	childrenInitial: 1,
	minAdults: 0,
	maxAdults: 5,
	minChildren: 0,
	maxChildren: 4
};

const filterReducer = (state = initialStateFilter, action: any) => {
	switch (action.type) {
		case "INCREASE_ADULTS_CAPACITY":
			return {
				...state,
				adultsInitial: action.payload
			};
		case "DECREASE_ADULTS_CAPACITY":
			return {
				...state,
				adultsInitial: action.payload
			};
		case "INCREASE_CHILD_CAPACITY":
			return {
				...state,
				childrenInitial: action.payload
			};
		case "DECREASE_CHILD_CAPACITY":
			return {
				...state,
				childrenInitial: action.payload
			};

		default:
			return state;
	}
};

const rootReducer = combineReducers({
	hotels: hotelsReducer,
	rooms: roomsReducer,
	filters: filterReducer
	// hotelsAvailability: hotelsAvailabilityReducer
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
