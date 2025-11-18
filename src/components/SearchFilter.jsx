import { useRef } from "react";
import "../Styles/SearchFilter.css"

export default function SearchFilter ({ setSearch }) {
    const inputRef = useRef();

    const handleChange = () => {
        setSearch(inputRef.current.value)
    }

    return(
        <div className="search-filter">
            <input type="text" ref={inputRef} placeholder="Buscar Tareas"/>
            <button onClick={handleChange}>Filtrar</button>
        </div>
    )
}