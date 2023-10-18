import React, { createContext } from "react";
import { ResponseFilter } from "../interfaces/search-box.interface";
import { useProducts } from "./useProducts";

export interface SearchContextInterface {
    searchInput: string,
    products: ResponseFilter,
    setSearchInput: (input: string) => void
}

interface Props {
    children: React.ReactNode
}

export const SearchContext = createContext({} as SearchContextInterface);
export function SearchProvider({ children }: Props) {

    const {products, fetchProducts} = useProducts();
    const setSearchInput = (input: string) => {
        if(input === '') return;
        fetchProducts(input)
    }

    const initialValue: SearchContextInterface = {
        searchInput: '',
        products: products,
        setSearchInput: setSearchInput
    }
    
    return (
        <SearchContext.Provider value={initialValue}>
            {children}
        </SearchContext.Provider>
    )
}