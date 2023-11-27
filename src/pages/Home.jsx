import React, { useEffect, useState } from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
// import {getUbidotsToken} from "../../utils"
// import axios from 'axios';
import { useUbidots } from '../ubidots';
// import { ArduinoIoTCloud } from 'arduino-iot-js';
 
const Home = () => {
    const navigate = useNavigate();
    const { fetchData, isLoading, error } = useUbidots('BBFF-OQIi5phTOiJ47GHQqDhy0jQ6HhuK6s');
    const [data, setData] = useState(null);
    const [language, setLanguage] = useState('Inglés'); 
    const [totalRequests, setTotalRequests] = useState(0)
    const [totalWords, setTotalWords] = useState(0)

    useEffect(() => {
        const obtenerDatos = async () => {
            console.log("requested")
            const datos = await fetchData('variables/6563d7cc8d34d9000cff040f');
            if (datos && datos.lastValue) {
                setTotalRequests(datos.lastValue.value || 0);
            }
            const datos2 = await fetchData('variables/6563d9bd8d34d9000e925d6c');
            if (datos2 && datos2.lastValue) {
                setTotalWords(datos2.lastValue.value || 0);
            }
        };

        // Llamada inicial
        obtenerDatos();

        // Configurar intervalo
        const intervalId = setInterval(obtenerDatos, 100000);

        // Limpieza del intervalo
        return () => clearInterval(intervalId);
    }, [fetchData]);



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
        return (<div className="bg-white p-4 rounded-lg shadow flex justify-between">
            <Graph data={totalRequests} title={"Total de requests"} />
            <Graph data={totalWords} title={"Total de palabras"} />
        </div>)
    };



    return (
        <>
            <nav className="bg-blue-500 p-4 text-white">
                <div className="container mx-auto flex justify-between items-center">
                    <p className=' font-bold'>
                        LINGUAVIEW
                    </p>
 
                    <div>
                        <p className=' font-bold'>
                            Rol: {auth.currentUser.displayName || "Usuario"}
                        </p>
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
                {auth.currentUser.displayName == "Admin" ? <p className="text-center">Seleccionar idioma:</p> : <p className="text-center">Idioma:</p>}
                <select 
                    className=" appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={language}
                    disabled={auth.currentUser.displayName != "Admin"}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option>English</option>
                </select>
                
            </div>
            {auth.currentUser.displayName != "Admin" && <p className="text-center text-red-500">*Solo disponible para administradores*</p>}
        </>
    );
}


const Graph = ({data, title}) => {
return (
    <div className='w-1/2 h-40 shadow text-center mx-5 items-center flex justify-center'>
        <div>
        <p className=' text-4xl font-normal'>
            {data}
        </p>
        <p className=' text-xl font-bold mt-5'>
            {title}
        </p>
        </div>

    </div>
)
}
 
export default Home;