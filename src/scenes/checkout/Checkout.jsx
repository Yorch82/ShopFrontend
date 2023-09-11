import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import Shipping from './Shipping';
import { colorTokens } from '../../theme';
import Payment from './Payment';
import { createOrder } from '../../features/orders/ordersSlice';
import env from "react-dotenv";

const user = JSON.parse(localStorage.getItem('user'));

const initialValues = {
    billingAddress: {
        name: "",
        surname: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: ""
    },
    shippingAddress: {
        isSameAddress: true,
        name: "",
        surname: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: ""
    },
    email: "",
    phoneNumber: ""
};

const checkoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            name: yup.string().required("required"),
            surname: yup.string().required("required"),
            country: yup.string().required("required"),
            street1: yup.string().required("required"),
            street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipCode: yup.string().required("required")
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            name: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            surname: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            country: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            street1: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            street2: yup.string(),
            city: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            state: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
            zipCode: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required")
            }),
        }),        
    }),
    yup.object().shape({
        email: yup.string().required("required"),
        phoneNumber: yup.string().required("required"),
    })
]

const Checkout = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector(state => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };
  async function makePayment(values) {
        const requestBody = {
            name: [values.billingAddress.name, values.billingAddress.surname].join(" "),
            email: values.email,
            products: cart.map(({id, count}) => ({
                id,
                count,
            }))
        };

        const response = await fetch(`${env.REACT_APP_API_URL}/orders/create-checkout-session`, {
            method: "POST",
            headers: {
                "authorization": user?.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        const session = await response.json();        
        window.location.href = session.url

        if(session) dispatch(createOrder(values));
  };

  return (
    <Box width='80%' m='100px auto'>
      <Stepper activeStep={activeStep} sx={{ m: '20px 0' }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display='flex' justifyContent='space-between' gap='50px'>
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    sx={{
                      backgroundColor: colorTokens.primary[200],
                      boxShadow: 'none',
                      color: 'white',
                      borderRadius: 0,
                      padding: '15px 40px',
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type='submit'
                  color='primary'
                  variant='contained'
                  sx={{
                    backgroundColor: colorTokens.primary[400],
                    boxShadow: 'none',
                    color: 'white',
                    borderRadius: 0,
                    padding: '15px 40px',
                  }}
                >
                  {!isSecondStep ? 'Next' : 'Place Order'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
