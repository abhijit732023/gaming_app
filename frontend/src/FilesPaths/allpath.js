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
import Input from "../components/input_component";
import Container from "../components/conatiner";
import AuthGuard from "../components/auth_guard";
import PayNow from "../Pages/UsersPages/slot_payment";
import AdminTournamentPanel from "../Pages/AdminPages/admin_all_control";
import EditTournament from "../Pages/AdminPages/edit_tournament";
import ShowTeams from "../Pages/AdminPages/show_team_admin";
import UnpaidTeams from "../Pages/AdminPages/admin_unpaid_teams";
import PaidTeams from "../Pages/AdminPages/admin_paid_team";
import Home from "../Pages/UsersPages/home";
import Loading from "../components/loading";
import TournamentDetail from "../Pages/TournamentsPages/tournament_detail";
import Header from "../components/header";
import MobileMenu from "../components/mobile_menu";
import Mytournament from "../Pages/UsersPages/mytournament";
import Email_sendPage from "../Pages/AdminPages/email_send";
import ENV_File from "../../config/config";
import RGBLight from "../components/register_success"; 
import FeedbackForm from "../Pages/UsersPages/feedback";
import Terms from "../Pages/UsersPages/terms";
import Privacy from "../Pages/UsersPages/privacy";
import Refund from "../Pages/UsersPages/refunded";
import Contact from "../Pages/UsersPages/contact"; 
import Support from "../Pages/UsersPages/support";

 export {
    EditTournament,
    AdminTournamentPanel,
    PayNow,
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
    useAuth,
    Input,
    Container,
    AuthGuard,
    ShowTeams,
    UnpaidTeams,
    PaidTeams,
    Home,
    Loading,
    TournamentDetail,
    Header,
    MobileMenu,
    Mytournament,
    Email_sendPage,
    ENV_File,
    RGBLight,
    FeedbackForm,
    Terms,
    Privacy,
    Refund,
    Contact,
    Support

}

