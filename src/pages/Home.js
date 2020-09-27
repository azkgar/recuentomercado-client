import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import MainBanner from "../components/Web/MainBanner";
import NewsBanner from "../components/Web/NewsBanner";

export default function Home() {
    return(
        <>
        <MainBanner />
        <NewsBanner/>
        </>
    );
}