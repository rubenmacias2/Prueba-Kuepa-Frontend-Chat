import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFount404 from '../../sources/img/404.gif';
import Box from '@mui/material/Box';

const NotFount = ({component}) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false); 
  useEffect(() => {
    setAuth(localStorage.getItem('Authenticated'));
    console.log(auth);

    if (auth !== 'true') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 50000); 

      return () => clearTimeout(timer);
    }
  }, [auth, navigate]);
  
return <>
 {auth!=='true'?
 <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        color: 'white' 
}}>
  <h2>Recurso no encotrado</h2>
  <Box><img src={NotFount404} alt="404 Not Found" style={{ maxWidth: '40%', height: 'auto' }} /></Box>
  
</Box>
 :
 component
 }
</>
};

export default NotFount;