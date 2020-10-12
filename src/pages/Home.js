import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import MainBanner from "../components/Web/MainBanner";
import NewsBanner from "../components/Web/NewsBanner";
import VideosBanner from "../components/Web/VideosBanner";
import PodcastBanner from "../components/Web/PodcastBanner";
import StocksBanner from "../components/Web/StocksBanner";

export default function Home() {
    return(
        <>
            <Helmet>
                <title> El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = "Sigue de cerca las noticias de tus empresas. Aprende a invertir en la bolsa de manera responsable con nuestros artículos, videos y podcast."
                />
                <link
                    rel = "canonical"
                    href = "https://recuentomercado.com/"
                />
                <meta
                    property = "og:title" 
                    content = "El Recuento del Mercado"
                />
                <meta
                    property = "og:description"
                    content = "Noticias relevantes"
                />
                <meta
                    property = "og:locale"
                    content = "es_MX"
                />
                <meta
                    property = "og:type"
                    content = "website"
                />
                <meta
                    property = "og:url"
                    content = {window.location.path + window.location.search}
                />
                <meta
                    property = "og:image"
                    content = "http://recuentomercado.com/mstile-310x310.png"
                />
                <meta
                    property = "og:image:secure_url"
                    content = "https://recuentomercado.com/mstile-310x310.png"
                />
                <meta
                    property = "og:image:type"
                    content = "image/png"
                />
                <meta
                    property = "og:image:width"
                    content = "310"
                />
                <meta
                    property = "og:image:height"
                    content = "310"
                />
                <meta
                    property = "og:image:alt"
                    content = "El Recuento del Mercado"
                />
                <meta
                    property = "og:site_name"
                    content = "El Recuento del Mercado"
                />
            </Helmet>
            <MainBanner/>
            <StocksBanner/>
            <NewsBanner/>
            <VideosBanner/>
            <PodcastBanner/>
        </>
    );
}