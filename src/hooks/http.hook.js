import {useCallback, useState} from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting')
    const request = useCallback(async (url, method = 'GET', body = null,
                                       headers = {'Content-Type': 'application/json'}) => {

        setProcess('loading')

        try {
            const response = await fetch(url, {body, method, headers})

            if (!response.ok) {
                throw new Error(`Could not search ${url}, status: ${response.status}`);
            }

            const data = await response.json()

            return data;
        } catch (e) {
            setProcess('error')
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setProcess('loading')
    }, [])

    return {request, process, setProcess, clearError}
}