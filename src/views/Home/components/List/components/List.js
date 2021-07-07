import React from "react";
import { Grid, Paper, Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    height: "280px",
    marginTop: '15px'
  },
}));

const PokemonList = ({ pokemon }) => {
  const classes = useStyles();
  return (
    <>
      <Grid justify="center" align="center" item lg={3} md={4} sm={6} xs={12}>
        <Paper className={classes.paper} elevation={3}>
          <img
            width="180px"
            style={{ display: "block", margin: "0 auto" }}
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
          />

          <Typography variant="h6" style={{ marginTop: "10px" }}>
            #
            {pokemon.id < 10
              ? `00${pokemon.id}`
              : pokemon.id < 100
              ? `0${pokemon.id}`
              : pokemon.id}
          </Typography>
          <Typography style={{ marginTop: "15px" }} variant="h5">
            {pokemon.name
              .charAt(0)
              .toUpperCase()
              .concat(pokemon.name.replace(pokemon.name.charAt(0), ""))}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginTop: "10px" }}
          >
            {pokemon.types.map((types) => {
              return (
                <img
                  src={`/${types.type.name}.png`}
                  width="60px"
                  title={types.type.name}
                  style={{
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                />
              );
            })}
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

export default PokemonList;
