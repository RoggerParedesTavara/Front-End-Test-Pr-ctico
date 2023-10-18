import { useContext } from "react"
import { Link } from "react-router-dom"
import './main.sass'
import { SearchContext, SearchContextInterface } from "../hooks/searchHook"
import { Error } from "./Error";

export function ListProducts() {
    const { products }: SearchContextInterface = useContext(SearchContext);

    return (
        <main className="firstMain">
            <div className="categories">
                {products.categories.map(category => (
                    <p key={category}>{category} |</p>
                ))}
            </div>
            <div className="divContent">
                {products.items.map(product => (
                    <div key={product.id} className="cardProduct">
                        <Link to={`/items/${product.id}`}><img src={product.picture} alt="url-producto" /></Link>
                        <div className="detail">
                            <p className="price">{product.price.currency} {product.price.amount},{product.price.decimals}</p>
                            <Link to={`/items/${product.id}`}><p>{product.title}</p></Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}


export function WithOutProducts() {
    return (
        <div className="withOutProducts">
            <Error props={'No ha busquedas encontradas'} />
        </div>
    )
}