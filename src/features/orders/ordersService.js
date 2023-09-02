import axios from "axios";
import env from "react-dotenv";

const user = JSON.parse(localStorage.getItem('user'));

const getAll = async () => {
    const res = await axios.get(env.REACT_APP_API_URL + "/orders", {
        headers: {
            Authorization: user?.token,
          },
    });
    return res.data;
};

const createOrder = async(order) => {
    const res = await axios.post(env.REACT_APP_API_URL + "/orders", order, {
        headers: {
            Authorization: user?.token,
          },
    });
    return res.data;
}

const ordersService = {
    getAll,
    createOrder
};

export default ordersService;