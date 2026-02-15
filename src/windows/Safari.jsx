import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls";
import { ArrowLeft, ArrowRight, RotateCcw, Share, Plus, Copy, Lock, Github, MapPin, Link as LinkIcon, Users, Book } from "lucide-react";
import { useEffect, useState } from "react";

const Safari = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""));
        }, 500);

        // Deliberate delay of 2 seconds
        const timer = setTimeout(() => {
            // Using a hardcoded fallback if fetch fails or for testing if API is blocked
            fetch("https://api.github.com/users/mahatolalit")
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch");
                    return res.json();
                })
                .then(data => {
                    setProfile(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("GitHub API Error:", err);
                    // Fallback profile data so it doesn't stay stuck on loading
                    setProfile({
                        name: "Lalit Mahato",
                        login: "mahatolalit",
                        bio: "Full Stack Developer | React, Next.js, Node.js",
                        location: "India",
                        blog: "https://portfolio-lalit.vercel.app",
                        followers: 100,
                        following: 50,
                        public_repos: 20,
                        avatar_url: "https://github.com/mahatolalit.png",
                        html_url: "https://github.com/mahatolalit",
                        created_at: "2020-01-01T00:00:00Z"
                    });
                    setLoading(false);
                });
        }, 3000);

        return () => {
             clearTimeout(timer);
             clearInterval(interval);
        }
    }, []);

    return (
        <div className="h-full flex flex-col bg-white w-full rounded-xl overflow-hidden">
            {/* Safari Header/Toolbar */}
            <div id="window-header" className="bg-[#f3f4f6] px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-4 border-b border-[#e5e7eb] h-14 shrink-0 transition-colors">
                <div className="flex gap-2 w-auto sm:w-20">
                    <WindowControls target="safari" />
                </div>
                
                <div className="flex gap-2 sm:gap-4 text-[#6b7280] hidden sm:flex">
                    <ArrowLeft size={18} className="cursor-pointer hover:text-black transition-colors" />
                    <ArrowRight size={18} className="cursor-pointer hover:text-black transition-colors opacity-50" />
                </div>

                <div className="flex-1 flex justify-center px-0 sm:px-4">
                    <div className="flex items-center gap-2 bg-[#e5e7eb] px-3 py-1.5 rounded-lg w-full max-w-xl text-xs sm:text-sm text-black/80 hover:bg-[#d1d5db] transition-colors cursor-text group shadow-sm ring-1 ring-transparent focus-within:ring-blue-400 focus-within:bg-white">
                       <Lock size={12} className="text-black/50 shrink-0" />
                       <span className="flex-1 text-center group-hover:text-left truncate select-all">github.com/mahatolalit</span>
                       <RotateCcw size={12} className="text-black/50 hover:text-black cursor-pointer shrink-0" />
                    </div>
                </div>

                <div className="flex gap-2 sm:gap-4 text-[#6b7280] w-auto sm:w-20 justify-end hidden sm:flex">
                    <Share size={18} className="cursor-pointer hover:text-black transition-colors" />
                    <Plus size={18} className="cursor-pointer hover:text-black transition-colors" />
                    <Copy size={18} className="cursor-pointer hover:text-black transition-colors" />
                </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar relative">
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                        {/* Bouncing GitHub Cat */}
                        <div className="animate-bounce mb-4">
                            <Github size={48} className="text-gray-800" />
                        </div>
                        
                        {/* Loading Bar */}
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-3">
                            <div className="h-full bg-blue-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
                        </div>

                        {/* Loading Text */}
                        <p className="text-sm font-medium text-gray-500 font-mono">
                            Loading Profile{dots}
                        </p>
                        
                        <style>{`
                            @keyframes loading {
                                0% { transform: translateX(-100%); }
                                50% { transform: translateX(100%); width: 70%; }
                                100% { transform: translateX(200%); }
                            }
                        `}</style>
                    </div>
                ) : profile ? (
                    <div className="max-w-4xl mx-auto p-4 sm:p-8">
                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start border-b border-gray-200 pb-8">
                            <img 
                                src={profile.avatar_url} 
                                alt={profile.name} 
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-gray-200 shadow-sm"
                            />
                            <div className="space-y-3 flex-1">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{profile.name}</h1>
                                    <h2 className="text-lg text-gray-500 font-light">{profile.login}</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed max-w-2xl">
                                    {profile.bio || "No bio available."}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600 pt-2">
                                    {profile.location && (
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={16} />
                                            {profile.location}
                                        </div>
                                    )}
                                    {profile.blog && (
                                        <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                            <LinkIcon size={16} />
                                            <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer" className="hover:underline">
                                                {profile.blog}
                                            </a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Users size={16} />
                                        <span className="font-semibold text-gray-900">{profile.followers}</span> followers
                                        <span className="mx-1">·</span>
                                        <span className="font-semibold text-gray-900">{profile.following}</span> following
                                    </div>
                                </div>
                            </div>
                            <a 
                                href={profile.html_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="bg-[#2da44e] text-white px-4 py-1.5 rounded-md font-medium text-sm hover:bg-[#2c974b] transition-colors shadow-sm flex items-center gap-2"
                            >
                                <Github size={16} />
                                View on GitHub
                            </a>
                        </div>
                        
                        {/* Stats / Repos Layout Mock */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:underline">
                                        <Book size={16} />
                                        <span>Public Repositories</span>
                                    </div>
                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">{profile.public_repos}</span>
                                </div>
                                <p className="text-sm text-gray-500">Check out my latest projects and contributions.</p>
                             </div>
                             
                             <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:underline">
                                        <Github size={16} />
                                        <span>Original Account</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">Member since {new Date(profile.created_at).getFullYear()}</p>
                             </div>
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-red-500">
                        Failed to load profile.
                    </div>
                )}
            </div>
        </div>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
