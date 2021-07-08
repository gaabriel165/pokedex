import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ChartSpecs from "./Chart";
import pokemonId from "../../../../../helpers/pokemonId";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const PokemonSpecs = ({ pokemon, open, setOpen, handleClose }) => {
  const classes = useStyles();

  React.useEffect(() => {
    axios.get("https://pokeapi.glitch.me/v1/pokemon/1");
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"lg"}
      className={classes.root}
    >
      <div className={classes.root}>
        <DialogTitle>
          <Box display="flex">
            <Typography variant="h5">
              {pokemonId(pokemon.id)} {pokemon.name.toUpperCase()}
            </Typography>
            {pokemon.types.map((types) => {
              return (
                <img
                  key={`${pokemon.id}_${types.type.name}`}
                  src={`/${types.type.name}.png`}
                  width="60px"
                  title={types.type.name}
                  style={{
                    marginLeft: "20px",
                  }}
                  alt="pokemon-type"
                />
              );
            })}
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" align="center" justifyContent="flex-start">
            <img
              width="300px"
              style={{ marginRight: "120px" }}
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
              alt="pokemon-img"
            />

            <Box style={{ marginRight: "-10px" }}>
              <ChartSpecs pokemon={pokemon} />
            </Box>
          </Box>
          {/* <Box
            display="block"
            align="flex-start"
            justifyContent="center"
            style={{ marginTop: "30px" }}
          >
            <Paper style={{ padding: "15px" }}></Paper>
          </Box> */}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PokemonSpecs;
