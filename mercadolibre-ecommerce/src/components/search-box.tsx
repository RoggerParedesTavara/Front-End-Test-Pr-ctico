import { useContext } from 'react'
import { SearchContext } from '../hooks/searchHook';
import './search-box.sass'
import { useNavigate } from "react-router-dom";


export function SearchBox() {
    const { setSearchInput } = useContext(SearchContext);
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const searchInput = form.get('searchInput')?.toString()||'';
        setSearchInput(searchInput);
        navigate("/");
    }

    return(
        <section className='searchBox'>
            <img src='/src/assets/MELI.svg' alt='MELI logo'></img>
            <form onSubmit={handleSubmit}>
                <input placeholder="Buscar productos, marcas y mas..." name='searchInput'></input>
                <button type='submit'> &#x1F50E;&#xFE0E; </button>
            </form>
        </section>
    )
} 