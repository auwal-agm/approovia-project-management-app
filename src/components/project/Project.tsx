import { useDraggable } from "@dnd-kit/core";

type ProjectProps = {
    id: string;
    name: string;
};

export default function Project({ id, name }: ProjectProps) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={`h-24 flex justify-center items-center p-3 mb-2 bg-white rounded shadow transition-all duration-300 ease-in-out transform ${isDragging ? "scale-95 opacity-60 border border-blue-400" : "hover:scale-[1.02]"}`}
        >
            {name}
        </div>
    );
}
