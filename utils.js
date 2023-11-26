import axios from "axios";

export getUbidotsToken = axios.post("https://industrial.api.ubidots.com/api/v1.6/auth/token")