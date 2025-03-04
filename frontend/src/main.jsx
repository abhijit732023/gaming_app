import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {AuthGuard, UserLogin, UserRegister, AdminLogin, RoomForm, Slot_page, Tournament_page, User_profile, Logout, TournamentDetail } from './FilesPaths/allpath.js';
import { AuthProvider } from '../ContextApi/contextapi.jsx';
import './index.css'; // Import Tailwind CSS

const router = createBrowserRouter([
  {
    path: '/',
    element: (<AuthGuard>
      <Tournament_page />
    </AuthGuard>),
  },
  {
    path: '/login',
    element: <UserLogin />,
  },
  {
    path: '/register',
    element: <UserRegister />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin/create/tournament',
    element: (
      <AuthGuard> {/* Protect this route */}
        <RoomForm />
      </AuthGuard>
    )
  },
  {
    path: '/profile',
    element: (
      <AuthGuard> {/* Protect user profile */}
        <User_profile />
      </AuthGuard>
    )
  },
  {
    path: '/tournament',
    element: (<AuthGuard>
      <Tournament_page />
    </AuthGuard>),
  },
  {
    path: '/tournament/:id/slot/:index',
    element: (
      <AuthGuard> {/* Protect slots page */}
        <Slot_page />
      </AuthGuard>
    )
  },
  {
    path: '/tournament/:id',
    element: (
      <AuthGuard> {/* Protect tournament details page */}
        <TournamentDetail />
      </AuthGuard>
    )
  },
  {
    path: '/logout',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        <Logout />
      </AuthGuard>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>,
);
