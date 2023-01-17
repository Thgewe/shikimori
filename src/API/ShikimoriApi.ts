import {API_BASE_URL} from "../utils/constants";
import axios from "axios";
import {
    IAnime,
    ICharacter, IComments,
    IManga,
    IRanobe, IRelated, IRoles,
    IShortAnime,
    IShortCharacter,
    IShortManga,
    IShortRanobe, ITopicNews
} from "../models/IShikimoriApi";
import {IAnimeListParams, IListOfNewsParams} from "../models/IShikimoriApiParams";
import {IFilterParams} from "../models/IFilterParams";

class ShikimoriApi {
    static _apiBase = API_BASE_URL

    static async getListOfAnime(params: IAnimeListParams) {
        const res = await axios.get(this._apiBase + 'animes', {
            params,
        })
        return res.data as IAnime[]
    }
    static async getListOfAnimeByName(name: string = '') {
        const res = await axios.get(this._apiBase + 'animes', {
            params: {
                page: 1,
                limit: 20,
                order: 'popularity',
                search: name
            }
        })
        return res.data as IShortAnime[]
    }
    static async getAnimeById(id: number) {
        const res = await axios.get(this._apiBase + 'animes/' + id)
        return res.data as IAnime
    }
    static async getListOfCharactersByName(name: string = '') {
        const res = await axios.get(this._apiBase + 'characters/search', {
            params: {
                search: name,
            }
        })
        return res.data as IShortCharacter[]
    }
    static async getCharacterById(id: number) {
        const res = await axios.get(this._apiBase + 'characters/' + id, {})
        return res.data as ICharacter
    }
    static async getListOfManga(params: IFilterParams) {
        const res = await axios.get(this._apiBase + 'mangas', {
            params,
        })
        return res.data as IShortManga[]
    }
    static async getListOfMangaByName(name: string = '') {
        const res = await axios.get(this._apiBase + 'mangas', {
            params: {
                page: 1,
                limit: 20,
                order: 'popularity',
                search: name
            }
        })
        return res.data as IShortManga[]
    }
    static async getMangaById(id: number) {
        const res = await axios.get(this._apiBase + 'mangas/' + id)
        return res.data as IManga
    }

    static async getListOfRanobe(params: IFilterParams) {
        const res = await axios.get(this._apiBase + 'ranobe', {
            params,
        })
        return res.data as IShortRanobe[]
    }
    static async getListOfRanobeByName(name: string = '') {
        const res = await axios.get(this._apiBase + 'ranobe', {
            params: {
                page: 1,
                limit: 20,
                order: 'popularity',
                search: name
            }
        })
        return res.data as IShortRanobe[]
    }
    static async getRanobeById(id: number) {
        const res = await axios.get(this._apiBase + 'ranobe/' + id)
        return res.data as IRanobe
    }
    static async getListOfNews(params: IListOfNewsParams) {
        const res = await axios.get(this._apiBase + 'topics', {
            params: {
                ...params,
                forum: 'news'
            }
        })
        return res.data as ITopicNews[]
    }
    static async getNewsById(id: number) {
        const res = await axios.get(this._apiBase + 'topics/' + id)
        return res.data as ITopicNews
    }

    //TODO: comments pagination
    static async getCommentsByIdAndTopic(id: number, topic: string = 'Topic') {
        const res = await axios.get(this._apiBase + 'comments', {
            params: {
                commentable_id: id,
                commentable_type: topic,
                limit: 30,
            }
        })
        return res.data as IComments[]
    }
    static async getRelatedById(id: number, category: 'mangas' | 'animes' | 'ranobe') {
        const res = await axios.get(this._apiBase + category + '/' + id  + '/related')
        return res.data as IRelated[]
    }
    static async getRolesById(id: number, category: 'mangas' | 'animes' | 'ranobe') {
        const res = await axios.get(this._apiBase + category + '/' + id + '/roles')
        return res.data as IRoles[]
    }
}

export default ShikimoriApi