const PROD_BACKEND_API_URL = "https://concerto2.onrender.com";
const DEV_BACKEND_API_URL = "http://127.0.0.1:4000";
export const DEV_BACKEND_URL = "http://127.0.0.1:4000";

export const BACKEND_API_URL =
	process.env.NODE_ENV === "development" ? DEV_BACKEND_API_URL : PROD_BACKEND_API_URL;
