import axios from 'axios';

export default class FileUploadService {
  constructor() {
    this.instance = axios.create();

    Object.assign(this, this.instance);

    this.instance.interceptors.request.use(
      axiosConfig => ({
        ...axiosConfig,
        headers: {
          ...axiosConfig.headers,
        },
      }),
      err => Promise.reject(err),
    );

    this.instance.interceptors.response.use(
      resp => resp,
      err => {
        console.error(err);
        return Promise.reject(err);
      },
    );
  }
}
