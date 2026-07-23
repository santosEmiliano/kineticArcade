import GameGallery from "../components/GameGallery"

function Home() {
    return(
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">Game Library</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
                    Select a classic arcade game to play using real-time hand gesture controls.
                </p>
            </div>
            <GameGallery />
        </main>
    )
}

export default Home