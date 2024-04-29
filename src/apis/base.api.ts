import { AxiosInstance } from 'axios';
import axiosInstance from '../commons/lib/asiox.lib';

class BaseApi {
    protected request: AxiosInstance;
    constructor() {
        this.request = axiosInstance;
    }
}
export default BaseApi;
