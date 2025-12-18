const TYPES = [
	'normal',
	'fire',
	'water',
	'electric',
	'grass',
	'ice',
	'fighting',
	'poison',
	'ground',
	'flying',
	'psychic',
	'bug',
	'rock',
	'ghost',
	'dragon',
	'dark',
	'steel',
	'fairy'
]

export default function PokedexTypeFilters({ selectedTypes, setSelectedTypes }) {
	const toggleType = (type) => {
		setSelectedTypes(prev => {
			const next = new Set(prev)
			next.has(type) ? next.delete(type) : next.add(type)
			return next
		})
	}

	return (
		<div className='flex flex-wrap justify-center gap-2 py-2 text-white'>
			<button onClick={() => setSelectedTypes(new Set())} className='rounded-md px-2 cursor-pointer'>
				Clear
			</button>
			{TYPES.map(type => (
				<button key={type} onClick={() => toggleType(type)} style={{ background: selectedTypes.has(type) ? `var(--${type})` : 'gray' }} className='rounded-md px-2 cursor-pointer'>
					{type}
				</button>
			))}
		</div>
	)
}
