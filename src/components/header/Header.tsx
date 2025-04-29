import useIsMobile from "../../hooks/useIsMobile";

type HeaderProps = {
    onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
    const isMobile = useIsMobile();
    return (
        <header className="bg-white shadow p-4 flex items-center gap-2">
            {!isMobile && 
            <button
                className="md:hidden text-gray-600"
                onClick={onMenuClick}
                aria-label="Open sidebar"
            >
                <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            }
            <h1 className="text-xl font-bold text-gray-700">Approovia Project Management</h1>
        </header>
    );
}
