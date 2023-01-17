

export const whatRating = (str: string) => {
    switch (str) {
        case 'none':
            return ''
        case 'g':
            return 'G'
        case 'pg':
            return 'PG'
        case 'pg_13':
            return 'PG-13'
        case 'r':
            return 'R'
        case 'r_plus':
            return 'R+'
        case 'rx':
            return 'Rx'
        default:
            return ''
    }
}