import {basePath, apiVersion} from "./config";

export function getCategoriesApi() {
    const url = `${basePath}/${apiVersion}/get-categories`;

    return fetch(url)
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

export function updateCategoryApi(token, categoryId, data) {
    const url = `${basePath}/${apiVersion}/update-category/${categoryId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });
}

export function activateCategoryApi(token, categoryId, status) {
    const url = `${basePath}/${apiVersion}/activate-category/${categoryId}`;

    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({active: status})
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });

}

export function addCategoryApi(token,category) {
    const url = `${basePath}/${apiVersion}/add-category/`;

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(category)
    }

    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });
}

export function deleteCategoryApi(token,categoryId) {
    const url = `${basePath}/${apiVersion}/delete-category/${categoryId}`;

    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    }

    return fetch(url,params)
    .then(response => {
        return response.json();
    })
    .then(result => {
        return result.message;
    })
    .catch(err => {
        return err.message;
    });
}

export function getCategoryApi(tag){
    const url = `${basePath}/${apiVersion}/get-category/${tag}`;

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

export function getCategoryTagApi(tag){
    const url = `${basePath}/${apiVersion}/get-category-tag/${tag}`;

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