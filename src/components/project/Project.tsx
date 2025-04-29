
type ProjectProps = {
    name: string;
};

export default function Project({ name }: ProjectProps) {
    return (
        <div 
            className="w-full h-24 flex justify-center items-center"
            >
            <h3 className="font-semibold">{name}</h3>
        </div>
    );
}
