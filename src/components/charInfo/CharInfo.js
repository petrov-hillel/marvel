import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }

    marvelServices = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharLoading = () => {
        this.setState({loading: true, error: false})
    }



    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) return;

        this.onCharLoading()

        this.marvelServices
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
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
    for(let i=0; i < comics.length;i++) {
        if(i>9) break;
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
                    return(
                       <li key={i} className="char__comics-item">
                           {item.name}
                       </li>
                    )
                })}
            </ul>
        </>
    )
}

export default CharInfo;