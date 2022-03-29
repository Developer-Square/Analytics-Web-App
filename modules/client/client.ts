import axios, { AxiosInstance } from 'axios';
import config from '../config/config';

class Client {
    instance: AxiosInstance;

    constructor() {
        this.instance =  axios.create({
            baseURL: config.apiKey,
            timeout: 9000,
        })
    }

    /**
     * Gets item from window.location.search string
     * @param {string} query item to be retrieved
     * @returns {string | null} item from window.location.search
     */
    getItemFromSearch(query: string): string | null {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(query)
    }

    /**
     * Gets item from window.location.hash
     * @param {number} lengthBeforeHash length of the url string before #
     * @param {string} query item to be retrieved 
     * @returns {string} item from window.location.hash
     */
    getItemFromHash(lengthBeforeHash: number, query: string): string {
        const urlHash = window.location.hash
        const params = urlHash.substr(lengthBeforeHash).split('&').reduce(function (res: Record<string, string>, item: string) {
            var parts = item.split('=');
            res[parts[0]] = parts[1];
            return res;
        }, {});
        return params[query];
    }

    User() {
        return {
            getUser: (id: string) => this.instance.get(`users/${id}`),
            getAllUsers: () => this.instance({
                method: 'GET',
                url: 'users/',
            }),
            createUser: (data: Record<string, any>) => this.instance.post(`users/`, data),
            updateUser: (id: string, data: Record<string, any>) => this.instance.patch(`users/${id}`, data),
            deleteUser: (id: string) => this.instance.delete(`users/${id}`),
        }
    }

    Visit() {
        return {
            getVisit: (id: string) => this.instance.get(`visits/${id}`),
            getAllVisits: () => this.instance({
                method: 'GET',
                url: 'visits/',
            }),
            createVisit: (data: Record<string, any>) => this.instance.post(`visits/`, data),
            updateVisit: (id: string, data: Record<string, any>) => this.instance.patch(`visits/${id}`, data),
            deleteVisit: (id: string) => this.instance.delete(`visits/${id}`),
        }
    }

    Event() {
        return {
            getEvent: (id: string) => this.instance.get(`events/${id}`),
            getAllEvents: () => this.instance({
                method: 'GET',
                url: 'events/',
            }),
            createEvent: (data: Record<string, any>) => this.instance.post(`events/`, data),
            updateEvent: (id: string, data: Record<string, any>) => this.instance.patch(`events/${id}`, data),
            deleteEvent: (id: string) => this.instance.delete(`events/${id}`),
        }
    }
}

export default Client;
