export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Quick Hire QTech
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Your modern hiring platform powered by Next.js and Tailwind CSS v4.
                </p>
                <div className="flex gap-4 justify-center mt-8">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30">
                        Get Started
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg font-medium transition-colors shadow-sm">
                        Learn More
                    </button>
                </div>
            </div>
        </main>
    );
}
