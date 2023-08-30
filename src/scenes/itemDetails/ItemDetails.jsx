import { Box, Button, IconButton, Rating, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Item from '../../components/Item';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { colorTokens } from '../../theme';
import { addToCart } from '../../features/cart/index';
import { useDispatch, useSelector } from 'react-redux';
import { getById, getAll, reset } from '../../features/products/productsSlice';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const { product, products } = useSelector(state => state.products);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProduct = async productId => {
    await dispatch(getById(productId));
    dispatch(reset());
  };

  const getProductsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };

  useEffect(() => {
    getProduct(productId);
    getProductsAndReset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* IMAGES */}
        <Box flex='1 1 40%' mb='40px'>
          <img
            alt={product.product}
            width='100%'
            height='100%'
            src={`http://localhost:8000/${product?.image_path}`}
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m='65px 0 25px 0'>
            <Typography variant='h3'>{product?.name}</Typography>
            <Typography>{product?.price} €</Typography>
          </Box>

          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              border={`1.5px solid ${colorTokens.primary[300]}`}
              mr='20px'
              p='2px 5px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
              }}
              onClick={() =>
                dispatch(addToCart({ product: { ...product, count } }))
              }
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m='20px 0 5px 0' display='flex'>
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {product?.Category?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m='20px 0'>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='DESCRIPTION' value='description' />
          <Tab label='REVIEWS' value='reviews' />
        </Tabs>
      </Box>
      <Box display='flex' flexWrap='wrap' gap='15px'>
        {value === 'description' && (
          <div>{product?.description}</div>
        )}
        {value === 'reviews' &&
          product.Reviews.map(({ id, review, rating }) => (
            <Box id={id} display="flex" justifyContent="space-between">                
              <Rating                
                value={rating}                
              />
              <Typography ml="10px">{review}</Typography>
            </Box>
          ))}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt='50px' width='100%'>
        <Typography variant='h3' fontWeight='bold'>
          Related Products
        </Typography>
        <Box
          mt='20px'
          display='flex'
          flexWrap='wrap'
          columnGap='1.33%'
          justifyContent='space-between'
        >
          {products.slice(0, 4).map(({ id, product, price, image_path, sectionId, categoryId }) => (
            <Item
            key={id}
            id={id}
            product={product}
            price={price}
            image_path={image_path}
            sectionId={sectionId}
            categoryId={categoryId}
          />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
