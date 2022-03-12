import { useEffect, useState } from "react";
import { getAccountTokenBalance, transferToken } from "../services/contract";
import { debounce } from "../util.js";

export function useTransfer() {
    const [formData, setFormData] = useState({ to: "", amount: 0 });
    const [submit, setSubmit] = useState(false);
    const [account, setAccount] = useState(false);
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState(null);

    useEffect(()=> {
        if(!account){
            return;
        }

        (async () => {
            const balance = await getAccountTokenBalance(account);
            setBalance(balance);
        })();
    }, [account]);

    useEffect(() => {
        console.log(submit);
        if(!submit){
            return;
        }

        if(!formData.to || !formData.amount){
            return;
        }

        
        (async() => {
            const result = await transferToken(formData.to, formData.amount.toFixed(8));
            return result;
        })();

        setSubmit(false);

    }, [submit]);

    return {formData, balance, setFormData, setAccount, setSubmit, submit, error};
}