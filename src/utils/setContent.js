import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";


function setContent(process, Component, data) {
    switch (process) {
        case 'loading':
            return <Spinner/>
        case 'error' :
            return <ErrorMessage/>
        case 'waiting' :
            return <Skeleton/>
        case 'confirmed' :
            return <Component data={data}/>
    }
}

export default setContent