import { Link } from "react-router-dom";
import { TiMessages } from "react-icons/ti";
import { BsChatDots, BsShieldLock, BsGlobe } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

const Welcome = () => {
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full max-w-4xl p-8 rounded-2xl shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                {/* Animated Logo and Title */}
                <div className="text-center mb-12 transform hover:scale-105 transition-all duration-300">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <TiMessages className="relative text-8xl text-green-500 mx-auto mb-4 animate-bounce" />
                    </div>
                    <h1 className='text-5xl font-bold text-center text-gray-300 mb-4'>
                        Welcome to
                        <span className='text-red-500 hover:text-red-400 transition-colors duration-300'> ChatApp</span>
                    </h1>
                    <p className="text-slate-300 text-xl">Where Conversations Come Alive</p>
                </div>

                {/* Animated Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <FeatureCard
                        icon={<BsChatDots className="text-3xl" />}
                        title="Real-time Chat"
                        description="Experience instant message delivery with live typing indicators and read receipts"
                        gradient="from-green-500 to-emerald-700"
                    />
                    <FeatureCard
                        icon={<FaUserFriends className="text-3xl" />}
                        title="User Friendly"
                        description="Intuitive interface designed for seamless communication"
                        gradient="from-blue-500 to-indigo-700"
                    />
                    <FeatureCard
                        icon={<BsShieldLock className="text-3xl" />}
                        title="Secure Messaging"
                        description="Your conversations are protected with end-to-end encryption"
                        gradient="from-purple-500 to-pink-700"
                    />
                    <FeatureCard
                        icon={<BsGlobe className="text-3xl" />}
                        title="Always Connected"
                        description="Stay in touch with friends across all your devices"
                        gradient="from-orange-500 to-red-700"
                    />
                </div>

                {/* Animated Call to Action */}
                <div className="space-y-6 text-center">
                    <Link
                        to="/signup"
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg transition-all duration-300 ease-out hover:scale-105"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                        <span className="relative text-white text-lg">Get Started Now</span>
                    </Link>

                    <div className="flex items-center justify-center space-x-2 text-lg">
                        <span className="text-slate-300">Already have an account?</span>
                        <Link
                            to="/login"
                            className="text-green-500 hover:text-green-400 font-medium hover:underline transition-all duration-300"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-green-500 rounded-full animate-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 2}s`,
                                opacity: 0.3
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
    <div className="group relative p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

        {/* Content */}
        <div className="relative">
            <div className="text-green-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-green-400 transition-colors duration-300">
                {title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    </div>
);

export default Welcome; 