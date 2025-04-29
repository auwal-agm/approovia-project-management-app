import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Project from "./Project";
import { renameProject } from "../../redux/slices/dashboardSlice";
import { useDispatch } from "react-redux";
import { Check, Pencil } from "lucide-react";

type Props = {
  id: string;
  name: string;
  folderName: string;
};

export default function DraggableProjectCard({ id, name, folderName }: Props) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { projectId: id },
  });

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectNameDraft, setProjectNameDraft] = useState(name);

  const handleProjectRename = () => {
    if (projectNameDraft.trim()) {
      dispatch(renameProject({ folderName, projectId: id, newName: projectNameDraft.trim() }));
    }
    setEditingProjectId(null);
  };

  return (
    <div className="relative group cursor-pointer">
      <div className="w-full flex justify-end mb-1 gap-2 px-1">
        {editingProjectId === id ? (
          <>
            <input
              value={projectNameDraft}
              onChange={(e) => setProjectNameDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProjectRename()}
              autoFocus
              className="flex-1 p-2 rounded border h-8 w-3/4"
            />
            <button
              onClick={handleProjectRename}
              className="text-green-600 cursor-pointer"
            >
              <Check size={18} />
            </button>
          </>
        ) : (
          <button
            className="relative text-gray-500 hover:text-blue-600 transition cursor-pointer"
            onClick={() => {
              setEditingProjectId(id);
              setProjectNameDraft(name);
              console.log('AGM => ', id);
            }}
          >
            <Pencil size={14} />
          </button>
        )}
      </div>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className={`h-24 flex justify-center items-center p-3 mb-2 bg-white rounded shadow transition-all duration-300 ease-in-out transform ${isDragging ? "scale-95 opacity-60 border-3 border-blue-500" : "hover:scale-[1.02]"}`}
      >
        <div key={id} className="w-full text-center h-24 relative group cursor-pointer">
          <Project name={name} />
        </div>
      </div>
    </div>
  );
}
