import {useHttp} from "../hooks/http.hook";

export const useMarvelService = () => {
    const {request, ...props} = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=8e9dbbcaf8b1d98b81a9da1c1248029a';
    const _baseOffset = 210;

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}/characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        const total = res.data.total
        return {
            data: res.data.results.map(_transformCharacter),
            total
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title || 'Not title',
            pageCount: comics.pageCount,
            language: comics.textObjects.language || 'en-us',
            description: comics.description || 'Description doesn\'t exist',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
        }
    }

    const _transformCharacter = (char) => {
        const description = char.description ? char.description : 'There is no description for this character';
        const styleThumbnail = char.thumbnail.path  === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ?
            {objectPosition: 'left top'} : null;

        return {
            id: char.id,
            name: char.name,
            description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            styleThumbnail,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }
    return {
        ...props,
        getCharacter,
        getAllCharacters,
        getAllComics,
        getComic,
        getCharacterByName
    }
}
