import {useMutation, useQueryClient} from '@tanstack/react-query';
import {FormEvent} from 'react';
import {api} from './api';

export const useCreateStation = () => {
	const queryClient = useQueryClient();

	const createMutation = useMutation({
		mutationFn: api.createStation,
		async onSettled() {
			await queryClient.invalidateQueries({
				queryKey: ['stations']
			});
		}
	});

	const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const name = String(formData.get('name') ?? '');

		createMutation.mutate({name, id: 61, location: 'Location61', status: 'Active'});

		event.currentTarget.reset();
	};

	return {handleCreate, isPending: createMutation.isPending};
};
