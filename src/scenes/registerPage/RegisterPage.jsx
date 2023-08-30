import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import Dropzone from 'react-dropzone';
import FlexBetween from '../../components/FlexBetween';
import InstantMessage from '../../components/InstantMessage';

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const registerSchema = yup.object().shape({
  name: yup.string().required('required'),
  surname: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  // password: yup.string().min(5).matches(passwordRules, { message: "Por favor crea una contraseña más robusta" }).required('Obligatorio'),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('required'),
});

const initialValuesRegister = {
  name: '',
  surname: '',
  email: '',
  password: '',
  password2: '',
};

const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const { isError, isSuccess, message } = useSelector(state => state.auth);
  const [error, setError] = useState(false); //Controls Alert
  const [errorMessage, setMessage] = useState(''); //Controls Message
  const [severity, setSeverity] = useState('');
  
  const registerUser = async (values, onSubmitProps) => {

    const savedUser = await dispatch(register(values));
    onSubmitProps.resetForm();

    if (savedUser) {
      navigate('/loginpage');
    }
  };

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
    await registerUser(values, onSubmitProps);
  };
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p='2rem'
        m='2rem auto'
        borderRadius='1.5rem'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          Welcome!
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
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
                <>
                  <TextField
                    label='Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='name'
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    label='Surname'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='surname'
                    error={Boolean(touched.surname) && Boolean(errors.surname)}
                    helperText={touched.surname && errors.surname}
                    sx={{ gridColumn: 'span 2' }}
                  />
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
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    label='Repeat Password'
                    type='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='password2'
                    error={
                      Boolean(touched.password2) && Boolean(errors.password2)
                    }
                    helperText={touched.password2 && errors.password2}
                    sx={{ gridColumn: 'span 4' }}
                  />
                </>
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
                  REGISTER
                </Button>
                <Typography
                  onClick={() => {
                    navigate('/loginpage');
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
                  Already have an account? Login here
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterPage;
