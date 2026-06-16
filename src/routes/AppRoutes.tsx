/** Application route definitions — all pages share the AppLayout shell. */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { LayoutProvider } from '@/providers/LayoutProvider';
import { HomePage } from '@/pages/HomePage';
import { BrowsePage } from '@/pages/BrowsePage';
import { SearchPage } from '@/pages/SearchPage';
import { MovieDetailsPage } from '@/pages/MovieDetailsPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      {/* LayoutProvider sits inside BrowserRouter so it can read location. */}
      <LayoutProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="popular"
              element={
                <BrowsePage
                  listType="popular"
                  description="Trending movies audiences are watching right now."
                />
              }
            />
            <Route
              path="top-rated"
              element={
                <BrowsePage
                  listType="top_rated"
                  description="Critically acclaimed films with the highest ratings."
                />
              }
            />
            <Route
              path="upcoming"
              element={
                <BrowsePage
                  listType="upcoming"
                  description="Upcoming releases hitting theaters soon."
                />
              }
            />
            <Route path="search" element={<SearchPage />} />
            <Route path="movie/:id" element={<MovieDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </LayoutProvider>
    </BrowserRouter>
  );
}
