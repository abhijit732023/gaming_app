import dotenv from 'dotenv';
dotenv.config();
const config = {
    backendURL: process.env.VITE_BACKEND_URL,
    mongoURL: process.env.VITE_MONGO_URL,
    screteCode: process.env.VITE_SECRET_CODE,
    port: process.env.VITE_PORT,
    payment_key_id: process.env.VITE_KEY_ID,
    payment_key_secret: process.env.VITE_KEY_SECRET,
    payment_webhook:process.env.VITE_WEBHOOK_SECRET
};
export default config;