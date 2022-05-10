import {useState, useEffect, useRef} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {useMarvelService} from "../../services/MarvelService";
import './charList.scss';

const CharList = (props) => {
    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [endItems, setEndItems] = useState(false);

    const {loading,error,getAllCharacters} = useMarvelService();

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
                <li className={"char__item"}
                    tabIndex={0}
                    ref={el => itemRefs.current[index] = el}
                    key={item.id}
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
            )
        })

        return (
            <ul className="char__grid">
                {elements}
            </ul>
        )
    }

    const items = renderItems(list)
    const spinner = loading && !newItemLoading ? <Spinner size={150}/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {items}
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