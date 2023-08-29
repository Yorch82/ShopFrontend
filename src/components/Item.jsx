import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import { shades } from "../theme";
//import { addToCart } from "../state";
import { useNavigate } from 'react-router-dom';

const Item = ({ id, product, price, image_path, sectionId, categoryId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box>
      <Box
        position='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={product}
          width='300px'
          height='300px'
          src={`http://localhost:8000/${image_path}`}
          onClick={() => navigate(`/product/${id}`)}
          style={{ cursor: 'pointer' }}
        />
        <Box
          display={isHovered ? 'block' : 'none'}
          position='absolute'
          bottom='10%'
          left='0'
          width='100%'
          padding='0 5%'
        >
          <Box display='flex' justifyContent='space-between'>
            <Box
              display='flex'
              alignItems='center'
              backgroundColor='#ffffff'
              borderRadius='3px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color='#ffffff'>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              //   onClick={() => {
              //     dispatch(addToCart({ product: { ...product, count } }));
              //   }}
              sx={{ backgroundColor: '#ffffff', color: 'white' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt='3px'>
        <Typography variant='subtitle2' color={neutral.dark}>
        </Typography>
        <Typography>{product}</Typography>
        <Typography fontWeight='bold'>{price} €</Typography>
      </Box>
    </Box>
  );
};

export default Item;
