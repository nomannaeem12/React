import {useContext, useEffect} from "react";
import {LoaderContext} from "../../../core/providers/loaderProvider.tsx";

export function Inbox() {
    const {toggleLoading} = useContext(LoaderContext);
    useEffect(() => {
        toggleLoading(true);
    }, [])
    return (
        <>
        </>
    )
}