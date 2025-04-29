import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import { Pencil, Check } from "lucide-react";
import Project from "../project/Project";
import { renameFolder, renameProject } from "../../redux/slices/dashboardSlice";
import { RootState } from "../../redux/store";

type ProjectType = {
  id: string;
  name: string;
};

type FolderViewProps = {
  folderName: string;
  projects: ProjectType[];
};

export default function FolderView({ folderName, projects }: FolderViewProps) {
  const dispatch = useDispatch();
  const selectedFolder = useSelector((state: RootState) => state.dashboard.selectedFolder);
  const { setNodeRef, isOver } = useDroppable({ id: folderName });

  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState(folderName);

  const handleFolderRename = () => {
    if (folderTitle.trim() && folderTitle !== folderName) {
      dispatch(renameFolder({ oldName: folderName, newName: folderTitle.trim() }));
    }
    setIsEditingFolder(false);
  };

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectNameDraft, setProjectNameDraft] = useState("");

  const handleProjectRename = (projectId: string) => {
    if (projectNameDraft.trim()) {
      dispatch(renameProject({ folderName, projectId, newName: projectNameDraft.trim() }));
    }
    setEditingProjectId(null);
  };

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 p-4 border rounded-md min-h-[200px] transition ${isOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
        } ${folderName === selectedFolder ? "ring-2 ring-blue-500" : ""}`}
    >
      {/* Folder header with edit icon */}
      <div className="flex justify-between items-center mb-4">
        {isEditingFolder ? (
          <div className="flex w-full gap-2 items-center">
            <input
              value={folderTitle}
              onChange={(e) => setFolderTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFolderRename()}
              className="flex-1 text-lg font-semibold px-2 py-1 border rounded"
              autoFocus
            />
            <button onClick={handleFolderRename} className="cursor-pointer text-green-600">
              <Check size={18} />
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-between items-center">
            <h2 className="text-lg font-semibold">{folderName}</h2>
            <button onClick={() => setIsEditingFolder(true)} className="cursor-pointer text-gray-500 hover:text-blue-600">
              <Pencil size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.length === 0 ? (
          <p className="text-gray-400 italic">No projects</p>
        ) : (
          projects.map((project) =>
            editingProjectId === project.id ? (
              <div key={project.id} className="flex items-center gap-2 mb-2">
                <input
                  value={projectNameDraft}
                  onChange={(e) => setProjectNameDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleProjectRename(project.id)}
                  autoFocus
                  className="flex-1 p-2 rounded border"
                />
                <button
                  onClick={() => handleProjectRename(project.id)}
                  className="text-green-600 cursor-pointer"
                >
                  <Check size={18} />
                </button>
              </div>
            ) : (
              <div key={project.id} className="relative group cursor-pointer">
                <Project name={project.name} />
                <button
                  className="absolute right-2 top-2 text-gray-500 hover:text-blue-600 transition cursor-pointer"
                  onClick={() => {
                    setEditingProjectId(project.id);
                    setProjectNameDraft(project.name);
                  }}
                >
                  <Pencil size={14} />
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
