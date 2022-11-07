interface IParamsDefault {
    page: number,
    limit: number,
    order?: string,
    season?: string,
    genre?: string,
    score?: string,
    // order?: 'ranked' | 'popularity' | 'name' | 'aired_on' | 'ranked_random' | 'id_desc',
    // season?: 'winter_2023' | 'fall_2022' | 'summer_2022' | 'spring_2022'
    //     | '2022' | '2021' | '2019_2020' | '2014_2018' | '2000_2013' | '199x'
    //     | '198x' | 'ancient',
    // genre?: 'Shounen' | 'Shounen Ai' | 'Seinen' | 'Shoujo' | 'Shoujo-Ai' | 'Josei'
    //     | 'Comedy' | 'Romance' | 'School' | 'Dementia' | 'Martial-Arts' | 'Vampire'
    //     | 'Military' | 'Harem' | 'Gourmet' | 'Demons' | 'Mystery' | 'Kids'
    //     | 'Drama' | 'Game' | 'Historical' | 'Space' | 'Magic' | 'Cars'
    //     | 'Mecha' | 'Music' | 'Parody' | 'Slice-of-Life' | 'Police' | 'Adventure'
    //     | 'Psychological' | 'Work-Life' | 'Samurai' | 'Supernatural' | 'Sports' | 'Super-Power'
    //     | 'Horror' | 'Sci-Fi' | 'Fantasy' | 'Action' | 'Ecchi' | 'Thriller'
    //     | 'Erotica' | 'Hentai' | 'Yaoi' | 'Yuri'
    // score?: 8 | 7 | 6,
}

export interface IAnimeListParams extends IParamsDefault {
    // kind: 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music', | 'tv_13' | 'tv_24' | 'tv_48'
    // status: 'anons' | 'ongoing' | 'released' | 'latest',
    // rating: 'g' | 'pg' | 'pg_13' | 'r' | 'r_plus' | 'rx' | 'none',
    kind: string,
    status: string,
    rating?: string,
}
