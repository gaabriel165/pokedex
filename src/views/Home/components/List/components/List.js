import React from "react";
import { Grid, Paper, Box, Typography, makeStyles } from "@material-ui/core";
import PokemonSpecs from "./PokemonSpecs";
import pokemonId from "../../../../../helpers/pokemonId";
import pokemonName from "../../../../../helpers/pokemonName";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    height: "280px",
    marginTop: "15px",
    "&:hover": {
      cursor: "pointer",
      "& > img": {
        width: "190px",
      },
    },
  },
}));

const PokemonList = ({ pokemon }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid align="center" item lg={3} md={4} sm={6}>
        <Paper className={classes.paper} elevation={3} onClick={handleOpen}>
          <img
            width="180px"
            style={{ display: "block", margin: "0 auto" }}
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt="pokemon-img"
          />
          <Typography variant="h6">{pokemonId(pokemon.id)}</Typography>
          <Typography style={{ marginTop: "15px" }} variant="h5">
            {pokemonName(pokemon.name)}
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            style={{ marginTop: "10px" }}
          >
            {pokemon.types.map((types) => {
              return (
                <img
                  key={`${pokemon.id}_${types.type.name}`}
                  src={`/${types.type.name}.png`}
                  width="60px"
                  title={types.type.name}
                  style={{
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                  alt="pokemon-type"
                />
              );
            })}
          </Box>
        </Paper>
      </Grid>

      {open ? (
        <PokemonSpecs
          pokemon={pokemon}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default PokemonList;
