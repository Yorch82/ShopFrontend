import { Box, Typography } from '@mui/material';
import { getAll, resetOrder } from '../../features/orders/ordersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Order from './Order';
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  const getOrdersAndReset = async () => {
    await dispatch(getAll());
    dispatch(resetOrder());
  };

  useEffect(() => {
    getOrdersAndReset();
    // eslint-disable-next-line
  }, []);

  const order = orders.map((order, i) => <Order key={i} order={order} />);

  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant='h3' textAlign='center'>
        Your <b>Orders</b>
      </Typography>
      <Box
        margin='15px 0 15px 0'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        {order}
      </Box>
    </Box>
  );
};

export default Orders;
