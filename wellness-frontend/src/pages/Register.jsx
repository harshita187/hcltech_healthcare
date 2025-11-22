import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, HeartPulse } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Right Side - Form (First on mobile natural flow, but we force order via flex-row-reverse on desktop) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white order-1 lg:order-2">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500">Start your wellness journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
             {/* Name Input */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold hover:text-white text-black bg-secondary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all transform hover:scale-[1.02] disabled:opacity-70"
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link to="/login" className="font-medium text-secondary hover:text-emerald-600">
                Log in instead
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Left Side - Visual (Wellness Theme) */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-secondary to-teal-600 items-center justify-center p-12 relative overflow-hidden order-2 lg:order-1">
        <div className="absolute top-20 right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-white opacity-10 rounded-full blur-3xl"></div>
        
        <div className="text-white z-10 max-w-md">
          <div className="mb-6 flex items-center gap-3">
             <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <HeartPulse size={32} />
            </div>
            <h1 className="text-3xl font-bold">Join the Movement</h1>
          </div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">
            Your health journey starts here.
          </h2>
          <ul className="text-emerald-50 space-y-4 text-lg mt-6">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Personalized Daily Goals</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Smart Checkup Reminders</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Track Sleep & Activity</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;