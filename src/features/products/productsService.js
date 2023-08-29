import axios from "axios";

const API_URL = "http://localhost:8000";

const getAll = async () => {
    const res = await axios.get(API_URL + "/products");
    return res.data;
};

const productsService = {
    getAll,
};

export default productsService;