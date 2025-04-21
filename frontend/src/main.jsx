import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {TournamentDetail,Home,UnpaidTeams,PaidTeams,ShowTeams,EditTournament,AdminTournamentPanel,PayNow,AuthGuard, UserLogin, UserRegister, AdminLogin, RoomForm, Slot_page, Tournament_page, User_profile, Logout } from './FilesPaths/allpath.js';
import { AuthProvider } from '../ContextApi/contextapi.jsx';
import './index.css'; // Import Tailwind CSS

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Home/>
    ),
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
    path: '/tournament/tournament_id/:id',
    element: (
      <AuthGuard> {/* Protect tournament details page */}
        <Slot_page />
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
  },
  {
    path: '/payment/:id/:team_id/:amount',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        <PayNow />
      </AuthGuard>
    )
  },
  {
    path: '/admin/edit',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        <AdminTournamentPanel />
      </AuthGuard>
    )
  },
  {
    path: '/admin/edit/:id',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        <EditTournament />
      </AuthGuard>
    )
  },
  {
    path: '/admin/edit/teams/:id',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        <ShowTeams />
      </AuthGuard>
    )
  },
  {
    path: '/admin/edit/teams/unpaid/:id',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        < UnpaidTeams/>
      </AuthGuard>
    )
  },
  {
    path: '/admin/edit/teams/paid/:id',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        < PaidTeams/>
      </AuthGuard>
    )
  },
  {
    path: 'tournament/detail/:id',
    element: (
      <AuthGuard> {/* Ensure only logged-in users can access logout */}
        < TournamentDetail/>
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
