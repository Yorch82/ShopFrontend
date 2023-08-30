import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import InstantMessage from '../../components/InstantMessage';

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { isError, isSuccess, message } = useSelector(state => state.auth);
  const [error, setError] = useState(false); //Controls Alert
  const [errorMessage, setMessage] = useState(''); //Controls Message
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    if (isError) {
      setMessage(`${message}`);
      setSeverity('error');
      setError(true);
    }
    if (isSuccess) {
      setMessage('Bienvenid@');
      setSeverity('success');
      setError(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
    setTimeout(() => {
      setError(false);
    }, 2000);
    dispatch(reset());
    // eslint-disable-next-line
  }, [isError, isSuccess, message]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    await dispatch(login(values));    
  };


  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome!
        </Typography>
        <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            
            <TextField
                  label='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: 'span 4' }}
                /> 
            <TextField
              label='Password'
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name='password'
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
            
            {error ? (
              <InstantMessage message={errorMessage} errorType={severity} />
            ) : (
              ``
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            <Typography
              onClick={() => {
                navigate('/register');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: palette.primary.light,
                },
              }}
            >         
              Don't have an account? Sign Up here.                
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;