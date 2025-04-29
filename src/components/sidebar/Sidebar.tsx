import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Folder } from "lucide-react";
import { selectFolder } from "../../redux/slices/dashboardSlice";
import { RootState } from "../../redux/store";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedFolder: string;
    onSelectFolder: (folder: string) => void;
};

export default function Sidebar({
    isOpen,
    onClose,
}: SidebarProps) {
    const dispatch = useDispatch();
    const folders = useSelector((state: RootState) => state.dashboard.folders);
    const selectedFolder = useSelector((state: RootState) => state.dashboard.selectedFolder);
    return (
        <Fragment>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-20 transition-opacity md:hidden ${isOpen ? "block" : "hidden"}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed z-30 inset-y-0 left-0 w-64 bg-white shadow-lg p-4 transition-transform transform md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:relative md:translate-x-0`}
            >
                <nav className="space-y-4">
                    <div className="p-2 pb-2 flex items-center justify-left">
                        <h2 className="text-lg font-semibold">Project Folders</h2>
                    </div>
                    <ul className="space-y-2">
                        {folders.map((folder, index) => (
                            <li key={index}>
                                <button
                                    className={`flex items-center gap-2 cursor-pointer w-full text-left px-4 py-2 rounded transition font-medium ${folder.name === selectedFolder
                                        ? "bg-blue-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    onClick={() => {
                                        dispatch(selectFolder(folder.name));
                                        onClose(); // for mobile
                                    }}
                                >
                                    <Folder size={18} />
                                    {folder.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </Fragment>
    );
}
