import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Box,
  Fab,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import { Edit, EditOutlined } from '@mui/icons-material';
import { updateUser, reset } from '../../features/auth/authSlice';
import Dropzone from 'react-dropzone';
import FlexBetween from '../../components/FlexBetween';
import { Formik } from 'formik';
import * as yup from 'yup';

const initialValuesUpdate = {
  avatar: '',
};

const updateSchema = yup.object().shape({
  avatar: yup.string().required('required'),
});

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { palette } = useTheme();

  const updatedUser = async (values, onSubmitProps) => {
    dispatch(updateUser(values));
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await updatedUser(values, onSubmitProps);
    handleClose();
  };

  useEffect(() => {
    dispatch(reset());
    // eslint-disable-next-line
  }, []);

  const fullName = `${user.user.name} ${user.user.surname}`;

  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box
        padding='1.5rem 1.5rem 0.75rem 1.5rem'
        backgroundColor={palette.background.alt}
        borderRadius='0.75rem'
        mt='5rem'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='60%'
      >
        <Box>
          <img
            alt={fullName}
            width='300px'
            height='280px'
            src={`http://localhost:8000/${user.user.image_path}`}
            position='relative'
          />
          <Fab
            color={palette.primary.light}
            aria-label='edit'
            onClick={handleOpen}
            sx={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
            size='small'
          >
            <Edit />
          </Fab>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Update your photo!
              </Typography>
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesUpdate}
                validationSchema={updateSchema}
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
                        '& > div': {
                          gridColumn: isNonMobile ? undefined : 'span 4',
                        },
                      }}
                    >
                      <Dropzone
                        acceptedFiles='.jpg,.jpeg,.png'
                        multiple={false}
                        onDrop={acceptedFiles =>
                          setFieldValue('avatar', acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p='1rem'
                            sx={{ '&:hover': { cursor: 'pointer' } }}
                          >
                            <input {...getInputProps()} />
                            {!values.avatar ? (
                              <p>Add your profile photo here!</p>
                            ) : (
                              <FlexBetween>
                                <Typography>{values.avatar.name}</Typography>
                                <EditOutlined />
                              </FlexBetween>
                            )}
                          </Box>
                        )}
                      </Dropzone>
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
                        UPDATE
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Modal>
        </Box>

        <Box>
          <Typography>Name: {fullName}</Typography>
          <Typography>Email: {user.user.email}</Typography>
          <Typography>Role: {user.user.role}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
