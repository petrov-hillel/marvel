import {useEffect, useRef, useState} from "react";
import {useMarvelService} from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './comicsList.scss';
import {NavLink} from "react-router-dom";

function setContent(process, Component, newItemLoading) {
    switch (process) {
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>
        case 'error' :
            return <ErrorMessage/>
        case 'waiting' :
            return <Spinner/>
        case 'confirmed' :
            return <Component/>
    }
}

const ComicsList = () => {
    const [list, setList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {process, setProcess, getAllComics} = useMarvelService()

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllComics(offset)
            .then(onListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onListLoaded = (newList) => {
        setList([...list, ...newList]);
        setOffset(offset => offset + 8);
        setNewItemLoading(false);
    }

    const renderItems = (list) => {
        const elements = list.map((item, index) => {
            return (
                <li className="comics__item" key={index}>
                    <NavLink exact to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </NavLink>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {elements}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(list), newItemLoading)}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
            >
                <div className="inner">
                    {newItemLoading ? <Spinner size={20}/> : 'load more'}
                </div>
            </button>
        </div>
    )
}

export default ComicsList;