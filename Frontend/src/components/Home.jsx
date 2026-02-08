import Upload from "./Upload";
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-slate-900 text-slate-100 selection:bg-blue-500/30">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
                <div 
                    className="flex items-center gap-2 cursor-pointer group" 
                    onClick={() => navigate("/")}
                >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />
                    <h1 className="text-2xl font-black tracking-tight">
                        <span className="text-white">Remove</span>
                        <span className="text-blue-400">BG</span>
                    </h1>
                </div>

                <button 
                    className="bg-slate-800 border border-slate-700 hover:border-blue-500 transition-all rounded-full font-semibold text-sm py-2 px-6 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                    onClick={() => navigate("/")} 
                >
                    Uploads
                </button> 
            </nav>

            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-4 pt-20 pb-12 text-center ">
                <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    Remove backgrounds <br /> in a heartbeat.
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                    High-quality background removal for pros. Fast, free, and completely 
                    automatic. Just drop your image and let the AI do the heavy lifting.
                </p>

                {/* Upload Container */}
                <div className="relative group max-w-2xl mx-auto">
                    {/* Decorative glow behind the upload box */}
                    <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    
                    <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                        <Upload />
                    </div>
                </div>
            </div>

            
            <footer className="fixed bottom-6 w-full text-center text-slate-500 text-sm">
                Built ❤️ By shubham
            </footer>
        </main>
    );
}

export default Home;