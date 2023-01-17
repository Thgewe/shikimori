import {TShikimoriKindOfProduct} from "./ShikimoriTypes";

interface IDefault {
    id: number,
    name: string,
    russian: string,
    image: IImage,
    url: string,
}

export interface IAnime extends IShortAnime {
    rating: string,
    english: string[],
    japanese: string[],
    synonyms: string[],
    licensors: string[],
    license_name_ru: null | string,
    duration: number,
    description: string | null,
    description_html: string,
    description_source: string | null,
    franchise: string,
    favoured: boolean,
    ongoing: boolean,
    anons: boolean,
    thread_id: number,
    topic_id: number,
    myanimelist_id: number,
    rates_scores_stats: IRatesStats[],
    rates_statuses_stats: IRatesStats[],
    updated_at: string,
    next_episode_at: null | string,
    genres: IGenre[],
    studios: IStudio[],
    videos: IVideo[],
    screenshots: IScreenshot[],
    user_rate: null | string,
}
export interface IStudio {
    id: number,
    name: string,
    filtered_name: string,
    real: boolean,
    image: string,
}
interface IVideo {
    if: number,
    url: string,
    image_url: string,
    player_url: string,
    name: string,
    kind: string,
    hosting: string,
}
interface IScreenshot {
    original: string,
    preview: string,
}

export interface IShortAnime extends IDefault {
    kind: TShikimoriKindOfProduct, // 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'tv_13' | 'tv_24' | 'tv_48'
    score: string,
    status: string, // 'anons' | 'ongoing' | 'released'
    episodes: number,
    episodes_aired: number,
    aired_on: null | string,
    released_on: null | string,
}

interface IImage {
    original: string,
    preview: string,
    x96: string,
    x48: string,
}

export interface IShortCharacter extends IDefault{

}

interface IAnimeWithCharacter extends IShortAnime{
    roles: string[],
    role: string,
}

export interface ICharacter extends IDefault{
    altname: null | string,
    japanese: null | string,
    description: string,
    description_html: string, // HTMLParagraphElement
    description_source: null | string,
    favoured: boolean,
    thread_id: number,
    topic_id: number,
    updated_at: string,
    seyu: IDefault[],
    animes: IAnimeWithCharacter[],
    mangas: IMangaWithCharacter[]
}

export interface IManga extends IShortManga {
    english: string[],
    japanese: string[],
    synonyms: string[],
    license_name_ru: string | null,
    description: string | null,
    description_html: string, // HTMLParagraphElement
    description_source: string | null,
    franchise: string | null,
    favoured: boolean,
    anons: boolean,
    ongoing: boolean,
    thread_id: number,
    topic_id: number,
    myanimelist_id: number,
    rates_scores_stats: IRatesStats[],
    rates_statuses_stats: IRatesStats[],
    genres: IGenre[],
    publishers: IPublishers[],
    user_rate: string
}

export interface IRatesStats {
    name: number | string,
    value: number,
}
// interface IRatesStatusesStats {
//     name: string,
//     value: number,
// }
export interface IGenre {
    id: number,
    name: string,
    russian: string,
    kind: string,
}
interface IPublishers {
    id: number,
    name: string,
}

export interface IShortManga extends IDefault {
    kind: TShikimoriKindOfProduct,
    score: string,
    status: string,
    volumes: number,
    chapters: number,
    aired_on: string,
    released_on: null | string,
}
interface IMangaWithCharacter extends IShortManga {
    roles: string[],
    role: string,
}

export interface IShortRanobe extends IDefault {
    kind: TShikimoriKindOfProduct,
    score: string,
    status: string,
    volumes: number,
    chapters: number,
    aired_on: string,
    released_on: null | string,
}

export interface IRanobe extends IShortRanobe {
    english: string[],
    japanese: string[],
    synonyms: string[],
    license_name_ru: string | null,
    description: string,
    description_html: string,
    description_source: null | string,
    franchise: string,
    favoured: boolean,
    anons: boolean,
    ongoing: boolean,
    thread_id: number,
    topic_id: number,
    myanimelist_id: number,
    rates_scores_stats: IRatesStats[],
    rates_statuses_stats: IRatesStats[],
    genres: IGenre[],
    publishers: string[],
    user_rate: null | string,
}

export interface ITopicNews {
    id: number,
    topic_title: string,
    body: string,
    html_body: string,
    html_footer: string,
    created_at: string,
    comments_count: number,
    // forum
    user: IUser,
    type: string,
    linked_id: number | null,
    linked_type: string,
    linked: IShortAnime | IShortManga | IShortRanobe | IShortCharacter | null,
    viewed: boolean,
    event: null | string,
    episode: null | number,
}

export interface IUser {
    id: number,
    nickname: string,
    avatar: string,
    image: {
        x160: string,
        x148: string,
        x80: string,
        x64: string,
        x48: string,
        x32: string,
        x16: string,
    },
    last_online_at: string,
}
export interface IComments {
    id: number,
    user_id: number,
    commentable_id: number,
    commentable_type: string,
    body: string,
    html_body: string,
    created_at: string,
    updated_at: string,
    is_offtopic: boolean,
    is_summary: boolean,
    can_be_edited: boolean,
    user: IUser,
}

export interface IRelated {
    relation: string,
    relation_russian: string,
    anime: IShortAnime,
    manga: IShortManga,
}

export interface IRoles {
    roles: string[],
    roles_russian: string[],
    character: null | IDefault,
    person: null | IDefault,
}
