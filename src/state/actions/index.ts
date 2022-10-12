import { ActionsHotelType } from "../action-types";
import { Hotel } from "../../types";
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

export type HotelsActions = GetHotelsList | SetHotelsList | SetHotelsError;
