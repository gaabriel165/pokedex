import React from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import PokemonList from "./components/List";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "85px",
  },
  progress: {
    padding: theme.spacing(3),
    marginTop: '35px',
    display: "block",
    margin: "0 auto",
  },
}));

const List = () => {
  const classes = useStyles();

  const [pokemonsData, setPokemonsData] = React.useState([]);

  const [pageInfo, setPageInfo] = React.useState({
    url: "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
    more: true,
  });

  const getPokemons = async () => {
    const pokemons = [];

    await axios.get(pageInfo.url).then(async (response) => {
      setPageInfo({
        url: response.data.next,
        more: pokemonsData.length < 1118 ? true : false,
      });

      for (const pokemon of response.data.results) {
        await axios
          .get(pokemon.url)
          .then((response) => pokemons.push(response.data));
      }
    });

    setPokemonsData((prevState) => [...prevState, ...pokemons]);
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
          dataLength={pokemonsData.length}
          next={fetchMore}
          hasMore={pokemonsData.length < 1118 ? true : false}
          loader={
            <CircularProgress
              className={classes.progress}
              size={60}
              color="secondary"
            />
          }
          endMessage={<p>Fim da lista</p>}
          style={{ overflow: 'hidden' }}
        >
          <Grid container justify="center" xs={12} spacing={5}>
            {pokemonsData && pokemonsData.length
              ? pokemonsData.map((pokemon) => {
                  return <PokemonList pokemon={pokemon} />;
                })
              : null}
          </Grid>
        </InfiniteScroll>
      </Box>
    </div>
  );
};

export default List;
