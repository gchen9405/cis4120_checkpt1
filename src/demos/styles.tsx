import { createRoot } from "react-dom/client";
import "@/index.css";
import { Icon } from "@iconify/react";

function StylesDemo() {
    return (
        <div className="font-sans bg-white text-gray-800">
            <header className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-styleguide-blue">Style Guide Demo</h1>
            </header>

            <div className="bg-styleguide-gray">
                <div className="container mx-auto px-4 py-1"></div>
            </div>

            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* Colors Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Colors</h2>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-lg bg-styleguide-blue"></div>
                            <p className="mt-2 font-bold">#005EEA</p>
                        </div>
                        <div className="text-center">
                            <div className="w-24 h-24 rounded-lg bg-styleguide-gray border"></div>
                            <p className="mt-2 font-bold">#C8C8C8</p>
                        </div>
                    </div>
                </section>

                <div className="bg-styleguide-gray h-px w-full"></div>

                {/* Typography Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Typography - Lexend Deca</h2>
                    <div className="space-y-4">
                        <p className="font-bold text-lg">Bold Font Weight (700)</p>
                        <p className="font-normal text-lg">Regular Font Weight (400)</p>
                        <p className="font-light text-lg">Light Font Weight (300)</p>
                    </div>
                </section>

                <div className="bg-styleguide-gray h-px w-full"></div>

                {/* Buttons Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Buttons</h2>
                    <div className="flex items-center gap-4">
                        <button className="bg-styleguide-blue text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-colors">
                            Primary Button
                        </button>
                        <button className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Secondary Button
                        </button>
                    </div>
                </section>

                <div className="bg-styleguide-gray h-px w-full"></div>

                {/* Icons Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Icons (from Iconify)</h2>
                    <div className="flex items-center gap-6 text-styleguide-blue">
                        <div className="text-center">
                            <Icon icon="mdi:home" className="w-8 h-8" />
                            <p className="text-sm mt-1">Home</p>
                        </div>
                        <div className="text-center">
                            <Icon icon="mdi:account-circle" className="w-8 h-8" />
                            <p className="text-sm mt-1">Profile</p>
                        </div>
                        <div className="text-center">
                            <Icon icon="mdi:cog" className="w-8 h-8" />
                            <p className="text-sm mt-1">Settings</p>
                        </div>
                        <div className="text-center">
                            <Icon icon="mdi:bell" className="w-8 h-8" />
                            <p className="text-sm mt-1">Notifications</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

createRoot(document.getElementById("root")!).render(<StylesDemo />);