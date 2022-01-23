import React from 'react';
import Box from '@mui/material/Box';

export default function BoxSx(props) {
  return (
    <Box
      sx={{
        width:'80vw',
        minHeight: '40vh',
        maxWidth: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3,
        bgcolor: (theme) => ('#fff'),
          p: 1,
          m: 1,
          borderRadius: 2,
          textAlign: 'center',
      }}
    >
        {props.element}
    </Box>
  );
}

// import React from 'react';
// import Box from '@mui/material/Box';

// export default function BoxSx(props) {
//   return (
//     <Box
//       sx={{
//         width:700,
//         minHeight: '40vh',
//         maxWidth: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         boxShadow: 3,
//         bgcolor: (theme) => ('#fff'),
//           p: 1,
//           m: 1,
//           borderRadius: 2,
//           textAlign: 'center',
//       }}
//     >
//         {props.element}
//     </Box>
//   );
// }