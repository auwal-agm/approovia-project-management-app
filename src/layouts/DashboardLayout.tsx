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
import { useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Project from "../components/project/Project";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { moveProject } from "../redux/slices/dashboardSlice";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const folders = useSelector((state: RootState) => state.dashboard.folders);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeProject, setActiveProject] = useState<{ id: string; name: string } | null>(null);
    const dispatch = useDispatch();
    const projectsByFolder = useSelector((state: RootState) => state.dashboard.folders);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = (event: DragStartEvent) => {
        const { id } = event.active;
        const folder = projectsByFolder.find((f) =>
            f.projects.some((p) => p.id === id)
        );
        const project = folder?.projects.find((p) => p.id === id);
        if (project) {
            setActiveProject(project);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            toast.error("Please drop the project on a valid folder.");
            return;
        }

        const fromIndex = folders.findIndex((f) =>
            f.projects.find((p) => p.id === active.id)
        );
        const toIndex = folders.findIndex((f) => f.name === over.id);

        if (fromIndex === -1 || toIndex === -1) {
            toast.error("Drop target is invalid.");
            return;
        }

        const fromFolder = folders[fromIndex];
        const toFolder = folders[toIndex];

        const projectToMove = fromFolder.projects.find((p) => p.id === active.id);
        if (!projectToMove) return;

        if (fromFolder.name === toFolder.name) {
            toast.error("You cannot move a project to the same folder.");
            return;
        }

        if (over && active.id !== over.id) {
            dispatch(moveProject({ projectId: active.id as string, targetFolder: over.id as string }));

            // Simulate API with success
            toast.promise(
                new Promise((resolve) =>
                    setTimeout(() => {
                        resolve(true);
                    }, 800)
                ),
                {
                    loading: `Moving ${projectToMove.name}...`,
                    success: `${projectToMove.name} moved to ${toFolder.name}`,
                    error: "Move failed",
                }
            );
        }

        setActiveProject(null);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-screen bg-gray-100">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex flex-col flex-1">
                    <Header />
                    <main className="p-4 overflow-auto">{children}</main>
                </div>
            </div>

            <DragOverlay>
                <div className="h-10 w-1/2 bg-white shadow-lg rounded-lg p-1 flex items-center justify-center">
                    {activeProject ? (
                        <Project name={activeProject.name} />
                    ) : null}
                </div>
            </DragOverlay>
        </DndContext>
    );
}
