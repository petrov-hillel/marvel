import {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {useMarvelService} from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";
import './singlePage.scss';

const SinglePage = (props) => {
    const {id} = useParams();
    const [data, setData] = useState(null)
    const {process,setProcess, clearError, getComic, getCharacter} = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])


    const onDataLoaded = (data) => {
        setData(data)
    }

    const updateData = () => {
        clearError()

        switch (props.type){
            case 'comic' :
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                break
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                break
        }
    }

    return (
        <>
            {setContent(process, View, data)}
        </>
    )
}
const View = ({data}) => {
    const history = useHistory()

    const {
        title,
        name,
        pageCount,
        language,
        description,
        price,
        thumbnail,
    } = data

    return (
        <>
            <AppBanner/>
            <div className="single">
                <img src={thumbnail} alt={title} className="single__img"/>
                <div className="single__info">
                    <h2 className="single__name">{title || name}</h2>
                    <p className="single__descr">{description}</p>

                    {pageCount || language || price ?
                        <>
                            <p className="single__descr">{pageCount} pages</p>
                            <p className="single__descr">Language: {language}</p>
                            <div className="single__price">{price}</div>
                        </>
                        : null
                    }

                </div>
                <button onClick={history.goBack}
                        className="single__back">Back to all
                </button>
            </div>
        </>
    )
}
export default SinglePage;