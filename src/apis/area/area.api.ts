import BaseApi from '../base.api';

class AreaApi extends BaseApi {
    private baseUri = '/backend/asset/belts';

    /** 根据id查询*/
    getBeltById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}`);
    }

    /** 所有table */
    queryBeltsPage(params: {
        pageNum: number;
        pageSize: number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri}/page`, { params });
    }

    downloadData(params: any) {
        return this.request.get(`${this.baseUri}/export`, {
            responseType: 'arraybuffer',
            params: params,
        });
    }
}

export default AreaApi;
