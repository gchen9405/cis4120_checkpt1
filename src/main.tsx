import { createRoot } from "react-dom/client";
import Index from "@/pages/Index";
import "@/index.css";

function App() {
    return <Index />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<App />);
}