import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Folder, Pencil, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectFolder, renameFolder } from "../../redux/slices/dashboardSlice";
import { RootState } from "../../redux/store";

type SidebarFolderItemProps = {
    folderName: string;
    onClose: () => void;
};

export default function SidebarFolderItem({ folderName, onClose }: SidebarFolderItemProps) {
    const dispatch = useDispatch();
    const selectedFolder = useSelector((state: RootState) => state.dashboard.selectedFolder);
    const folder = useSelector((state: RootState) =>
        state.dashboard.folders.find((f) => f.name === folderName)
    );
    const { setNodeRef, isOver } = useDroppable({ id: folderName });

    const isSelected = selectedFolder === folderName;

    const [isEditingFolder, setIsEditingFolder] = useState(false);
    const [folderTitle, setFolderTitle] = useState(folderName);

    const handleFolderRename = () => {
        if (folderTitle.trim() && folderTitle !== folderName) {
            dispatch(renameFolder({ oldName: folderName, newName: folderTitle.trim() }));
        }
        setIsEditingFolder(false);
    };

    return (
        <li ref={setNodeRef}>
            <button
                className={`flex items-center gap-2 cursor-pointer w-full text-left px-4 py-2 rounded transition font-medium
                ${isSelected ? "bg-blue-500 text-white" : isOver ? "bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => {
                    dispatch(selectFolder(folderName)); // Corrected line
                    onClose();
                }}
            >
                <Folder size={18} />
                {isEditingFolder ? (
                    <div className="flex justify-between items-center w-full">
                        <input
                            value={folderTitle}
                            onChange={(e) => setFolderTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleFolderRename()}
                            autoFocus
                            className="w-full md:w-3/4 flex-1 px-2 h-8 rounded border"
                        />
                        <button onClick={handleFolderRename} className="text-green-600 cursor-pointer">
                            <Check size={18} />
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-between items-center w-full">
                        <span>{folderName} ({folder?.projects.length})</span>
                        <button
                            onClick={() => {
                                setIsEditingFolder(true);
                                setFolderTitle(folderName);
                            }}
                            className="text-gray-500 hover:text-blue-600 transition cursor-pointer"
                        >
                            <Pencil size={14} />
                        </button>
                    </div>
                )}
            </button>
        </li>
    );
}
