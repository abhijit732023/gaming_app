import AdminLoginRoute from "./routes/Admin_route/admin_login_route.js";
import AdminRegisterModel from "./models/Admin/createadmin.js";
import RegisterRouter from "./routes/User_route/register_route.js";
import LoginRouter from "./routes/User_route/login_route.js";
import Admincreate from "./routes/Admin_route/admin_regiroute.js";
import config from './config/config.js';
import CreateRoom from "./routes/Admin_route/create_room_route.js";
import RoomModel from "./models/Admin/createtournament.js";
import LogoutRouter from "./routes/User_route/logout_route.js";
import Main_tournament from "./routes/Tournament_route/main_tournament.js";
import Auth_Middleware from "./middleware/auth_middleware.js";


export {
    AdminLoginRoute,
    RegisterRouter,
    LoginRouter,
    Admincreate,
    config,
    AdminRegisterModel,
    RoomModel,
    CreateRoom,
    LogoutRouter,
    Main_tournament,
    Auth_Middleware


}