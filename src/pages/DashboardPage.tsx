import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DraggableProjectCard from "../components/project/DraggableProjectCard";
import SidebarFolderItem from "../components/sidebar/SidebarFolderItem";
import useIsMobile from "../hooks/useIsMobile";

export default function DashboardPage() {
    const selectedFolder = useSelector((state: RootState) => state.dashboard.selectedFolder);
    const folders = useSelector((state: RootState) => state.dashboard.folders);
    const folder = useSelector((state: RootState) =>
        state.dashboard.folders.find((f) => f.name === selectedFolder)
    );
    const isMobile = useIsMobile();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {isMobile && 
                <ul className="space-y-2">
                    {folders.map((folder) => (
                        <SidebarFolderItem key={folder.name} folderName={folder.name} onClose={() => console.log("okay")} />
                    ))}
                </ul>
            }
            {folder?.projects.map((project) => (
                <DraggableProjectCard key={project.id} id={project.id} name={project.name} folderName={folder?.name} />
            ))}
        </div>
    );
}
