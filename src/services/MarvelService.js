export default class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=8e9dbbcaf8b1d98b81a9da1c1248029a';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not search ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&${this._apiKey}`);
        const total = res.data.total
        return {
            data: res.data.results.map(this._transformCharacter),
            total
        }
    }

    _transformCharacter = (char) => {
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
}
