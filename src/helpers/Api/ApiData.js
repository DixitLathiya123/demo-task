import { API } from '../../config/api.config';
import Auth from '../auth';
export const BaseURL = API.hostUrl;
const axios = require('axios');

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};

export const ApiPostNoAuth = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(BaseURL + type, userData, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data) {
                    let errorMessage = 'Server Error Please try again';
                    if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                        errorMessage = error.response.data.error;
                    }

                    if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }

                    if (error.response.status === 401) {
                        localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject({ message: errorMessage });
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiGetNoAuth = (type) => {
    return new Promise((resolve, reject) => {
        axios.get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                    if (error.response.status === 401) {
                        localStorage.clear();
                        window.location.reload()
                        return
                    }
                } else {
                    reject(error);
                }
            });
    });
}

export const Api = (type, methodtype, userData) => {
    return new Promise((resolve, reject) => {
        userData = userData || {};
        axios({
            url: BaseURL + type,
            headers: getHttpOptions(),
            data: userData,
            type: methodtype
        })
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data) {
                    let errorMessage = 'Server Error Please try again';
                    if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                        errorMessage = error.response.data.error;
                    }

                    if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }

                    if (error.response.status === 401) {
                        localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject({ message: errorMessage });
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiGet = (type) => {
    return new Promise((resolve, reject) => {
        axios.get(BaseURL + type, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data) {
                    let errorMessage = 'Server Error Please try again';
                    if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                        errorMessage = error.response.data.error;
                    }

                    if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                        errorMessage = error.response.data.message;
                    }

                    if (error.response.status === 401) {
                        localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject({ message: errorMessage });
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPost = (type, userData, options) => {
    return new Promise((resolve, reject) => {
        axios.post(BaseURL + type, userData,  {...getHttpOptions(), ...options})
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                error.response && error.response.hasOwnProperty('data') && error.response.data) {
                let errorMessage = 'Server Error Please try again';
                if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }

                if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.reload()
                    return
                }
                reject({ message: errorMessage });
            } else {
                reject(error);
            }
            });
    });
}

export const ApiPut = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.put(BaseURL + type, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                error.response && error.response.hasOwnProperty('data') && error.response.data) {
                let errorMessage = 'Server Error Please try again';
                if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }

                if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.reload()
                    return
                }
                reject({ message: errorMessage });
            } else {
                reject(error);
            }
            });
    });
}

export const ApiPatch = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.patch(BaseURL + type, userData, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                error.response && error.response.hasOwnProperty('data') && error.response.data) {
                let errorMessage = 'Server Error Please try again';
                if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }

                if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.reload()
                    return
                }
                reject({ message: errorMessage });
            } else {
                reject(error);
            }
            });
    });
}

export const ApiDelete = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.delete(BaseURL + type, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                error.response && error.response.hasOwnProperty('data') && error.response.data) {
                let errorMessage = 'Server Error Please try again';
                if (error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }

                if (error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

                if (error.response.status === 401) {
                    localStorage.clear();
                    window.location.reload()
                    return
                }
                reject({ message: errorMessage });
            } else {
                reject(error);
            }
            });
    });
}

export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {};

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['Authorization'] = Auth.getToken();
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}
