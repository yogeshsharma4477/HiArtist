const list = [
    "yogesh", "deepak12", "mohit1", "yogesh12", "pival", "pival25", "pival10",
    "yogesh10", "yogesh4477", 'yogesh1989', 'yogesh87', 'yogesh87',
    'yogesh50', 'yogesh50', 'yoge6272', 'yogesh29', 'yogesh29', 'yogesh29',
    'yogesh29', 'yogesh13', 'yogesh13', 'yogesh15', 'yogesh15', 'yoge9079',
    'yoge9320', 'yoge5778'
]

function suggestUsername(str) {
    if (!list.includes(str)) {
        return str
    }
    let validUserName = []
    let maxLength = str.length + 6
    let i = Math.floor(Math.random() * 100)
    let validStr = str
    validStr += i
    while (validUserName.length < 6) {
        if (!list.includes(validStr) && !validUserName.includes(validStr)) {
            validUserName.push(validStr)
        } else {
            let underScoreIndex = Math.floor(Math.random() * 6)
            validStr = validStr.slice(0, underScoreIndex) + '_' + validStr.slice(underScoreIndex, validStr.length);
        }
        validStr += i
        validStr = validStr.slice(0, maxLength)
        i = Math.floor(Math.random() * 10000)
    }
    return validUserName
}

console.log(suggestUsername('yogesh'))