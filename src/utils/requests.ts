import { Paths } from "../utils/routing";

export const getHotelList = async () => {
	try {
		const response = await fetch(Paths.HOTEL_LIST);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(`Data could not be fetched ${error}`);
	}
};

export const getRoomType = async (hotelID: string) => {
	try {
		const response = await fetch(Paths.ROOM_TYPES(hotelID));
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(`Data could not be fetched ${error}`);
	}
};
