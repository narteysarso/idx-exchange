import { useEffect, useState } from "react";
import { buyToken, convertToTokens } from "../services/contract";
import { debounce } from "../util.js";

export function useExchangeOrder() {
    const [formData, setFormData] = useState({from: 0, to: 0});
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!formData.from) {
            return;
        }

        debounce(async () => {
            const tokens = await convertToTokens(formData.from.toFixed(8));
            setFormData(prev => ({...prev, to: tokens}));
        })();

    }, [formData.from])

    useEffect(() => {
        if(!submit){
            return;
        }

        (async() => {
            const result = await buyToken(formData.from.toFixed(8));
            return result;
        })();

        setSubmit(false);

    }, [submit]);

    return {formData, setFormData, setSubmit, error, submit};
}