import { useEffect, useState } from "react";
import { getHistory, getOrders, getTransfers } from "../services/contract";

export function useHistory() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [filter, setFilter] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setLoading(true);
            (async () => {
                if (!Object.keys(filter).length) {
                    return
                }

                let timestamp = null;
                let data = [];

                if (filter.date) {
                    timestamp = filter.date.map(date => date?.unix())
                }


                switch (filter?.type?.toLowerCase()) {
                    case 'transfer':
                        data = await getTransfers({ ...filter, timestamp });
                        break;
                    case 'purchase':
                        data = await getOrders({ ...filter, timestamp });
                        break;
                    default:
                        data = await getHistory({ ...filter, timestamp })
                }

                setData(data)
            })()
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        try {
            (async () => {

                const data = await getHistory();
                setData(data)
            })()
        } catch (error) {
            setError(error)
        }

    }, [])


    return { setFilter, data, error,loading }

}