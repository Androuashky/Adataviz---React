const SearchBar = ({ onRecherche }) => {
  return (
        <input
        type="text"
        placeholder="Rechercher..."
        onChange={(event) => onRecherche(event.target.value)}
        />
  )
}

export default SearchBar