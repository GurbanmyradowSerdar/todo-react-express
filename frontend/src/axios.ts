import axios from "axios";

const Myaxios = axios.create({ baseURL: "http://localhost:8888" });

export default Myaxios;
