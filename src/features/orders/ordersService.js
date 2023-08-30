import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));

const API_URL = "http://localhost:8000";

const getAll = async () => {
    const res = await axios.get(API_URL + "/orders", {
        headers: {
            authorization: user?.token,
          },
    });
    return res.data;
};

const ordersService = {
    getAll,
};

export default ordersService;