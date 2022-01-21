import * as React from 'react';
import { useEffect }from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.setOpen(false);
  };

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
  }, [open]);

  return (
    <Stack sx={{ width: '100%' }} >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity}  sx={{ width: '100%' }} >
            {props.message}
        </Alert>
        </Snackbar>
    </Stack>
  );
}