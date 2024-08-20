import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../Navbar/NavbarComponent';
import { FooterComponent } from '../Footer/FooterComponent';
import { Metadata } from '../../lib/Metadata';
import { selectUsers, initializeUser, selectStatus } from '../../redux/feature/user/userSlice';
import { NavbarNotLoginComponent } from '../Navbar/NavbarNotLoginComponent';

export const MainLayout = () => {
  const loginStatus = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize user on component mount
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <>
      <div>
        <Metadata
          title="Service | TrovKa"
          description="Welcome to Service-TrovKa"
          author="SainaIna"
          keywords="services, trovka, home"
          thumbnail="/assets/logo/Trovka-icon.png"
        />
      </div>
      <header>
        {loginStatus === 'success' ? <NavbarComponent /> : <NavbarNotLoginComponent />}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterComponent />
      </footer>
    </>
  );
};
