import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './ui/AppLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import Dashboard from './pages/Dashboard';
import Messages from './features/messages/Messages';
import Groups from './features/groups/Groups';
import UserDogProfile from './features/profile/UserDogProfile';
import Followers from './features/playdates/Followers';
import Following from './features/playdates/Following';
import FindPlaydates from './pages/FindPlaydates';
import DogList from './features/findPlaydates/DogList';
import FullProfile from './features/findPlaydates/FullProfile';
import Setting from './pages/Setting';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
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
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contactus" element={<ContactUs />} />

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
              <Route index element={<Navigate replace to="messages" />} />
              <Route
                path="messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />
              <Route
                path="groups"
                element={
                  <ProtectedRoute>
                    <Groups />
                  </ProtectedRoute>
                }
              />
              <Route
                path="followers"
                element={
                  <ProtectedRoute>
                    <Followers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="following"
                element={
                  <ProtectedRoute>
                    <Following />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <UserDogProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="setting"
                element={
                  <ProtectedRoute>
                    <Setting />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomToaster />
    </QueryClientProvider>
  );
};

export default App;
