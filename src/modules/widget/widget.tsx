import {clsx} from 'clsx';
import {useCreateStation} from './use-create-station';
import {useWidget} from './use-widget';
import styles from './widget.module.scss';

interface Props {
	className?: string;
}

export function Widget({className}: Props) {
	const {isError, isLoading, isPlaceholderData, stations, setPage} = useWidget();
	const {handleCreate, isPending} = useCreateStation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	return (
		<div className={clsx('', className)}>
			<form onSubmit={handleCreate}>
				<input
					className='border'
					name='name'
				/>
				<button
					type='submit'
					className={clsx('border rounded p-3 border-teal-500 cursor-pointer', {['opacity-50']: isPending})}
					disabled={isPending}
				>
					send
				</button>
			</form>
			<div className={styles.list}>
				{stations.data.map((station) => (
					<div
						key={station.id}
						className={clsx(styles.listItem, {['opacity-50']: isPlaceholderData})}
					>
						{station.name}
					</div>
				))}
			</div>
			<div className='flex gap-3'>
				<button
					className='border rounded p-3 border-teal-500 cursor-pointer'
					onClick={() => setPage((value) => Math.max(value - 1, 1))}
				>
					prev
				</button>
				<button
					className='border rounded p-3 border-teal-500 cursor-pointer'
					onClick={() => setPage((value) => Math.min(value + 1, stations.pages))}
				>
					next
				</button>
			</div>
		</div>
	);
}
