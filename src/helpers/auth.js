import { STORAGEKEY } from '../config/app.config';

class Auth {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static setAuthToken(token) {
        localStorage.setItem(STORAGEKEY.token, token);
    }
    /*
  * Sets AuthData to localStorage
  * */
    static setAuthData(data) {
        localStorage.setItem(STORAGEKEY.authData, JSON.stringify(data));
    }

    /*
    * Get userData
    *
    * */
    static getAuthData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGEKEY.authData));
        } catch (e) {
            return {};
        }
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        return localStorage.getItem(STORAGEKEY.token) !== null;
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
        localStorage.removeItem(STORAGEKEY.token);
        localStorage.removeItem(STORAGEKEY.authData);
        localStorage.removeItem(STORAGEKEY.userData);
        localStorage.removeItem(STORAGEKEY.layoutData);
    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */
    static getToken() {
        return 'Bearer ' + localStorage.getItem(STORAGEKEY.token);
    }

    /*
    * Sets userData to localStorage
    * */
    static setUserData(data) {
        localStorage.setItem(STORAGEKEY.userData, JSON.stringify(data));
        if (this.subscribers && this.subscribers.userInfo) {
            this.subscribers.userInfo.forEach(subscriber => {
                subscriber();
            });
        }
    }

    /*
    * Get userData
    * */
    static getUserData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGEKEY.userData));
        } catch (e) {
            return {};
        }
    }

    static clearLocalStorage() {
        localStorage.clear();
        if (this.subscribers && this.subscribers.userInfo) {
            this.subscribers.userInfo.forEach(subscriber => {
                subscriber();
            });
        }
    }

    static subscribers = {
        userInfo: []
    }

    static addSubscriber(event, fn) {
        this.subscribers[event].push(fn);
    }

    static clearAllSubscriptions() {
        Object.keys(this.subscribers).forEach(event => {
            if (this.subscribers && this.subscribers[event]) {
                this.subscribers[event] = [];
            }
        });
    }


}

export default Auth;