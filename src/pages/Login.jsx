import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage, {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            })
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
               <>
            <main className="bg-gray-100 h-screen flex justify-center items-center w-full">        
                <section className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                    <div className="text-center mb-20">                                            
                        <p className="text-4xl font-bold text-gray-800"> LinguaView </p>                       
                    </div>
                                                       
                    <form className="space-y-4 w-full">
                        <div>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                className="shadow px-3 appearance-none border rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"                                    
                                required                                                                                
                                placeholder="Email address"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="shadow px-3 appearance-none border rounded w-full py-2  text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"                                    
                                required                                                                                
                                placeholder="Password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                                                
                        <div>
                            <button                                    
                                onClick={onLogin}
                                className="bg-blue-500 px-3 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"                                        
                            >      
                                Login                                                                  
                            </button>
                        </div>                               
                    </form>
                       
                    <p className="text-sm text-gray-600 text-center mt-4 ">
                        No account yet? {' '}
                        <NavLink to="/signup" className="text-blue-500 hover:text-blue-700">
                            Sign up
                        </NavLink>
                    </p>
                </section>
            </main>
        </>
    )
}
 
export default Login