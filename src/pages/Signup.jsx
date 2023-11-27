import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth } from '../../firebase';
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState("Usuario")
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            updateProfile(auth?.currentUser, {
                displayName: rol
            }).then((res) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login")
            })

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
    return (
        <main className="bg-gray-100 h-screen flex justify-center items-center">        
            <section className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">LinguaView</h1>                                                                            
                </div>
                                                   
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email-address"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Email address"                                
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Password"              
                        />
                    </div>   

                    <div>
                        <label htmlFor="rol" className="block text-gray-700 text-sm font-bold mb-2">
                            Rol
                        </label>
                        <select
                            id="rol"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecciona un rol</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"                        
                    >  
                        Sign up                                
                    </button>
                                                                 
                </form>
               
                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{' '}
                    <NavLink to="/login" className="text-blue-500 hover:text-blue-700">
                        Sign in
                    </NavLink>
                </p>                   
            {/* </div> */}
        </section>
    </main>
    )
}
 
export default Signup