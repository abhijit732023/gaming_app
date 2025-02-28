import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserLogin,UserRegister,AdminLogin,RoomForm,Slot_page,Tournament_page,User_profile, Logout } from './FilesPaths/allpath.js';
import { AuthProvider } from '../ContextApi/contextapi.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <UserRegister/>,
  },
  {
    path: '/login',
    element: <UserLogin />,
  },{
    path:'/register',
    element:<UserRegister/>
  },
  
  {
  path:'/admin/login',
  element:<AdminLogin/>
},
{
  path:'/admin/create/tournament',
  element:<RoomForm/>
},
{
  path:'/profile',
  element:<User_profile/>
},
{
  path:'/tournament',
  element:<Tournament_page/>,
  
},
{
  path:'/tournament/slots',
  element:<Slot_page/>,
},
{
path:'/logout',
element:<Logout/>
}
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </AuthProvider>,
);
