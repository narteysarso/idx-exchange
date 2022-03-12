import { useState, useEffect, useLayoutEffect } from "react";
import { message } from "antd";
import { getAccount, getOwner, getSymbol, getTokenName, getTotalSupply, listenTokenBurnedEvent, listenTokenMintedEvent, unscribeTokenMintedEvent, unscribeTokenBurnedEvent } from "../services/contract";

export function useIDXContext() {
    const [wallet, setWallet] = useState();
    const [ownerAddress, setOwnerAddress] = useState(null);
    const [totalSupply, setTotalSupply] = useState(0);
    const [ticker, setTicker] = useState("");
    const [coin, setCoin] = useState("");
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);


    useLayoutEffect(() => {
        listenTokenBurnedEvent(
            (_, amount) => {
                setTotalSupply(prev => (parseFloat(prev) - parseFloat(amount)).toFixed(2));
            }
        );
        listenTokenMintedEvent(
            (_, amount) => {
                setTotalSupply(prev => (parseFloat(prev) + parseFloat(amount)).toFixed(2));
            }
        );

        return () => {
            unscribeTokenMintedEvent();
            unscribeTokenBurnedEvent();
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const [wallet, owner, totalSupply, symbol, tokeName] = await Promise.all([
                    getAccount(), getOwner(), getTotalSupply(), getSymbol(), getTokenName()
                ]);
                setWallet(wallet);
                setOwnerAddress(owner);
                setTotalSupply(totalSupply);
                setTicker(symbol);
                setCoin(tokeName);
            } catch (error) {
                setError(error.message)
            }
        })();
    }, []);

    useEffect(() => {
        setIsOwner(ownerAddress?.toLowerCase() === wallet?.toLowerCase());
    }, [ownerAddress, wallet]);

    useEffect(() => {
        if (!error || !error?.message) {
            return;
        }


        message.error(error.message);
    }, [error])


    return {
        wallet,
        totalSupply,
        ticker,
        coin,
        isOwner
    }

}