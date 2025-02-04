export type StationDto = {
	id: number;
	name: string;
	location: string;
	status: string;
};

export type PaginatedDto<T> = {
	data: T[];
	first: number;
	items: number;
	last: number;
	next: number | null;
	pages: number;
	prev: number | null;
};
