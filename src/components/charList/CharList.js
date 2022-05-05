import './charList.scss';
import MarvelService from "../../services/MarvelService";
import {Component} from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
    state = {
        list: [],
        loading: true,
        newItemLoading: false,
        offset: 210,
        error: false,
        endItems: false,
    }

    itemRefs = [];

    setCharRef = (ref) => {
        this.itemRefs.push(ref);
    }

    setSelected = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset = this.state.offset) => {
        this.onCharListLoading();
        this.marvelServices
            .getAllCharacters(offset)
            .then(this.onListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true})
    }

    marvelServices = new MarvelService();

    onListLoaded = (newList) => {
        let ended = false
        if(newList.data.length < 9 || newList.total <= this.state.offset + 9) {
            ended = true;
        }

        this.setState(({list, offset}) => ({
            list: [...list, ...newList.data],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            endItems: ended
        }))

    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    renderItems = (list) => {
        const elements = list.map((item, index) => {
            return (
                <li className={"char__item"}
                    tabIndex={0}
                    ref={this.setCharRef}
                    key={item.id}
                    onClick={() => {
                        this.setSelected(index)
                        this.props.onCharSelected(item.id)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.setSelected(index);
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



    render() {
        const {list, loading, error, offset, newItemLoading, endItems} = this.state;

        const items = this.renderItems(list)

        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;
        const content = !(loading || error) ? items : null;


        return (

            <div className="char__list">
                {spinner}
                {errorMessage}
                {content}
                <button onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{display: endItems ? 'none' : 'block'}}
                        className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;