import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DndContext,
    DragOverlay,
    DragEndEvent,
    DragStartEvent,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
} from "@dnd-kit/core";
import toast from "react-hot-toast";

import FolderView from "../components/folder/FolderView";
import { RootState } from "../redux/store";
import { updateFolders } from "../redux/slices/dashboardSlice";

export default function DashboardPage() {
    const dispatch = useDispatch();
    const folders = useSelector((state: RootState) => state.dashboard.folders);
    const [activeProject, setActiveProject] = useState<{ id: string; name: string } | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = (event: DragStartEvent) => {
        const draggedId = event.active.id;
        const project = folders
            .flatMap((f) => f.projects)
            .find((p) => p.id === draggedId);

        if (project) setActiveProject(project);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveProject(null);

        if (!over) {
            toast.error("Please drop the project on a valid folder.");
            return;
        }

        const sourceIndex = folders.findIndex((folder) =>
            folder.projects.find((p) => p.id === active.id)
        );
        const destinationIndex = folders.findIndex((folder) => folder.name === over.id);

        if (sourceIndex === -1 || destinationIndex === -1) {
            toast.error("Drop target is invalid.");
            return;
        }

        // Don’t move if dropped in same folder
        if (sourceIndex === destinationIndex) return;

        const fromFolder = folders[sourceIndex];
        const toFolder = folders[destinationIndex];
        const projectToMove = fromFolder.projects.find((p) => p.id === active.id);

        if (!projectToMove) return;

        const updated = folders.map((folder, i) => {
            if (i === sourceIndex) {
                return {
                    ...folder,
                    projects: folder.projects.filter((p) => p.id !== active.id),
                };
            }
            if (i === destinationIndex) {
                return {
                    ...folder,
                    projects: [...folder.projects, projectToMove],
                };
            }
            return folder;
        });

        dispatch(updateFolders(updated));

        toast.promise(
            new Promise((res) => setTimeout(res, 800)),
            {
                loading: `Moving ${projectToMove.name}...`,
                success: `${projectToMove.name} moved to ${toFolder.name}`,
                error: "Move failed",
            }
        );
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 gap-4">
                {folders.map((folder) => (
                    <FolderView
                        key={folder.name}
                        folderName={folder.name}
                        projects={folder.projects}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeProject && (
                    <div className="h-24 flex justify-center items-center p-3 bg-white rounded shadow border border-blue-500">
                        {activeProject.name}
                    </div>
                )}
            </DragOverlay>
        </DndContext>
    );
}

