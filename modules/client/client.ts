import axios, { AxiosInstance } from 'axios';

class Client {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '',
      timeout: 9000,
    });
  }

  /**
   * Gets item from window.location.search string
   * @param {string} query item to be retrieved
   * @returns {string | null} item from window.location.search
   */
  getItemFromSearch(query: string): string | null {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(query);
  }

  /**
   * Gets item from window.location.hash
   * @param {number} lengthBeforeHash length of the url string before #
   * @param {string} query item to be retrieved
   * @returns {string} item from window.location.hash
   */
  getItemFromHash(lengthBeforeHash: number, query: string): string {
    const urlHash = window.location.hash;
    const params = urlHash
      .substr(lengthBeforeHash)
      .split('&')
      .reduce(function (res: Record<string, string>, item: string) {
        var parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
      }, {});
    return params[query];
  }

  User() {
    return {
      getUser: (id: string) => this.instance.get(`/api/users/${id}`),
      getAllUsers: () =>
        this.instance({
          method: 'GET',
          url: '/api/users/',
        }),
      createUser: (data: Record<string, any>) =>
        this.instance.post(`/api/users/`, data),
      updateUser: (id: string, data: Record<string, any>) =>
        this.instance.patch(`/api/users/${id}`, data),
      deleteUser: (id: string) => this.instance.delete(`/api/users/${id}`),
    };
  }

  Visit() {
    return {
      getVisit: (id: string) => this.instance.get(`/api/visits/${id}`),
      getAllVisits: () =>
        this.instance({
          method: 'GET',
          url: '/api/visits/',
        }),
      createVisit: (data: Record<string, any>) =>
        this.instance.post(`/api/visits/`, data),
      updateVisit: (id: string, data: Record<string, any>) =>
        this.instance.patch(`/api/visits/${id}`, data),
      deleteVisit: (id: string) => this.instance.delete(`/api/visits/${id}`),
    };
  }

  Event() {
    return {
      getEvent: (id: string) => this.instance.get(`/api/events/${id}`),
      getAllEvents: () =>
        this.instance({
          method: 'GET',
          url: '/api/events/',
        }),
      createEvent: (data: Record<string, any>) =>
        this.instance.post(`/api/events/`, data),
      updateEvent: (id: string, data: Record<string, any>) =>
        this.instance.patch(`/api/events/${id}`, data),
      deleteEvent: (id: string) => this.instance.delete(`/api/events/${id}`),
    };
  }
}

export default Client;
