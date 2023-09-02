import axios from "axios";
import env from "react-dotenv";

const getAll = async () => {
    const res = await axios.get(env.REACT_APP_API_URL + "/products");
    return res.data;
};
const getProductById = async id => {
    const res = await axios.get(env.REACT_APP_API_URL + '/products/id/' + id);
    return res.data;   
};

const productsService = {
    getAll,
    getProductById
};

export default productsService;