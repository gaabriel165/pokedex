const PokemonName = (name) => {
  return name
    .charAt(0)
    .toUpperCase()
    .concat(name.replace(name.charAt(0), ""));
};

export default PokemonName;