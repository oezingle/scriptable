

const uuidGen = (digits = 8, base = 36) => {
    return Math.floor(
        Math.random() * base ** digits
    )
        .toString(base)
        .padStart(digits, 0)
        .toUpperCase()
}

module.exports = uuidGen