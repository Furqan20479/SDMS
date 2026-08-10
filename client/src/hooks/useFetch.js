import { useState, useEffect } from "react";


export default function useFetch(fetchFunction){
    const [data, setData] = useState([]);
    const [meta, setMeta] = useState([]);

    const fetchData = async()=>{
        const result = await fetchFunction();
        setData(result.data || []);
        setMeta(result);
        console.log(result.data);
    };
    useEffect(()=>{
        fetchData();
    },[]);

    return {data, meta, fetchData, setData,setMeta};
}
