import {basePath, apiVersion} from "./config";

export function getVideosApi(limit, page){
    const url = `${basePath}/${apiVersion}/get-paginated-videos?limit=${limit}&page=${page}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result
    })
    .catch(err => {
        return err;
    });
}

export function deleteVideoApi(token, id){
    const url = `${basePath}/${apiVersion}/delete-video/${id}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function addVideoApi(token,post){
    const url = `${basePath}/${apiVersion}/add-video`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(post)
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function updateVideoApi(token, id, data) {
    const url = `${basePath}/${apiVersion}/update-video/${id}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function getVideoApi(urlPost) {
    const url = `${basePath}/${apiVersion}/get-video/${urlPost}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function getAllVideosApi(search) {
    const url = `${basePath}/${apiVersion}/get-all-videos/${search}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}

export function getRelatedVideosApi(tag) {
    const url = `${basePath}/${apiVersion}/get-videos-related/${tag}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result;
    })
    .catch(err => {
        return err;
    });
}