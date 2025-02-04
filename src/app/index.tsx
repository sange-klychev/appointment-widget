import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createRoot} from 'react-dom/client';
import {queryClient} from '../shared/api/query-client';
import {App} from './app';
import './index.scss';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Root element not found');
}

const container = createRoot(root);

container.render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
