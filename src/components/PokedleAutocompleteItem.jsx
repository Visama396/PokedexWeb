export default function PokedleAutocompleteItem({ name, sprite, handleClick }) {
	return (
		<div className='flex w-full justify-around items-center px-2 cursor-pointer hover:bg-[#444] rounded-md' onClick={handleClick}>
			<span>{name}</span>
			<img className='size-20 object-contain' src={sprite} alt={name} />
		</div>
	)
}
