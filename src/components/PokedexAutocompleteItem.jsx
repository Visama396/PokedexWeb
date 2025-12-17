export default function PokedexAutocompleteItem({ pokemon }) {
	return (
		<a href={`/${pokemon.name}`}>
			{pokemon.name}
		</a>
	)
}
