export const Paths = {
	HOME: "/",
	HOTEL_LIST: "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG",
	ROOM_TYPES: (hotelId: string) =>
		`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotelId} `
};
