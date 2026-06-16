/**
 * Root component — providers wrap the router tree.
 * QueryProvider must wrap anything using TanStack Query hooks.
 */
import { AppRoutes } from '@/routes/AppRoutes';
import { QueryProvider } from '@/providers/QueryProvider';
import { FavoritesProvider } from '@/providers/FavoritesProvider';

function App() {
  return (
    <QueryProvider>
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </QueryProvider>
  );
}

export default App;
