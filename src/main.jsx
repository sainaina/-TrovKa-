import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { MainLayout } from './components/layout/MainLayout.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import { store } from './redux/feature/store.js';
import VerifyCode from './pages/auth/VerifyCode.jsx';
import HomeNotLogin from './pages/home-page/HomeNotLogin.jsx';
import ProviderProfile from './pages/Provider_Profile/ProviderProfile.jsx';
import { UserSetting } from './pages/dashboard-user/UserSetting.jsx';
import ServiceProviderCard from './components/provider-components/ServiceCover.jsx';
import ServiceDetailPage from './pages/Provider_Profile/ServiceDetailPage.jsx';
import ProviderDashboardOverall from './pages/Provider_Profile/ProviderDashboardOverall.jsx';
import MyServicePage from './pages/Provider_Profile/MyServicePage.jsx';
import ProviderSettingPage from './pages/Provider_Profile/ProviderSettingPage.jsx';
import ProviderReviewPage from './pages/Provider_Profile/ProviderReviewPage.jsx';
import AddServicePage from './pages/Provider_Profile/AddServicePage.jsx';
import ProviderPassword from './pages/Provider_Profile/ProviderPassword.jsx';
import UserPasswordChange from './pages/dashboard-user/UserPasswordChange.jsx';
import UserFavoritePage from './pages/dashboard-user/UserFavoritePage.jsx';
import UserReview from './pages/dashboard-user/UserReview.jsx';
import PieChartWithCustomizedLabel from './components/common/PieChartWithCustomizedLabel.jsx';
import BasicStacking from './components/common/BasicStacking.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageUser from './pages/admin/ManageUser.jsx';
import ManageProvider from './pages/admin/MangeProvider.jsx';
import ManageService from './pages/admin/ManageService.jsx';
import ManageCategory from './pages/admin/ManageCategory.jsx';
import ManageReview from './pages/admin/ManageReview.jsx';
import { ContactUsNew } from './pages/contact-us/ContactUsNew.jsx';
import AdminSetting from './pages/admin/AdminSetting.jsx';
import AdminPassword from './pages/admin/AdminPassword.jsx';
import AboutUs from './pages/aboutUs/AboutUs.jsx';
import { Categories } from './pages/category/CategoryPage.jsx';
import { Metadata } from './lib/Metadata.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { SearchFilterHorizontal } from './pages/search-filter/SearchFilterHorizontal.jsx';
import UpdateServicePage from './pages/Provider_Profile/UpdateServicePage.jsx';
import RoleBasedRoute from './components/utill/RoleBasedRoute.jsx';
import SearchFilterVertical from './pages/search-filter/SearchFilterVertical.jsx';
import { initializeUser } from './redux/feature/user/userSlice.js';
import ProviderFavorite from './pages/Provider_Profile/ProviderFavorite.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomeNotLogin />,
      },
      {
        path: '/service',
        element: <SearchFilterVertical />,
      },
      {
        path: '/service-filter',
        element: <SearchFilterHorizontal />,
      },
      {
        path: '/service-detail/:id',
        element: <ServiceDetailPage />,
      },
      {
        path: '/service-cover',
        element: <ServiceProviderCard />,
      },
      {
        path: '/provider-profile/:providerId',
        element: <ProviderProfile />,
      },
      {
        path: '/category',
        element: <Categories />,
      },
      {
        path: '/contact-us',
        element: <ContactUsNew />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/dashboard-provider',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <ProviderDashboardOverall />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/provider-setting',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <ProviderSettingPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/provider-review',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <ProviderReviewPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/provider-favorite',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <ProviderFavorite />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/provider-password',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <ProviderPassword />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/my-service',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <MyServicePage />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/add-service',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <AddServicePage />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/service/update/:serviceId',
        element: (
          <RoleBasedRoute roles={['provider']}>
            <UpdateServicePage />
          </RoleBasedRoute>
        ),
      },
      
      {
        path: '/user-review',
        element: (
          <RoleBasedRoute roles={['user']}>
            <UserReview />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/user-setting',
        element: (
          <RoleBasedRoute roles={['user']}>
            <UserSetting />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/user-password',
        element: (
          <RoleBasedRoute roles={['user']}>
            <UserPasswordChange />
          </RoleBasedRoute>
        ),
      },
      {
        path: '/user-favorite',
        element: (
          <RoleBasedRoute roles={['user']}>
            <UserFavoritePage />
          </RoleBasedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verify-code',
    element: <VerifyCode />,
  },
  {
    path: '/pie-chart',
    element: <PieChartWithCustomizedLabel />,
  },
  {
    path: '/basic-stacking',
    element: <BasicStacking />,
  },
  {
    path: '/admin',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <AdminDashboard />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/manage-user',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <ManageUser />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/manage-provider',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <ManageProvider />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/manage-service',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <ManageService />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/manage-category',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <ManageCategory />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/manage-review',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <ManageReview />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/admin-setting',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <AdminSetting />
      </RoleBasedRoute>
    ),
  },
  {
    path: '/admin-password',
    element: (
      <RoleBasedRoute roles={['admin']}>
        <AdminPassword />
      </RoleBasedRoute>
    ),
  },
]);

function MainApp() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(initializeUser());
  }, [dispatch]); 

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider context={Metadata}>
        <MainApp />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
