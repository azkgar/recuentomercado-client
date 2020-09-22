import {basePath, apiVersion} from "./config";

export default function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/signup`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        if(result.user){
            return {
                ok: true,
                message: "Usuario creado"
            };
        } return {
            ok: false,
            message: result.message
        };
    })
    .catch(err => {
        return {
            ok: false,
            message: err.message
        }
    });
}

export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/signin`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err.message;
    });
}