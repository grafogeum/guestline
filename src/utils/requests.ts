import { Paths } from "../utils/routing";

export const getHotelList = async () => {
	const response = await fetch(Paths.HOTEL_LIST);
	const data = await response.json();
	return data;
};

export const getRoomType = async (hotelID: string) => {
	const response = await fetch(Paths.ROOM_TYPES(hotelID));
	const data = await response.json();
	return data;
};
