import React from "react";
import {Link} from "react-router-dom";

import "./TermsPrivacyList.scss";

export default function TermsPrivacyList() {
    return(
        <div className = "footer-privacy">
            <Link 
                to = "/terminos-y-condiciones"
                className = "footer-privacy__link"
            >   
                <p >
                    Términos y Condiciones
                </p>
            </Link>
            <Link 
                to = "/aviso-de-privacidad"
                className = "footer-privacy__link"
            >
                <p>
                    Aviso de Privacidad
                </p>
            </Link>
        </div>
    );
}