const PokemonId = (id) => {
  if (id < 10) return "#00" + id;
  if (id < 100) return "#0" + id;
};

export default PokemonId;
