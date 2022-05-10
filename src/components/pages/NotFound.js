import {NavLink, useHistory} from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

export default function NotFound() {
    const history = useHistory()
    return (
        <div>
            <ErrorMessage/>
            <p style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24
            }}>Page doesn't exist</p>
            <button onClick={history.goBack}
                    style={{
                        display: 'block',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'center',
                        margin: '30px auto 0',
                        fontWeight: 'bold',
                        fontSize: 24
                    }}>
                Back
            </button>
        </div>
    )
}