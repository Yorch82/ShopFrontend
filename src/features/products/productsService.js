import axios from "axios";

const API_URL = "http://localhost:8000";

const getAll = async () => {
    const res = await axios.get(API_URL + "/products");
    return res.data;
};
const getProductById = async id => {
    const res = await axios.get(API_URL + '/products/id/' + id);
    return res.data;   
};

const productsService = {
    getAll,
    getProductById
};

export default productsService;