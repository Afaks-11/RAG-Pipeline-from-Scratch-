import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import MainStage from "./components/layout/MainStage";
import AuthScreen from "./components/layout/AuthScreen";
import { LogOut } from "lucide-react";

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDocName, setSelectedDocName] = useState<string | null>(null);

  // Check for existing token on initial load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          console.warn("Token expired. Clearing session.");
          localStorage.removeItem("token");
          setToken(null);
        } else {
          setToken(savedToken);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // If no token, show the Login/Register screen
  if (!token) {
    return <AuthScreen onLoginSuccess={setToken} />;
  }

  // If logged in, show the main application
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden relative">
      <Sidebar
        selectedDocId={selectedDocId}
        onSelectDoc={(id: string, name?: string) => {
          setSelectedDocId(id);
          if (name) setSelectedDocName(name);
        }}
      />
      <MainStage
        selectedDocId={selectedDocId}
        selectedDocName={selectedDocName}
      />

      {/* Optional: A quick logout button floating in the top right corner */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-8 p-2 text-gray-400 hover:text-red-500 transition-colors z-50 bg-white rounded-full shadow-sm border border-gray-100"
        title="Logout"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}
