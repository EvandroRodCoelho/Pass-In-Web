import { IconButtonProps } from "./iconButtonProps";

export function IconButton({ transparent, ...props }: IconButtonProps) {
    return (
        <button {...props}
            className={transparent ? 'bg-black/20 border border-white/10 rounded-md p-1.5 disabled:opacity-50' : 'bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-50 disabled:cursor-not-allowed'}
        />
    );
}

