import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Attendee } from "../../model/ateendee";
import { URL } from "url";

async function getAllAttendees(pageIndex: number, pageSize: number, filter:string) {
  const response = await fetch(`https://localhost:44397/api/attendees/FD08DB50-E30C-47BA-8B2C-123BB6F16928?pageIndex=${pageIndex}&pageSize=${pageSize}&nameFilter=${filter}`);
  const data = await response.json();
  return data;
}

function useAttendeeList() {
    const [page, setPage] = useState(()=> {
      const url = new URL(window.location.toString());

      if(url.searchParams.has('page'))
        return Number(url.searchParams.get('page'));
       return 1;
    });
    const totalPagesRef = useRef(0);
    const total = useRef(0);
    const [search, setSearch] = useState(()=> {
      const url = new URL(window.location.toString());

      if(url.searchParams.has('search')) 
        return url.searchParams.get('search') ?? '';
      return '';
    });
 
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    useEffect(()=> {
      getAllAttendees(page - 1, 10,search).then(data => {
        setAttendees([ ...data.attendees]);
        totalPagesRef.current  =  data.totalPages;
        total.current = data.itensCount;
      });
    },[page,search])
    
    function onSearchChanged(event:ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value);
        setCurrentPage(1);
    }
    function goToFirstPage() {
       setCurrentPage(1);
    }
    
      function goToPreviousPage() {
        setCurrentPage(page - 1);
      }
      
      function goToNextPage() {
        setCurrentPage(page + 1);
      }

      function goToLastPage() {
        setCurrentPage(totalPagesRef.current);
      }
      function setCurrentSearch(search:string) {
        const url = new URL(window.location.toString());
        
        url.searchParams.set('search', search);
        window.history.pushState({}, '', url);
        setSearch(search);
      }
      function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());
        
        url.searchParams.set('page', String(page));
        window.history.pushState({}, '', url);
        setPage(page);
      }
    return { search, onSearchChanged, page,
         goToFirstPage, goToNextPage,
         goToPreviousPage, attendees, goToLastPage, totalPagesRef,total}
}


export default useAttendeeList;