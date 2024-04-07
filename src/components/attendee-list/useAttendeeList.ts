import { ChangeEvent, useState } from "react";
import { attendees } from "../../data/attendee";

function useAttendeeList() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const attendee = attendees.slice((page - 1) * 10, page * 10);
    const totalPages = Math.ceil(attendees.length / 10);
    function onSearchChanged(event:ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }
    function goToFirstPage() {
        setPage(1);
      }
    
      function goToPreviousPage() {
        setPage(page - 1);
      }
    
      function goToNextPage() {
        setPage(page + 1);
      }
      function goToLastPage() {
        setPage(totalPages);
      }
    return { search, onSearchChanged, page,
         goToFirstPage, goToNextPage,
         goToPreviousPage, attendee, goToLastPage, totalPages }
}


export default useAttendeeList;