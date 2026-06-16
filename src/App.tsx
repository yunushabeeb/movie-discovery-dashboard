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
