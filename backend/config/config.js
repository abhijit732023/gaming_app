import dotenv from 'dotenv';
dotenv.config();
const config = {
    mongoURL: process.env.VITE_MONGO_URL,
    screteCode: process.env.VITE_SECRET_CODE,
    backendURl: process.env.VITE_BACKEND_URL,
    payment_key_id: process.env.VITE_KEY_ID,
    payment_key_secret: process.env.VITE_KEY_SECRET,
};
export default config;