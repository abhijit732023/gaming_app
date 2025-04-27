const ENV_File = {
    backendURL: String(import.meta.env.VITE_BACKEND_URL),
    razor_secret_key: String(import.meta.env.VITE_KEY_SECRET),
    razor_key_id: String(import.meta.env.VITE_KEY_ID),
};
console.log(ENV_File); // Debugging: Check if variables are loaded
export default ENV_File;