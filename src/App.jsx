// import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PrivateChats from './features/privateChats/PrivateChats';
import OpenChats from './features/openChats/OpenChats';
import Playdates from './features/playdates/Playdates';
import Profile from './features/profile/Profile';
import FindPlaydates from './pages/FindPlaydates';
import DogList from './features/findPlaydates/DogList';
import FullProfile from './features/findPlaydates/FullProfile';
import DevContact from './pages/DevContact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './ui/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import CustomToaster from './ui/Toaster';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        // cacheTime: 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontSize: '16px' }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<DevContact />} />

            <Route path="findplaydates" element={<FindPlaydates />}>
              <Route index element={<Navigate replace to="dogs" />} />
              <Route path="dogs" element={<DogList />} />
              <Route path="dogs/:id" element={<FullProfile />} />
            </Route>

            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="myplaydates" />} />
              <Route
                path="myplaydates"
                element={
                  <ProtectedRoute>
                    <Playdates />
                  </ProtectedRoute>
                }
              />

              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="openchats"
                element={
                  <ProtectedRoute>
                    <OpenChats />
                  </ProtectedRoute>
                }
              />

              <Route
                path="privatechats"
                element={
                  <ProtectedRoute>
                    <PrivateChats />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomToaster />
    </QueryClientProvider>
  );
};

export default App;
