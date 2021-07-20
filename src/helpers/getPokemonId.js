const getPokemonId = (url) => {
  return url.split("/")[6];
};

export default getPokemonId;
