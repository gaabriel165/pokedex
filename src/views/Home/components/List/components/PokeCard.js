import React from "react";
import { Grid, Paper, Box, Typography, makeStyles } from "@material-ui/core";
import PokeSpecs from "./PokeSpecs";
import pokemonId from "../../../../../helpers/pokemonId";
import pokemonName from "../../../../../helpers/pokemonName";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    height: "250px",
    marginTop: "15px",
    "&:hover": {
      cursor: "pointer",
      "& > img": {
        width: "190px",
      },
    },
  },
}));

const PokeCard = ({ pokemon }) => {
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
          <Typography variant="h6" style={{ marginTop: '20px' }}>{pokemonId(pokemon.id)}</Typography>
          <Typography style={{ marginTop: "5px" }} variant="h5">
            {pokemonName(pokemon.name)}
          </Typography>
        </Paper>
      </Grid>

      {open ? (
        <PokeSpecs
          pokemon={pokemon}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default PokeCard;
