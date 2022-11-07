export interface IFilterParams {
    [index: string]: string | number,
    page: number,
    limit: number,
    status: string,
    kind: string,
    order: string,
    season: string,
    score: string,
    rating: string,
    genre: string,
}