import Upload from "./Upload";
    

// task
// improve Home page with image and text making footer 
// navbar
const Home = ()=>{
    return (
        <main className="min-h-screen bg-gray-600">
            <nav className="flex justify-center items-center px-8 py-6">
                <h1 className="text-2xl font-bold ">
                    <span className="text-blue-400">Remove</span>-
                    <span className="text-red-400">Background</span>
                </h1>
            </nav>
            <div className="flex justify-center items-start mt-50">
<Upload/>
            </div>
            
        </main>
    )
}

export default Home;