import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from "@mui/material";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://gsmd.336699bet.com/getGameList.ashx?operatorcode=dcmm&providercode=GP&lang=en&html=0&reformatjson=yes&signature=F92ED5A3066B4AB6BFF54970D135D1AE") // Replace with your API URL
      .then((response) => {
        if (response.data.errCode === "0") {
          setGames(JSON.parse(response.data.gamelist));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Game List
      </Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.g_code}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="140" image={game.imgFileName} alt={game.gameName.gameName_enus} />
              <CardContent>
                <Typography variant="h6">{game.gameName.gameName_enus}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {game.g_type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GameList;
