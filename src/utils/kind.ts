
/* Converts "kind" received from the api and converts it to the appropriate form */

export const whatKind = (kind: string) => {

    let str: string;
    switch(kind) {
        // tv, movie, ova, ona, special, music, tv_13, tv_24, tv_48
        // manga, manhwa, manhua, light_novel, novel, one_shot, doujin
        case 'tv':
            str = 'TV Сериал'
            break;
        case 'movie':
            str = 'Фильм'
            break;
        case 'ova':
            str = 'OVA'
            break;
        case 'ona':
            str = 'ONA'
            break;
        case 'special':
            str = 'Спешл'
            break;
        case 'music':
            str = 'Клип'
            break;
        case 'manga':
            str = 'Манга'
            break;
        case 'manhwa':
            str = 'Манхва'
            break;
        case 'manhua':
            str = 'Маньхуа'
            break;
        case 'one_shot':
            str = 'Ваншот'
            break;
        case 'light_novel':
            str = 'Ранобэ'
            break;
        case 'novel':
            str = 'Новелла'
            break;
        default:
            str = 'TV Сериал'
    }
    return str
}