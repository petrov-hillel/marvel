import {useState, useEffect, useRef} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {useMarvelService} from "../../services/MarvelService";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './charList.scss';

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

const CharList = (props) => {
    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endItems, setEndItems] = useState(false);

    const {process, setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const itemRefs = useRef([]);

    const setSelected = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onListLoaded = (newList) => {
        let ended = false
        if (newList.data.length < 9 || newList.total <= offset + 9) {
            ended = true;
        }

        setList(list => [...list, ...newList.data])
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setEndItems(ended)
    }

    function renderItems(list) {
        const elements = list.map((item, index) => {
            return (
                <CSSTransition
                    timeout={500}
                    classNames="char__item"
                    key={item.id}>
                    <li className={"char__item"}
                        tabIndex={0}
                        ref={el => itemRefs.current[index] = el}
                        onClick={() => {
                            setSelected(index)
                            props.onCharSelected(item.id)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                setSelected(index);
                            }
                        }}>
                        <img style={item.styleThumbnail} src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
            </ul>
        )
    }

    return (
        <div className="char__list">
            {setContent(process, () => renderItems(list), newItemLoading)}
            <button onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: endItems ? 'none' : 'block'}}
                    className="button button__main button__long">
                <div className="inner">
                    {newItemLoading ? <Spinner size={25}/> : 'load more'}
                </div>
            </button>
        </div>
    )
}

export default CharList;