
import { twMerge } from 'tailwind-merge';
import { TableRowProps } from './tableRowProps';
export function TableRow(props: TableRowProps) {
    return (
        <tr {...props}
            className={twMerge('border-b border-white/10 hover:bg-white/5', props.className)}
        />
    );
}