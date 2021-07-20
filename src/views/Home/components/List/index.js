import React from "react";
import { Grid, Box, CircularProgress, makeStyles } from "@material-ui/core";
import axios from "axios";
import PokeCard from "./components/PokeCard";
import InfiniteScroll from "react-infinite-scroll-component";
import getPokemonId from "../../../../helpers/getPokemonId";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "85px",
  },
  progress: {
    padding: theme.spacing(3),
    marginTop: "35px",
    display: "block",
    margin: "0 auto",
  },
}));

const List = () => {
  const classes = useStyles();

  const [pokemons, setPokemons] = React.useState({
    data: [],
    url: "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
    more: true,
  });

  const getPokemons = async () => {
    await axios.get(pokemons.url).then(async (response) => {
      const data = [];

      for (const pokemon of response.data.results) {
        data.push({ name: pokemon.name, id: getPokemonId(pokemon.url) });
      }

      setPokemons((prevState) => ({
        data: [...prevState.data, ...data],
        url: response.data.next,
        more: true,
      }));
    });
  };

  const fetchMore = () => {
    getPokemons();
  };

  React.useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className={classes.root}>
      <Box display="flex" align="center" justifyContent="center" m={1} p={1}>
        <InfiniteScroll
          dataLength={pokemons.data.length}
          next={fetchMore}
          hasMore={pokemons.data.length < 1118 ? true : false}
          loader={
            <CircularProgress
              className={classes.progress}
              size={60}
              color="secondary"
            />
          }
          endMessage={<p>Fim da lista</p>}
          style={{ overflow: "hidden" }}
        >
          <Grid container item justify="center" xs={12} spacing={5}>
            {pokemons.data && pokemons.data.length
              ? pokemons.data.map((pokemon) => {
                  return <PokeCard key={pokemon.id} pokemon={pokemon} />;
                })
              : null}
          </Grid>
        </InfiniteScroll>
      </Box>
    </div>
  );
};

export default List;
