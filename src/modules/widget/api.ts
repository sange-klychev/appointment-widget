import {apiInstance} from '@/shared/api/api-instance';
import {PaginatedDto, StationDto} from '@/shared/api/types/widget.types';
import {QueryFunctionContext} from '@tanstack/react-query';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = Object.freeze({
	getStations: async (
		{page}: {page: number},
		{signal}: QueryFunctionContext
	): Promise<PaginatedDto<StationDto>> => {
		await wait(1000);
		return await apiInstance.get(`stations?_page=${page}&_per_page=10`, {signal}).json();
	},

	createStation: async (data: Partial<StationDto>): Promise<StationDto> => {
		await wait(1000);
		return await apiInstance.post('stations', {body: JSON.stringify(data)}).json();
	},

	saveStation: async ({id}: {id: string}): Promise<StationDto> => {
		await wait(1000);
		return await apiInstance.put(`stations/${id}`).json();
	},

	deleteStation: async ({id}: {id: string}): Promise<StationDto> => {
		await wait(1000);
		return await apiInstance.delete(`stations/${id}`).json();
	}
});
