import dotenv from 'dotenv';
dotenv.config();
const config = {
    mongoURL: process.env.VITE_MONGO_URL,
    screteCode: process.env.VITE_SECRET_CODE,
    backendURl: process.env.VITE_BACKEND_URL,
};
export default config;