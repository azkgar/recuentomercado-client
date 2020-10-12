import React, {useEffect} from 'react';
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";

import "./Privacy.scss";

export default function Privacy() {
    return (
        <>
        <Helmet>
            <title>Aviso de Privacidad | El Recuento del Mercado</title>
            <meta 
                name = "description" 
                content = "Aviso de Privacidad para los datos recopilados en cualquier página o aplicación web relacionada con El Recuento del Mercado®."
            />
            <link rel = "canonical" href = "https://recuentomercado.com/aviso-de-privacidad"/>
            <meta property = "og:title" content =  "Aviso de Privacidad | El Recuento del Mercado"/>
            <meta property = "og:description" content =  "Aviso de Privacidad para los datos recopilados en cualquier página o aplicación web relacionada con El Recuento del Mercado®."/>
            <meta property = "og:locale" content = "es_MX"/>
            <meta property = "og:type" content = "website"/>
            <meta property = "og:url" content =  {window.location.pathname + window.location.search}/>
            <meta property = "og:image" content = "http://recuentomercado.com/mstile-310x310.png" />
            <meta property = "og:image:secure_url" content = "https://recuentomercado.com/mstile-310x310.png" />
            <meta property = "og:image:type" content = "image/png" />
            <meta property = "og:image:width" content = "310" />
            <meta property = "og:image:height" content = "310" />
            <meta property = "og:image:alt" content = "El Recuento del Mercado" />
            <meta property = "og:site_name" content = "El Recuento del Mercado" />
        </Helmet>
        <div className = "privacy">
            <h1>Aviso de Privacidad</h1>
            <p>A los Usuarios (como se definen posteriormente), les informamos que el siguiente Aviso de Privacidad, les es aplicable por el simple uso o acceso a cualquiera de las páginas, aplicaciones web y móviles, softwares y, aplicaciones en general, que integran el Portal de <a href = "/" target = "_blank" rel = "noopener noreferrer">recuentomercado.com</a> (en adelante y, conjunta e indistintamente, el "Portal"), por lo que entenderemos que lo acepta y acuerda en obligarse en su cumplimiento. <strong>En caso de que no esté de acuerdo con el Aviso de Privacidad y/o con los <a href = "/terminos-y-condiciones" target = "_blank" rel = "noopener noreferrer">Términos y Condiciones</a> a su disposición, deberá abstenerse de acceder o utilizar el Portal.</strong></p>
            <p>El Usuario, entendido como aquella persona que realiza el uso o accede, mediante equipo de cómputo y/o cualquier equipo de comunicación o dispositivo, al Portal (en adelante el "Usuario"), acepta plena y sin reserva todas y cada una de las disposiciones incluidas en el presente Aviso de Privacidad.</p>
            <p><strong className = "privacy__titles">Responsable del tratamiento de sus datos personales.</strong> Para El Recuento del Mercado<sup>®</sup> (en adelante la "Empresa") la seguridad de los Usuarios es nuestra prioridad, por lo que protegemos sus datos personales mediante el uso, aplicación y mantenimiento de altas medidas de seguridad técnicas, físicas y administrativas.</p>
            <p>Como Usuario, usted tiene la oportunidad de escoger entre una amplia gama de productos y servicios a través de nuestro Portal, sabiendo que sus datos personales estarán protegidos y serán tratados de manera confidencial. Les informamos que el RESPONSABLE de recabar y dar tratamiento y/o utilizar los datos personales que el Usuario proporcione a través del Portal, es la Empresa, así como sus subsidiarias, asociadas, sociedades controladoras y afiliadas.</p>
            <p><strong className = "privacy__titles">Domicilio del responsable.</strong> Para efectos del presente aviso de privacidad, la Empresa señala, individualmente, como su domicilio, el ubicado en Salvatierra Mz. 253, San Felipe de Jesús, Gustavo A. Madero, Ciudad de México, C. P. 07510</p>
            <p><strong className = "privacy__titles">Datos personales que pueden ser recolectados.</strong> Los datos personales que la Empresa puede recopilar del Usuario al utilizar el Portal y/o contratar nuestros servicios y productos, son los siguientes:</p>
            <ol>
                <li>Nombre</li>
                <li>Correo electrónico</li>
                <li>Teléfono</li>
            </ol>
            <p><strong className = "privacy__titles">Finalidades del tratamiento de sus datos personales.</strong> Los datos personales que la Empresa recabe serán utilizados para atender las siguientes finalidades:</p>
            <ol>
                <li>Notificaciones de nuevas publicaciones, envío de novedades y promociones, seguimiento de contrataciones.</li>
                <li>Para (i) Integrar expedientes, bases de datos y sistemas necesarios para llevar a cabo las operaciones y servicios correspondientes; (ii) Para reclamar la entrega de premios y/o promociones; (iii) Para llevar a cabo análisis internos.</li>
                <li>De manera adicional, se podrán utilizar sus datos personales para las siguiente finalidades secundarias: (i) Mercadotecnia, publicidad y prospección comercial; (ii) Ofrecerle, en su caso, otros productos y servicios propios de la Empresa o de cualquiera de sus afiliadas, subsidiarias, sociedades controladoras, asociadas, comisionistas o sociedades; (iii) Remitirle promociones de otros bienes, servicios y/o productos; (iv) Para realizar análisis estadísticos, de generación de modelos de información y/o perfiles de comportamiento actual y predictivo y (v) Para participar en encuestas, sorteos y promociones.</li>
            </ol>
            <p><strong className = "privacy__titles">Opciones y medios para limitar el uso o divulgación de los datos.</strong> La Empresa tiene implementadas medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales, mismas que igualmente exigimos sean cumplidas por los proveedores de servicios que contratamos. Usted podrá limitar el uso o divulgación de sus datos personales enviando un correo electrónico a <a href = "mailto:contacto@recuentomercado.com"target = "_blank" rel = "noopener noreferrer" >contacto@recuentomercado.com</a> indicándonos en el cuerpo del correo su nombre completo y que dato desea que no sea divulgado, de proceder su solicitud, se le registrará en el listado de exclusión.</p>
            <p><strong className = "privacy__titles">Medios para ejercer los derechos de acceso, rectificación, cancelación u oposición (Derechos ARCO).</strong> Puede enviar un correo electrónico a <a href = "mailto:contacto@recuentomercado.com" target = "_blank" rel = "noopener noreferrer">contacto@recuentomercado.com</a>, en cualquier momento, para ejercer sus Derechos de Acceso, Rectificación, Cancelación u Oposición ("Derechos ARCO"). Para ejercer los Derechos ARCO, usted (o su representante legal), deberá presentar la solicitud, identificándose con la siguiente documentación:</p>
            <ol>
                <li>Nombre del usuario o titular.</li>
                <li>Domicilio del usuario o titular u otro medio para comunicarle la respuesta a su solicitud.</li>
                <li>Documentos que acrediten su identidad (IFE/INE o pasaporte) y, en su caso, los documentos que acrediten la representación legal del solicitante.</li>
                <li>Una descripción de la información / los datos sobre los que está tratando de ejercer sus derechos ARCO y los derechos que le gustaría ejercer.</li>
            </ol>
            <p>Si uno o más de los documentos mencionados anteriormente no están incluidos, y/o los documentos tienen errores u omisiones, la Empresa le notificará dentro de los 3 días hábiles posteriores a la recepción de la solicitud y le pedirá los documentos faltantes y/o las correcciones pertinentes; tendrá 5 días hábiles a partir de esa notificación para proporcionar la información actualizada, de lo contrato, la solicitud se entenderá como no presentada.</p>
            <p><strong className = "privacy__titles">Transferencia de datos personales.</strong> La Empresa podrá divulgar sus datos personales a aquellos terceros que, en virtud de los servicios y productos ofrecidos, necesiten conocerlos para cumplir cabalmente con los mismos.</p>
            <p>Asimismo, la Empresa puede divulgar su información a las autoridades competentes en términos de la legislación aplicable; cualquier transferencia de sus datos personales sin consentimiento se realizará de acuerdo con el Artículo 37 de la LFPDPPP.</p>
            <p><strong className = "privacy__titles">Web Beacons.</strong> La Empresa, podrá o no, utilizar tecnologías de seguimiento tales como Web Beacons, similares a las Cookies, para recabar datos sobre sus visitas en el Portal; éstas son pequeñas imágenes electrónicas incrustadas en el contenido web o mensajes de correo electróncio, las cuales no se encuentran normalmente visibles para los Usuarios y que nos permiten generar contenidos casi personalizados para ofrecerle una mejor experiencia cuando utilice nuestro Portal.</p>
            <p>En caso de no estar de acuerdo con cualquiera de las condiciones aquí establecidas, el Usuario siempre podrá cambiar la configuración de su navegador.</p>
            <p><strong className = "privacy__titles">Modificaciones al Aviso de Privacidad.</strong> El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas, entre otras cosas, por nuevos requerimientos legales; necesidades propias de la Empresa, por los productos o servicios que ofrecemos; por nuestras prácticas de privacidad; por cambios en nuestro modelo de negocio, o por otras causas.</p>
            <p>Cualquier modificación al presente Aviso de Privacidad le será notificada a través de cualquiera de los siguientes medios: un comunicado por escrito enviado a su domicilio; por el correo electrónico que señale; un mensaje a su teléfono móvil; un mensaje dado a conocer a través del Portal o de cualquier medio electrónico que utilice para celebrar operaciones, o bien, en periódicos de amplia circulación el domicilio social de la Empresa.</p>
        </div>
        </>
    )
}