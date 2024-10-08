import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChatStream from "../ChatStream/ChatStream";

const ConteStream = () => {
  return (
    <>
      <Box
        sx={{
          margin: 2,
          padding: 2,
          borderRadius: 2,
          border: "2px solid #007FFF",
          cursor: "pointer",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Aprende Node.js y Express - Curso desde Cero
        </Typography>

        <Box
          sx={{
            margin: 2,
            padding: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "row",
            gap: 2,
            "@media (max-width: 768px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              flex: "1 1 70%",
              "@media (max-width: 768px)": {
                flex: "1 1 auto",
              },
            }}
          >
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/1hpc70_OoAg?start=16607"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
          <Box
            sx={{
              flex: "1 1 30%",
              "@media (max-width: 768px)": {
                flex: "1 1 auto",
              },
            }}
          >
            <ChatStream />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ConteStream;
