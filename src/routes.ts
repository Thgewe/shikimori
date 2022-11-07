import {
    ALL_ANIME_ROUTE,
    ALL_MANGA_ROUTE,
    ALL_RANOBE_ROUTE,
    ANIME_ROUTE, CHARACTER_ROUTE,
    HOME_ROUTE,
    MANGA_ROUTE,
    RANOBE_ROUTE,
    NEWS_ROUTE,
    PERSON_ROUTE,
    USER_ROUTE,
} from "./utils/constants";
import AllAnimePage from "./pages/AllAnimePage/AllAnimePage";
import AllMangaPage from "./pages/AllMangaPage/AllMangaPage";
import AllRanobePage from "./pages/AllRanobePage/AllRanobePage";
import MangaPage from "./pages/MangaPage/MangaPage";
import AnimePage from "./pages/AnimePage/AnimePage";
import RanobePage from "./pages/RanobePage/RanobePage";
import HomePage from "./pages/HomePage/HomePage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";
import NewsByIdPage from "./pages/NewsByIdPage/NewsByIdPage";
import PersonPage from "./pages/PersonPage/PersonPage";
import UserPage from "./pages/UserPage/UserPage";


export const routes = [
    {
        path: HOME_ROUTE,
        name: 'home',
        component: HomePage,
    },
    {
        path: ALL_ANIME_ROUTE,
        name: 'all_anime',
        component: AllAnimePage,
    },
    {
        path: ALL_MANGA_ROUTE,
        name: 'all_manga',
        component: AllMangaPage,
    },
    {
        path: ALL_RANOBE_ROUTE,
        name: 'all_ranobe',
        component: AllRanobePage,
    },
    {
        path: MANGA_ROUTE,
        name: 'manga',
        component: MangaPage,
    },
    {
        path: ANIME_ROUTE,
        name: 'anime',
        component: AnimePage,
    },
    {
        path: RANOBE_ROUTE,
        name: 'ranobe',
        component: RanobePage,
    },
    {
        path: CHARACTER_ROUTE,
        name: 'character',
        component: CharacterPage,
    },
    {
        path: NEWS_ROUTE,
        name: 'news',
        component: NewsByIdPage,
    },
    {
        path: PERSON_ROUTE,
        name: 'person',
        component: PersonPage,
    },
    {
        path: USER_ROUTE,
        name: 'user',
        component: UserPage,
    },
]