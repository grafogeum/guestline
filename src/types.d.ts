export interface Hotel {
	id: string;
	name: string;
	description: string;
	address1: string;
	address2: string;
	postcode: string;
	town: string;
	country: string;
	countryCode: string;
	starRating: string;
	facilities: Facility[];
	telephone: string;
	email: string;
	images: Image[];
	checkInHours: string;
	checkInMinutes: string;
	checkOutHours: string;
	checkOutMinutes: string;
	position: Position;
}

export interface Position {
	latitude: number;
	longitude: number;
	timezone: string;
}

export interface Image {
	url: string;
	alt: string;
}

export type StyleParameter = {
	[key: string]: string | number;
};

interface Rooms {
	id: string;
	name: string;
	shortDescription: string;
	longDescription: string;
	occupancy: Occupancy;
	disabledAccess: boolean;
	bedConfiguration: string;
	images: Image[];
	facilities: Facility[];
}

export interface Facility {
	code: string;
	name: string;
}

interface Occupancy {
	maxAdults: number;
	maxChildren: number;
	maxOverall: number;
}

interface RatePlans {
	id: string;
	shortDescription: string;
	longDescription: string;
	prePayment: string;
	cancellationPolicy: CancellationPolicy;
}

interface CancellationPolicy {
	name: string;
	text: string;
	penalty: string;
	applicable: string;
	hour: string;
}

export type HotelList = {
	loading: boolean;
	hotelsList: Hotel[];
};
