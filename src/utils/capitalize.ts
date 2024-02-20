export const capitalize = ([first, ...rest]: string, lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export const backspaceAndCapitalize = (name : string) => {
	let afterhyphen = false
	let result = ""

	for (const char of name) {
		if (afterhyphen) {
			result += char.toUpperCase()
			afterhyphen = false
		} else if (char === '-') {
			result += ' '
			afterhyphen = true
		} else {
			result += char
		}
	}

	return capitalize(result)
}