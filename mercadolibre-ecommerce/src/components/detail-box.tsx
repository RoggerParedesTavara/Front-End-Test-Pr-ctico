import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { environmets } from "../evironmets/environmets";
import { ResponseItem } from "../interfaces/search-box.interface";
import './detail-box.sass'
import { Error } from "./Error";

export function DetailBox() {
    const [product, setProduct] = useState<ResponseItem>({} as ResponseItem);
    const [error, seterror] = useState(null);
    const [description, setdescription] = useState('');
    const idProduct = useParams().id;

    useEffect(() => {
        const urlItem = environmets.api + 'items/' + idProduct;
        const urlItemDescription = environmets.api + 'items/' + idProduct + '/description';
        Promise.all([
            fetch(urlItem).then((response) => response.json()),
            fetch(urlItemDescription).then((response) => response.json()),
        ])
            .then((results) => {
                if(results[0].error || results[1].error) {
                    seterror(results[0].error);
                    return;
                }
                setProduct(results[0]);
                setdescription(results[1].description);
            })
            .catch((error) => {
                seterror(error);
            });
    }, [idProduct])

    return (<>
        {(product === null || error) && (
            <div className="content">
                <Error props={'Producto no encontrado'} />
            </div>
        )}
        {product !== null && product.items && (
            <div className="content">
                <div className="card">
                    <section className="sectionDetail">
                        <div className="contentImage">
                            <img src={product.items.picture} />
                            <section className="descriptionSection">
                                <p className="labelDescription">Descripcion de Producto</p>
                                {description !== '' && <p className="description">{description}</p>}
                                {description === '' && <p className="description">No hay una descripción del producto</p>}
                            </section>
                        </div>
                        <div className="contentBuyOption">
                            <p className="labelDescription">
                                {product.items.condition.toUpperCase()}
                            </p>
                            <p className="labelDescription">
                                {product.items.title}
                            </p>
                            <p className="price">
                                {product.items.price.currency} {product.items.price.amount}
                            </p>
                            <button>Comprar</button>
                        </div>
                    </section>
                </div>
            </div>
        )}
    </>

    )
}