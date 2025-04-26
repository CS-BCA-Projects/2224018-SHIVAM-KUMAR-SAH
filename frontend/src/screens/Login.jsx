import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col">
      {/* Navbar */}
      <nav className="bg-black/80 backdrop-blur-md text-white p-4 fixed w-full z-10 shadow-lg border-b border-purple-500/20">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-purple-400 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            AI Enhanced CollabTalk  
            </h1>
          </div>
          <div className="space-x-6 text-sm font-medium">
            <Link to="/login" className="text-purple-300 hover:text-purple-100 transition-colors duration-300">Login</Link>
            <Link to="/register" className="text-purple-300 hover:text-purple-100 transition-colors duration-300">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 mt-16">
        <div className="bg-black/40 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/30 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center mb-8">
            <svg className="w-7 h-7 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 9c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9c0 4.97-4.03 9-9 9z" />
            </svg>
            <h2 className="text-3xl font-bold text-white tracking-wide">Login</h2>
          </div>
          <form onSubmit={submitHandler}>
            <div className="mb-6 relative">
              <label className="block text-purple-200 text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  className="w-full p-3 pl-12 rounded-lg bg-gray-800/50 text-white border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  placeholder="Enter your email"
                  required
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
            </div>
            <div className="mb-8 relative">
              <label className="block text-purple-200 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  className="w-full p-3 pl-12 rounded-lg bg-gray-800/50 text-white border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            {error && <p className="text-pink-500 text-sm mb-6 font-medium">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white font-semibold tracking-wide transition-all duration-300 ${
                isLoading
                  ? 'bg-purple-700/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
          <p className="text-gray-300 mt-6 text-center text-sm">
            New here?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-md text-gray-300 p-4 border-t border-purple-500/20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="mb-2 md:mb-0">
            © 2025{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold">
            AI Enhanced CollabTalk
            </span>. Powered by Adley Services.
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:text-purple-300 transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-purple-300 transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-purple-300 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;