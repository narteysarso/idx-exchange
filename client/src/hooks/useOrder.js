import { useEffect, useState } from "react";
import { buyToken, convertToTokens } from "../services/contract";
import { debounce } from "../util.js/index.js";

export function useOrder() {
    const [formData, setFormData] = useState({ from: 0, to: 0 });
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (!formData.from) {
                return;
            }

            debounce(async () => {
                const tokens = await convertToTokens(formData.from.toFixed(8));
                setFormData(prev => ({ ...prev, to: tokens }));
            })();

        } catch (error) {
            setError(error);
        }

    }, [formData.from])

    useEffect(() => {
        (async () => {
            try {
                if (!submit) {
                    return;
                }
                const result = await buyToken(formData.from.toFixed(8));
                return result;
            } catch (error) {
                setError(error);
            } finally {
                setSubmit(false);
            }
        })();

    }, [submit]);


    return { formData, setFormData, setSubmit, error, submit };
}