import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        scrollTo({top: 0, behavior: "instant"});
    }, [pathname])

    return <></>
}