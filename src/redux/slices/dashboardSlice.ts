import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Project = { id: string; name: string };
type Folder = { name: string; projects: Project[] };

interface DashboardState {
    folders: Folder[];
    selectedFolder: string;
}

const initialState: DashboardState = {
    folders: [
        {
            name: "Design",
            projects: [
                { id: "p1", name: "Landing Page" },
                { id: "p2", name: "Brand Identity" },
            ],
        },
        {
            name: "Development",
            projects: [
                { id: "p3", name: "API Integration" },
                { id: "p4", name: "Dashboard UI" },
            ],
        },
        {
            name: "Marketing",
            projects: [
                { id: "p5", name: "Email Campaign" },
                { id: "p6", name: "SEO Optimization" },
            ],
        },
    ],
    selectedFolder: "Design",
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        selectFolder: (state, action: PayloadAction<string>) => {
            state.selectedFolder = action.payload;
        },
        renameFolder: (
            state,
            action: PayloadAction<{ oldName: string; newName: string }>
        ) => {
            const folder = state.folders.find((f) => f.name === action.payload.oldName);
            if (folder) folder.name = action.payload.newName;
        },
        renameProject: (
            state,
            action: PayloadAction<{ folderName: string; projectId: string; newName: string }>
        ) => {
            const folder = state.folders.find((f) => f.name === action.payload.folderName);
            const project = folder?.projects.find((p) => p.id === action.payload.projectId);
            if (project) project.name = action.payload.newName;
        },
        updateFolders: (state, action: PayloadAction<Folder[]>) => {
            state.folders = action.payload;
        },
        moveProject: (state, action) => {
            const { projectId, targetFolder } = action.payload;

            let movingProject = null;

            // Remove from original folder
            for (const folder of state.folders) {
                const index = folder.projects.findIndex((p) => p.id === projectId);
                if (index !== -1) {
                    movingProject = folder.projects[index];
                    folder.projects.splice(index, 1);
                    break;
                }
            }

            // Add to new folder
            if (movingProject) {
                const target = state.folders.find((f) => f.name === targetFolder);
                if (target) {
                    target.projects.push(movingProject);
                }
            }
        },
    },
});

export const { selectFolder, renameFolder, renameProject, updateFolders, moveProject } = dashboardSlice.actions;

export default dashboardSlice.reducer;
