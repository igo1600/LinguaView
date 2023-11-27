import axios from "axios";

export const getUbidotsToken = async () => {
	return axios.post("https://industrial.api.ubidots.com/api/v1.6/auth/token")
}
	
