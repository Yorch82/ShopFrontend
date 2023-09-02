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

const ordersService = {
    getAll,
};

export default ordersService;