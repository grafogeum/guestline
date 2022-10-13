import {
	ActionsHotelType,
	GuestCapacity,
	ActionRoomsType
} from "../action-types";
import { Hotel, Rooms } from "../../types";
type GetHotelsList = {
	type: ActionsHotelType.SEARCH_HOTELS_LIST;
};

type SetHotelsList = {
	type: ActionsHotelType.SEARCH_HOTELS_LIST_SUCCESS;
	payload: Hotel[];
};

type SetHotelsError = {
	type: ActionsHotelType.SEARCH_HOTELS_LIST_ERROR;
	payload: string;
};

type IncreaseAdultsCapacity = {
	type: GuestCapacity.INCREASE_ADULTS_CAPACITY;
	payload: number;
};

type DecreaseAdultsCapacity = {
	type: GuestCapacity.DECREASE_ADULTS_CAPACITY;
	payload: number;
};

type IncreaseChildrenCapacity = {
	type: GuestCapacity.INCREASE_CHILDREN_CAPACITY;
	payload: number;
};

type DecreaseChildrenCapacity = {
	type: GuestCapacity.DECREASE_CHILDREN_CAPACITY;
	payload: number;
};

type GetRoomsList = {
	type: ActionRoomsType.GET_ROOMS_LIST;
	payload: [];
};

type SetRoomsList = {
	type: ActionRoomsType.GET_ROOMS_LIST_SUCCESS;
	payload: Rooms[];
};

type SetRoomsError = {
	type: ActionRoomsType.GET_ROOMS_LIST_ERROR;
	payload: string;
};

export type RoomsActions = GetRoomsList | SetRoomsList | SetRoomsError;

export type CapacityActions =
	| IncreaseAdultsCapacity
	| DecreaseAdultsCapacity
	| IncreaseChildrenCapacity
	| DecreaseChildrenCapacity;

export type HotelsActions = GetHotelsList | SetHotelsList | SetHotelsError;
