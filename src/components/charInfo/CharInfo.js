import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import {useMarvelService} from "../../services/MarvelService";
import './charInfo.scss';
import {NavLink} from "react-router-dom";


const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);
    const {loading,error,clearError,getCharacter,getComics} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])


    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = () => {
        if (!charId) return;
        clearError()
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner size={100}/> : null;
    const content = !(loading || errorMessage || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {
        name,
        description,
        thumbnail,
        styleThumbnail,
        homepage,
        wiki,
        comics,
    } = char;

    const comicsRender = [];
    for (let i = 0; i < comics.length; i++) {
        if (i > 9) break;
        comicsRender.push(comics[i])
    }

    return (
        <>
            <div className="char__basics">
                <img style={styleThumbnail} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {comicsRender.map((item, i) => {
                    return (
                        <NavLink exact to={`/comics/${item.resourceURI.slice(43)}`} key={i} style={{display: 'block'}}>
                            <li  className="char__comics-item">
                                {item.name}
                            </li>
                        </NavLink>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;