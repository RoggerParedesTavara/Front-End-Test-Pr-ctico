import { environmets } from '../evironmets/environmets';
import { ResponseFilter } from '../interfaces/search-box.interface';
import { useState } from 'react';

export function useProducts() {
    const [products, setproducts] = useState<ResponseFilter>({} as ResponseFilter);

    const fetchProducts = (searchInput: string) => {
        if (searchInput === '') return;
        const url = environmets.api + 'items?search=' + searchInput;
        fetch(url)
            .then(res => res.json())
            .then(res => { setproducts(res) })
    }

    return { products, fetchProducts };
}