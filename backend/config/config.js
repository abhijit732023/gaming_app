import dotenv from 'dotenv';
dotenv.config();
const config = {
    backendURL: process.env.VITE_BACKEND_URL,
    mongoURL: process.env.VITE_MONGO_URL,
    screteCode: process.env.VITE_SECRET_CODE,
    port: process.env.VITE_PORT
};
export default config;