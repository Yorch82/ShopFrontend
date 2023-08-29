import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, reset } from '../../features/products/productsSlice';
import Item from '../../components/Item';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const products = useSelector(state => state.products.products);
  const breakPoint = useMediaQuery('(min-width:600px)');
  const [value, setValue] = useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getProductsAndReset = async () => {
    await dispatch(getAll());
    dispatch(reset());
  };
  useEffect(() => {
    getProductsAndReset();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <HourglassBottomIcon />;
  }

  const premium = products.filter(product => product.categoryId === 1);
  const medium = products.filter(product => product.categoryId === 2);
  const lowcost = products.filter(product => product.categoryId === 3);
  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant='h3' textAlign='center'>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label='ALL' value='all' />
        <Tab label='PREMIUM' value='premium' />
        <Tab label='MEDIUM' value='medium' />
        <Tab label='LOW COST' value='lowcost' />
      </Tabs>
      <Box
        margin='0 auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 300px)'
        justifyContent='space-around'
        rowGap='20px'
        columnGap='1.33%'
      >
        {value === 'all' &&
          products.map(
            ({ id, product, price, image_path, sectionId, categoryId }) => (
              <Item
                key={id}
                id={id}
                product={product}
                price={price}
                image_path={image_path}
                sectionId={sectionId}
                categoryId={categoryId}
              />
            )
          )}
        {value === 'premium' &&
          premium.map(
            ({ id, product, price, image_path, sectionId, categoryId }) => (
              <Item
                key={id}
                id={id}
                product={product}
                price={price}
                image_path={image_path}
                sectionId={sectionId}
                categoryId={categoryId}
              />
            )
          )}
        {value === 'medium' &&
          medium.map(
            ({ id, product, price, image_path, sectionId, categoryId }) => (
              <Item
                key={id}
                id={id}
                product={product}
                price={price}
                image_path={image_path}
                sectionId={sectionId}
                categoryId={categoryId}
              />
            )
          )}
        {value === 'lowcost' &&
          lowcost.map(
            ({ id, product, price, image_path, sectionId, categoryId }) => (
              <Item
                key={id}
                id={id}
                product={product}
                price={price}
                image_path={image_path}
                sectionId={sectionId}
                categoryId={categoryId}
              />
            )
          )}
      </Box>
    </Box>
  );
};

export default ShoppingList;
