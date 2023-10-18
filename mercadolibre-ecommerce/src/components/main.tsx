import { useContext } from 'react';
import { ListProducts, WithOutProducts } from "./Products";
import { SearchContext } from "../hooks/searchHook";
import { ResponseFilter } from "../interfaces/search-box.interface";

interface SearchContextInterface {
    products: ResponseFilter,
}

export function Main() {
    const {products}: SearchContextInterface = useContext(SearchContext);
    return (<>
        {(products?.items?.length>0)?<ListProducts></ListProducts>
        :<WithOutProducts></WithOutProducts>}
    </>)
}