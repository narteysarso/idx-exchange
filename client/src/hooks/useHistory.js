import { useEffect, useState } from "react";
import { getHistory, getOrders, getTransfers} from "../services/contract";

export function useHistory(){
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({});

    useEffect(()=> {
        (async()=>{
            if(!Object.keys(filter).length){
                return
            }

            let timestamp = null;
            let data = [];

            if(filter.date){
                timestamp = filter.date.map( date => date?.unix())
            }

            
            switch(filter?.type?.toLowerCase()){
                case 'transfer':
                    data = await getTransfers({...filter, timestamp});
                    break;
                case 'purchase':
                    data = await getOrders({...filter, timestamp});
                    break;
                default:
                    data = await getHistory({...filter, timestamp   })
            }
           
            setData(data)
        })()
    },[filter]);

    useEffect( () => {
        (async()=>{
        
        const data = await getHistory();
        console.log(data);
        setData(data)
        })()
    },[])


    return { setFilter, data}

}