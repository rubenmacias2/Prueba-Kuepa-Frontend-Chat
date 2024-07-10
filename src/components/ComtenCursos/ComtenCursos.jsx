import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import TvIcon from '@mui/icons-material/Tv';
import ChatIcon from '@mui/icons-material/Chat';
import PermCameraMicIcon from '@mui/icons-material/PermCameraMic';

const ComtenCursos = () => {
  const navigate = useNavigate();
  return <div>
    <Box sx={{margin: 2}}>
      <Typography variant='h5' sx={{color: '#87B3DF'}}>
        Cursos
      </Typography>
      <Box 
        onClick={()=>{navigate('/streamCourse')}}
        sx={{
        margin:2,
        padding:2,
        borderRadius: 2,
        border: '2px solid #007FFF',
        cursor: 'pointer',
        transition: 'background-color 0.5s ease',
          '&:hover': {
            backgroundColor: '#1976D2',
          }
        }}>
        <Typography variant='h6' sx={{color: 'white'}}>
          Aprende Node.js y Express - Curso desde Cero
        </Typography>
        <Typography variant='p' sx={{color:'#B8BCC1'}}>
          Aprende los fundamentos de Node.js y Express paso a paso en este curso de 8.5 horas desde cero. Practica con un proyecto práctico y ejemplos. El curso incluye los conceptos básicos de desarrollo web back-end, JavaScript asíncrono, npm, módulos de Node.js, JSON, HTTP y mucho más. 
        </Typography>
        <Box sx={{ color:'white' ,display: 'flex',  justifyContent: 'flex-end', gap: 1, mt: 1 }}>
          <VideoCallIcon />
          <TvIcon />
          <ChatIcon />
          <PermCameraMicIcon />
        </Box>
      </Box>
    </Box>
  </div>;
};
export default ComtenCursos;