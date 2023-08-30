import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InstantMessage = ({message, errorType}) =>  {
    console.log(message)
    console.log(errorType)

        const [open, setOpen] = useState(true); 
        //Leave this true since we are not using a button
    
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);
          };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={errorType}>{message}</Alert>
      </Snackbar>
    )
}

export default InstantMessage