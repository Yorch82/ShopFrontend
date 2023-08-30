import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const Order = ({ order }) => {
  console.log(order);
  const data = order.Order_Products.map((d, i) => ({
    key: i,
    name: d.Product?.product,
    quantity: d.quantity,
    price: d.price + '€',
    subtotal: d.price * d.quantity + '€',
  }));

  const total = data.reduce((acc, cur) => acc + parseFloat(cur.subtotal), 0);
  const date = new Date(order.date).toLocaleString();

  return (
    <>
      <Typography>Order Number: {order.order_num}</Typography>
      <Typography>Date: {date}</Typography>
      <TableContainer component={Paper} mb='10px'>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align='right'>Units</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.quantity}</TableCell>
                <TableCell align='right'>{row.price}</TableCell>
                <TableCell align='right'>{row.subtotal}</TableCell>      
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Total: {total} €</Typography>
      <Divider />
    </>
  );
};

export default Order;
