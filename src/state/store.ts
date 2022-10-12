import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { HotelsActions } from "./actions";
import { ActionsHotelType } from "./action-types";

import { Hotel, Rooms } from "../types";
interface InitialState {
	loading: boolean;
	hotelsList?: Hotel[] | [];
	roomType?: Rooms[] | [];
	error: string | null;
}

const initialState: InitialState = {
	loading: false,
	error: null,
	hotelsList: []
};

const hotelsReducer = (state = initialState, action: HotelsActions) => {
	switch (action.type) {
		case ActionsHotelType.SEARCH_HOTELS_LIST:
			return {
				loading: true,
				error: null,
				hotelsList: []
			};
		case ActionsHotelType.SEARCH_HOTELS_LIST_SUCCESS:
			return {
				loading: false,
				error: null,
				hotelsList: action.payload
			};
		case ActionsHotelType.SEARCH_HOTELS_LIST_ERROR:
			return {
				loading: false,
				error: action.payload,
				hotelsList: []
			};
		default:
			return state;
	}
};

const initialStateRooms: InitialState = {
	loading: false,
	error: null,
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
