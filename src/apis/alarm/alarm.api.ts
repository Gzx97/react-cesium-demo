import BaseApi from '../base.api';

class AlarmApi extends BaseApi {
    private baseUri = '/backend/alarm/alarm-logs'; //设备

    /** 查询设备数据(表格)*/
    queryAlarmLogPage(params: {
        pageNum: number;
        pageSize: number;
        beltId: string;
        deviceName?: string;
        startTime?: string | number;
        endTime?: string | number;
        [key: string]: any;
    }): Promise<any> {
        // return Promise.resolve({
        //     rows: [
        //         {
        //             name: '自己模拟',
        //             id: '1',
        //             code: '1',
        //             ipAddress: '192.168.0.0',
        //             type: '设备类型',
        //             status: 'CONNECTED',
        //         },
        //     ],
        //     pageSize: 10,
        //     pageNum: 1,
        //     total: 1,
        // });
        return this.request.get(`${this.baseUri}/page`, { params });
    }
    /** 根据id查询 */
    queryAlarmLogById(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}`);
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

export default AlarmApi;
