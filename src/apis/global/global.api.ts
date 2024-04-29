import BaseApi from '../base.api';

class GlobalApi extends BaseApi {
    private baseUri = '/backend/asset/belts/region-tree';

    /** 获取设备树形结构*/
    getRegionTree(): Promise<any> {
        return this.request.get(`${this.baseUri}`);
    }
}

export default GlobalApi;
