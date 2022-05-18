import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";
import {CharSearchForm} from "../charSearchForm/charSearchForm";


export default function MainPage() {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id)
    }
    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <div style={{position: 'sticky', top: 30}}>
                        <CharInfo charId={selectedChar}/>
                        <CharSearchForm/>
                    </div>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}