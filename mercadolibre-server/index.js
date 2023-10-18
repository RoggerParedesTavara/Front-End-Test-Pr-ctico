const express = require('express');
const app = express();
const cors = require('cors')
const axios = require('axios');
const API = 'https://api.mercadolibre.com/';
const NAME = 'Rogger Aldair'
const LASTNAME = 'Paredes Tavara'

app.get("/", (req, res) => {
    res.send('ping');
});

app.use(cors({
    origin: 'http://127.0.0.1:5173',
    methods: ['GET']
}));

app.get("/items", async (req, res) => {
    const url = API + 'sites/MLA/search?q=' + req.query.search;
    try {
        const response = await axios.get(url);
        const items = getBody(response.data);
        res.json(items);    
    }
    catch (error) {
        res.status(500).json({ error: 'Error en la obtención de datos' });
    }
    
});

function getBody(data, oneItem = false) {
    const newFormat = getFormat();
    if (!data.error && !oneItem && data.results.length > 0) {
        let items = [];
        if (data.results.length > 0) {
            items = getItems(data.results, 0, 4)
        }
        let categories = [];
        if (data.available_filters.length > 0) {
            const category = data.filters.find(filter => filter.id === 'category')
            if (category) categories = category.values.map(value => value.name)
        }
        newFormat.categories = categories;
        newFormat.items = items;
    }
    return newFormat;
}

function getFormat() {
    return {
        author: {
            name: NAME,
            lastname: LASTNAME
        },
        categories: [],
        items: []
    }
}

function getItems(data, from, to) {
    return data.slice(from, to).map(result => {
        return getFormatItem(result)
    })
}

function getFormatItem(data) {
    return {
        id: data.id,
        title: data.title,
        price: {
            currency: data.currency_id,
            amount: data.price,
            decimals: data?.price,
        },
        picture: data.thumbnail,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
    }
}

app.get("/items/:id", async (req, res) => {
    try {
        const url = API + 'items/' + req.params.id;
        const items = await getItem(url, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
            }})
            res.json(items);  
        }
    catch (error) {
        res.status(500).json({ error: 'Error en la obtención de datos' });
    }
});

app.get("/items/:id/description", async (req, res) => {
    try {
        const url = API + 'items/' + req.params.id + '/description';
        const response = await axios.get(url);
        res.json({description: response.data.plain_text});
    }catch (error) {
        res.status(500).json({ error: 'Error en la obtención de datos' });
    }
});

async function getItem(url) {
    const response = await axios.get(url);
    const items = getFormat();
    items.items = getFormatItem(response.data);
    return items;
}

app.listen(5000, () => { console.log("Server started on port 5000") });