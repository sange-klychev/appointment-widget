import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {api} from './api';
import {useState} from 'react';

export const useWidget = () => {
	const [page, setPage] = useState(1);

	const {
		data: stations,
		isError,
		isLoading,
		isPlaceholderData
	} = useQuery({
		queryKey: ['stations', {page}],
		queryFn: (context) => api.getStations({page}, context),
		placeholderData: keepPreviousData
	});

	return {
		stations,
		isError,
		isLoading,
		isPlaceholderData,
		page,
		setPage
	};
};
