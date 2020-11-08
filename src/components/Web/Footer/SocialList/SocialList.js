import React from "react";

import "./SocialList.scss";

export default function SocialList() {
    return(
        <div className = "footer-social">
            <p className = "footer-social__link">
                <a
                    href = "https://www.youtube.com/channel/UCVXjaPiyO1By_PwCI0l4Wjw"
                    target = "_blank"
                    rel = "noopener noreferrer"
                >
                    YouTube
                </a>
            </p>
            <p className = "footer-social__link">
                <a
                    href = "https://www.facebook.com/recuentomercado"
                    target = "_blank"
                    rel = "noopener noreferrer"
                >
                    Facebook
                </a>
            </p>
            <p className = "footer-social__link">
                <a
                    href = "https://open.spotify.com/show/2MyPjrtiplGHpuVLYxENSS"
                    target = "_blank"
                    rel = "noopener noreferrer"
                >
                    Spotify
                </a>
            </p>
            <p className = "footer-social__link">
                <a
                    href = "https://www.instagram.com/recuentomercado/"
                    target = "_blank"
                    rel = "noopener noreferrer"
                >
                    Instagram
                </a>
            </p>
        </div>
    );
}