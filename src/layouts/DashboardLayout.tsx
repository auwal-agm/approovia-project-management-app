import { useState } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";


type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState("Design");

    const handleSelectFolder = (folder: string) => {
        setSelectedFolder(folder);
        setSidebarOpen(false); // auto-close sidebar on mobile
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                selectedFolder={selectedFolder}
                onSelectFolder={handleSelectFolder}
            />
            <div className="flex flex-col flex-1">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="p-4 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
