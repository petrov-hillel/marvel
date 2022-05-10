import {NavLink, useParams, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {useMarvelService} from "../../services/MarvelService";
import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null)
    const {loading,error,clearError,getComic} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId])


    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const updateComic = () => {
        clearError()

        getComic(comicId)
            .then(onComicLoaded)
    }


    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner size={100}/> : null;
    const content = !(loading || errorMessage || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}
const View = ({comic}) => {
    const history = useHistory()

    const {
        title,
        pageCount,
        language,
        description,
        price,
        thumbnail,
    } = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <button onClick={history.goBack}
                    style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}
                    className="single-comic__back">Back to all</button>
        </div>
    )
}
export default SingleComicPage;