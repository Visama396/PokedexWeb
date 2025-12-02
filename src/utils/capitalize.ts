
/**
 *
 * @param word The string to capitalize
 * @param lowerRest whether to lowercase the rest of the string (default: true)
 * @returns The capitalized string
 */
export const capitalize = ([first, ...rest]: string, lowerRest = true) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join('').toUpperCase())

/**
 *
 * @param word The string to capitalize
 * @returns The capitalized string
 */
export const backspaceAndCapitalize = (name : string) => {
	let afterhyphen = false
	let result = ''

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
