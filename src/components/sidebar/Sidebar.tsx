import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SidebarFolderItem from "./SidebarFolderItem";
import useIsMobile from "../../hooks/useIsMobile";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const folders = useSelector((state: RootState) => state.dashboard.folders);
    const isMobile = useIsMobile();

    return (
        <Fragment>
            <aside
                className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg p-4 transition-transform transform md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full" } md:relative md:translate-x-0`}>
                <nav className="space-y-4">
                    <div className="p-2 pb-2 flex items-center justify-left">
                        <h2 className="text-lg font-semibold">Project Folders</h2>
                    </div>
                    <ul className="space-y-2">
                        {!isMobile && folders.map((folder) => (
                            <SidebarFolderItem key={folder.name} folderName={folder.name} onClose={onClose} />
                        ))}
                    </ul>
                </nav>
            </aside>
        </Fragment>
    );
}
