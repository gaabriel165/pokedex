import React from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  Tabs,
  Tab,
  Paper,
  Divider,
  useTheme,
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
  tabs: {
    marginLeft: "130px",
  },
  stats: {
    width: "500px",
    "& > *": {
      marginTop: "10px",
      marginBottom: "40px",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box display="block" p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PokeSpecs = ({ pokemon, open, setOpen, handleClose }) => {
  const classes = useStyles();

  const [valueTab, setValueTab] = React.useState(0);

  const handleChangeTab = (event, value) => {
    setValueTab(value);
  };

  const theme = useTheme();

  const screenExtraLarge = useMediaQuery(theme.breakpoints.only("xl"));
  const screenLarge = useMediaQuery(theme.breakpoints.only("lg"));
  const screenMedium = useMediaQuery(theme.breakpoints.only("md"));
  const screenSmall = useMediaQuery(theme.breakpoints.only("sm"));
  const screenExtraSmall = useMediaQuery(theme.breakpoints.only("xs"));
  const screenNarrow = useMediaQuery("(max-width:340px)");

  const getScreenWidth = () => {
    if (screenExtraLarge) {
      return 6;
    } else if (screenNarrow) {
      return 1;
    } else if (screenLarge) {
      return 5;
    } else if (screenMedium) {
      return 4;
    } else if (screenSmall) {
      return 3;
    } else if (screenExtraSmall) {
      return 2;
    } else {
      return 3;
    }
  };

  //console.log(getScreenWidth());

  const [pokemonInfo, setPokemonInfo] = React.useState();
  const [pokemonStats, setPokemonStats] = React.useState();

  const getPokeStats = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`)
      .then((response) => setPokemonStats(response.data));
  };

  const getPokeInfo = async () => {
    await axios
      .get(`https://nocorsapp.herokuapp.com/pokeapi/v1/pokemon/${pokemon.id}`)
      .then(async (response) => {
        const result = response.data[0];

        const pokemons = [];

        for (const pokemonName of response.data[0].family.evolutionLine) {
          await axios
            .get(
              `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
            )
            .then((response) => {
              pokemons.push({ name: pokemonName, id: response.data.id });
              return (result.family.evolutionLine = pokemons);
            });
        }
        return setPokemonInfo(result);
      });
  };

  React.useEffect(() => {
    getPokeInfo();
    getPokeStats();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"lg"}
      className={classes.root}
    >
      <DialogTitle>
        <Box display="flex">
          <Typography variant="h5">
            {pokemonId(pokemon.id)} {pokemon.name.toUpperCase()}
          </Typography>
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
        <Box display="block" justifyContent="center">
          <Box display="flex" justifyContent="center">
            <img
              width="310px"
              height="340px"
              src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
              alt="pokemon-img"
              style={{ marginLeft: "40px", marginTop: "40px" }}
            />

            <Box
              display="block"
              className={classes.tabs}
              style={{ height: "400px" }}
            >
              <Tabs
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                value={valueTab}
                onChange={handleChangeTab}
                aria-label="full width tabs example"
              >
                <Tab label="Geral" />
                <Tab label="Caracteristicas" />
                {getScreenWidth() <= 3 ? <Tab label="Evoluções" /> : null}
              </Tabs>
              <TabPanel value={valueTab} index={0}>
                <Box className={classes.stats}>
                  {pokemonInfo && (
                    <>
                      <Typography variant="h4">
                        Height: {pokemonStats.height / 10} m
                      </Typography>
                      <Typography variant="h4">
                        Weight: {pokemonStats.weight / 10} kg
                      </Typography>
                      <Typography variant="h4">
                        Gen: {pokemonInfo.gen}
                      </Typography>
                      <Box display="flex">
                        {pokemonInfo.types.map((type) => {
                          return (
                            <img
                              style={{
                                marginRight: "10px",
                              }}
                              width="90px"
                              src={`${type.toLowerCase()}.png`}
                            />
                          );
                        })}
                      </Box>
                    </>
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                {pokemonStats &&
                  pokemonStats.stats &&
                  pokemonStats.stats.length && (
                    <ChartSpecs stats={pokemonStats.stats} />
                  )}
              </TabPanel>
            </Box>
          </Box>

          <Divider style={{ marginTop: "15px" }} />

          <Box
            display="flex"
            align="center"
            justifyContent="center"
            style={{ padding: "15px", height: "180px", width: "1100px" }}
          >
            {pokemonInfo
              ? pokemonInfo.family.evolutionLine.map((pokeInfo) => {
                  return (
                    <img
                      key={pokeInfo.id}
                      width="180px"
                      src={`https://pokeres.bastionbot.org/images/pokemon/${pokeInfo.id}.png`}
                      style={{ marginRight: "75px", marginLeft: "75px" }}
                    />
                  );
                })
              : null}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PokeSpecs;
