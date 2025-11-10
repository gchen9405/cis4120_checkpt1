import { createRoot } from "react-dom/client";
import "@/index.css";
import {
    Pill,
    Calendar,
    FlaskConical,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Clock,
    TrendingUp,
    Plus,
    Download,
    Share2,
} from "lucide-react";

function StylesDemo() {
    return (
        <div className="font-sans bg-background text-foreground">
            <header className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-medical-blue">Micro-Timeline Style Guide</h1>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* Colors Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Color Palette</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <ColorSwatch colorName="medical-blue" name="Medical Blue" hex="#4A90E2" />
                        <ColorSwatch colorName="calming-green" name="Calming Green" hex="#1A8B5E" />
                        <ColorSwatch colorName="accent-purple" name="Accent Purple" hex="#9D4EDD" />
                        <ColorSwatch colorName="accent-cyan" name="Accent Cyan" hex="#13B5EA" />
                        <ColorSwatch colorName="accent-amber" name="Accent Amber" hex="#F59E0B" />
                        <ColorSwatch colorName="alert-red" name="Alert Red" hex="#E74C3C" />
                    </div>
                </section>

                {/* Typography Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Typography - System Font</h2>
                    <div className="space-y-4 text-lg">
                        <p className="font-bold">Bold Font Weight (700)</p>
                        <p className="font-semibold">Semibold Font Weight (600)</p>
                        <p className="font-medium">Medium Font Weight (500)</p>
                        <p className="font-normal">Regular Font Weight (400)</p>
                    </div>
                    <div className="mt-6 space-y-2">
                        <p className="text-3xl font-bold">Page Heading</p>
                        <p className="text-2xl font-semibold">Section Heading</p>
                        <p className="text-base">Base body text</p>
                        <p className="text-sm">label text</p>
                        <p className="text-xs">helper text</p>
                    </div>
                </section>

                {/* Buttons Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
                    <div className="flex items-center gap-4">
                        <button className="bg-medical-blue text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                            Primary Button
                        </button>
                        <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                            Secondary Button
                        </button>
                    </div>
                </section>

                {/* Icons Section */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Icons (from Lucide React)</h2>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-foreground">
                        <IconDisplay icon={<Pill className="text-medical-blue" />} name="Pill" />
                        <IconDisplay icon={<Calendar className="text-accent-purple" />} name="Calendar" />
                        <IconDisplay icon={<FlaskConical className="text-accent-cyan" />} name="FlaskConical" />
                        <IconDisplay icon={<CheckCircle2 className="text-calming-green" />} name="CheckCircle2" />
                        <IconDisplay icon={<AlertCircle className="text-accent-amber" />} name="AlertCircle" />
                        <IconDisplay icon={<XCircle className="text-alert-red" />} name="XCircle" />
                        <IconDisplay icon={<Clock />} name="Clock" />
                        <IconDisplay icon={<TrendingUp />} name="TrendingUp" />
                        <IconDisplay icon={<Plus />} name="Plus" />
                        <IconDisplay icon={<Download />} name="Download" />
                        <IconDisplay icon={<Share2 />} name="Share2" />
                    </div>
                </section>
            </main>
        </div>
    );
}

const ColorSwatch = ({
    colorName,
    name,
    hex,
}: { colorName: string; name: string; hex: string }) => {
    const colorVariants: Record<string, string> = {
        "medical-blue": "bg-medical-blue",
        "calming-green": "bg-calming-green",
        "accent-purple": "bg-accent-purple",
        "accent-cyan": "bg-accent-cyan",
        "accent-amber": "bg-accent-amber",
        "alert-red": "bg-alert-red",
    };

    return (
        <figure className="w-24 mx-auto flex flex-col items-center">
            <div className={`size-24 rounded-lg border border-border ${colorVariants[colorName]}`} />
            <figcaption className="mt-2 w-full text-center">
                <p className="font-semibold leading-tight">{name}</p>
                <p className="text-xs text-muted-foreground font-mono leading-tight">{hex}</p>
            </figcaption>
        </figure>
    );
};

const IconDisplay = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
    <div className="text-center flex flex-col items-center gap-2">
        <div className="w-8 h-8">{icon}</div>
        <p className="text-sm text-muted-foreground">{name}</p>
    </div>
);

createRoot(document.getElementById("root")!).render(<StylesDemo />);