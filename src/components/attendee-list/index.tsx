import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { IconButton } from '../icon-button';
import { Table } from '../table/table';
import { TableHeader } from '../table/table-header';
import { TableCell } from '../table/table-cell';
import { TableRow } from '../table/table-row';
import useAttendeeList from './useAttendeeList';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br';

dayjs.extend(relativeTime)
dayjs.locale('pt-br')
export function AttendeeList() {
    const { onSearchChanged, page, goToLastPage, search,
        goToNextPage, goToPreviousPage, goToFirstPage, attendees, totalPagesRef, total } = useAttendeeList();

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input type="text"
                        onChange={onSearchChanged}
                        value={search}
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0"
                        placeholder="Buscar participante..." />
                </div>
            </div>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" name="" id="" className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400" />
                        </TableHeader>
                        <TableHeader >Código</TableHeader>
                        <TableHeader >Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id}>
                                <TableCell>
                                    <input type="checkbox" name="" id="" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableCell>
                                <TableCell>{attendee.id}</TableCell>
                                <TableCell>
                                    <div className='flex flex-col gap-1'>
                                        <span className='font-semibold text-white'>{attendee.name}</span>
                                        <span>{attendee.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className='size-4 ' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </tbody>
                <tfoot>
                    <TableCell colSpan={3}>Mostrando {attendees.length} de {total.current} itens</TableCell>
                    <TableCell colSpan={3} className='text-right'>
                        <div className='inline-flex itens-center gap-8'>
                            <span>Página {page} de {totalPagesRef.current}</span>
                            <div className='flex gap-1.5'>
                                <IconButton onClick={goToFirstPage} disabled={page == 1}>
                                    <ChevronsLeft className='size-4 ' />
                                </IconButton>
                                <IconButton onClick={goToPreviousPage} disabled={page == 1}>
                                    <ChevronLeft className='size-4 ' />
                                </IconButton>
                                <IconButton onClick={goToNextPage} disabled={page == totalPagesRef.current}>
                                    <ChevronRight className='size-4 ' />
                                </IconButton>
                                <IconButton onClick={goToLastPage} disabled={page == totalPagesRef.current}>
                                    <ChevronsRight className='size-4 ' />
                                </IconButton>
                            </div>
                        </div>
                    </TableCell>
                </tfoot>
            </Table>
        </div>
    );
}