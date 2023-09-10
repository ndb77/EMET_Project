import { useState, useEffect } from 'react';
import axios from 'axios';

const useAutoComplete = (dataUrl) => {
    const [autoCompleteData, setAutoCompleteData] = useState([]);
    const [autoCompleteFetchError, setAutoCompleteFetchError] = useState(null);
    const [autoCompleteDataLoading, setAutoCompleteDataLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setAutoCompleteDataLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setAutoCompleteData(response.data);
                    setAutoCompleteFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setAutoCompleteFetchError(err.message);
                    setAutoCompleteData([]);
                }
            } finally {
                isMounted && setAutoCompleteDataLoading(false);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { autoCompleteData, autoCompleteFetchError, autoCompleteDataLoading };
}

export default useAutoComplete;