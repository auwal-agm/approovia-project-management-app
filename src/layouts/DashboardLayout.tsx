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
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Project from "../components/project/Project";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { moveProject } from "../redux/slices/dashboardSlice";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

        if (over && active.id !== over.id) {
            dispatch(moveProject({ projectId: active.id as string, targetFolder: over.id as string }));
        }
        setActiveProject(null);
    };

    return (
        <DndContext
            sensors={sensors}
            // collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-screen bg-gray-100">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex flex-col flex-1">
                    <Header onMenuClick={() => setSidebarOpen(true)} />
                    <main className="p-4 overflow-auto">{children}</main>
                </div>
            </div>

            {/* Drag overlay */}
            <DragOverlay>
                {activeProject ? (
                    <Project name={activeProject.name} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
