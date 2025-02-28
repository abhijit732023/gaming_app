import UserRegister from "../Pages/UsersPages/user_register";
import UserLogin from "../Pages/UsersPages/user_login";
import AdminLogin from "../Pages/AdminPages/admin_login";
import RoomForm from "../Pages/AdminPages/admin_tournament";
import AdminRegister from "../Pages/AdminPages/admin_register_page";
import Slot_page from "../Pages/TournamentsPages/slot_page";
import Tournament_page from "../Pages/TournamentsPages/tournament_page";
import User_profile from "../Pages/UsersPages/user_profile";
import Logout from "../Pages/UsersPages/logout";
import { useAuth,AuthProvider } from "../../ContextApi/contextapi";

 export {
    UserRegister,
    UserLogin,
    AdminLogin,
    RoomForm,
    AdminRegister,
    Slot_page,
    Tournament_page,
    User_profile,
    Logout,
    AuthProvider,   
    useAuth
}

