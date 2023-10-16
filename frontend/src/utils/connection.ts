import axios from "axios";

const BaseAxios = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

export default BaseAxios;
