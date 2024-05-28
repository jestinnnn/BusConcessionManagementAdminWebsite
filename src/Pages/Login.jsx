import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Connection/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, admin } = formData;
    if (admin) {
      if (admin === "Institute") {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem('user', JSON.stringify(userCredential.user));
          localStorage.setItem('type', admin);
          navigate('/institute/request');
        } catch (error) {
          setError('Failed to log in. Please check your credentials.');
        }
      } else {
        try {
          console.log(formData);
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem('user', JSON.stringify(userCredential.user));

          localStorage.setItem('type', admin);
          navigate('/transport/request');
        } catch (error) {
          setError('Failed to log in. Please check your credentials.');
        }
      }
    } else {
      setError('Select admin type');
    }
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-bold text-gray-900 border p-5 rounded-xl ">
            <img className="w-12 h-12 mr-2" src="https://firebasestorage.googleapis.com/v0/b/busapp-6cd14.appspot.com/o/logo%2F12.png?alt=media&token=a0adc527-32e6-443b-a65a-6577b095d7e1" alt="logo" />
            <span className='text-[#87B7D9]'>Ride </span> <span className='text-[#0F6CC7]'>Right</span>
          </a>

          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                {formData.admin} Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="admin" className="block mb-2 text-sm font-medium text-gray-900">Select Admin</label>
                  <select
                    id="admin"
                    name="admin"
                    value={formData.admin}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  >
                    <option value="" className="user-select-none sr-only">Select Your type</option>
                    <option value="Institute">Institute</option>
                    <option value="Transport">Transport Office (RTO)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter Your Email id"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                {error && <p className='text-red-500'>{error}</p>}
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
