import Icon from "../../assets/Frame 7108.svg"

export function Header() {
    return (
        <div className="flex items-center gap-5 py-2">
            <img src={Icon} alt="Icon" />

            <nav className="flex items-center gap-5">
                <a href="" className="text-sm font-medium text-zinc-300">Eventos</a>
                <a href="" className="text-sm font-medium">Participantes</a>
            </nav>
        </div>
    );
}