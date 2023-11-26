import React, { useEffect, useState } from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import {getArduinotoken} from "../../utils"
// import { ArduinoIoTCloud } from 'arduino-iot-js';
 
const Home = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('Inglés'); 

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            console.log("User is signed in")
        } else {
            navigate("/login");
        }

        const fetchData = async () => {
            try {
                const token = "getTokenUbidots()"
                const response = await axios.get('https://industrial.api.ubidots.com/api/v1.6/devices/tu_dispositivo', {
                    headers: {
                        'X-Auth-Token': token
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error al obtener datos de Ubidots:', error);
            }
        };

        fetchData();

    }, [])


    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
   
    const renderChart = () => {
        // Aquí iría la lógica para renderizar tu gráfico
        return <div className="bg-white p-4 rounded-lg shadow">Gráfico aquí</div>;
    };

    return (
        <>
            <nav className="bg-blue-500 p-4 text-white">
                <div className="container mx-auto flex justify-between">
                    <p className=' font-bold'>
                        LINGUAVIEW
                    </p>
 
                    <div>
            			<button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Logout
                        </button>
            		</div>
                </div>
            </nav>

            <main className="py-8">
     
                <div className="container mx-auto">
                    <div className=" ">
                            
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M5.5 7l5 5 5-5z" />
                            </svg>
                        </div>
                    </div>
                    {/* Espacio para gráficos */}
                    {renderChart()}
                </div>
            </main>
            <div className="container mx-auto flex items-center justify-center space-x-4">
                <p className="text-center">Seleccionar idioma:</p>
                <select 
                    className=" appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option>English</option>
                </select>
            </div>
        </>
    );
}
 
export default Home;