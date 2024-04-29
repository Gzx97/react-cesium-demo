import BaseApi from '../base.api';

class BeltApi extends BaseApi {
    private baseUri = '/backend/asset/belts';
    private baseUri2 = '/backend/asset/belt-monitoring-settings';
    /** 新增*/
    addBelt(params: Record<string, any>): Promise<any> {
        return this.request.post(`${this.baseUri}`, params);
    }
    /** 根据id查询*/
    getBeltById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}`);
    }
    /** 编辑 */
    editBeltById(id: string, data: Record<string, any>): Promise<any> {
        return this.request.put(`${this.baseUri}/${id}`, data);
    }
    /** 获取监测项 */
    queryBeltMonitoringSettingsItems(): Promise<any> {
        return this.request.get(`${this.baseUri2}/monitoring-items`);
    }
    importExcel(data: any) {
        return this.request.post(`${this.baseUri}/import`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    downloadData(params: any) {
        return this.request.get(`${this.baseUri}/export`, {
            responseType: 'arraybuffer',
            params: params,
        });
    }
}

export default BeltApi;
