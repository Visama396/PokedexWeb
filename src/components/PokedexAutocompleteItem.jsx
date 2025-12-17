export default function PokedexAutocompleteItem({ sprite, displayName, fallbackName }) {
	return (
		<a href={`/${fallbackName.toLowerCase()}`} className='flex justify-around items-center px-2 hover:bg-[#222]/20 rounded-md'>
			<span className='text-white font-semibold'>{displayName}</span>
			<img src={sprite} alt={fallbackName} className='size-20 object-contain' />
		</a>
	)
}
