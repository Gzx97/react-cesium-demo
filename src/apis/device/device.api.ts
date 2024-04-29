import BaseApi from '../base.api';

class DeviceApi extends BaseApi {
    // /api/backend/device/devices/{id}/streaming/stop
    // /api/backend/device-data/device-datas/page
    private baseUri = '/backend/device/devices'; //设备
    private baseUri2 = '/backend/device-data/device-datas'; //设备数据

    /** 开始推流*/
    streamingStart(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}/streaming/start`);
    }
    /** 结束推流*/
    streamingStop(id: string): Promise<any> {
        return this.request.get(`${this.baseUri}/${id}/streaming/stop`);
    }
    /** 查询监控设备*/
    queryDeviceList(id: string): Promise<any> {
        // return Promise.resolve([
        //     { label: '监控设备1', value: '1' },
        //     { label: '监控设备2', value: '2' },
        // ]);
        return this.request.get(`${this.baseUri}/list/${id}`);
    }
    /** 查询设备数据(表格)*/
    queryDeviceDataPage(params: {
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
        return this.request.get(`${this.baseUri2}/page`, { params });
    }
    /** 查询设备数据（折线图）*/
    queryLine(params: {
        beltId?: string;
        deviceName?: 'string';
        startTime?: string | number;
        endTime?: string | number;
        [key: string]: any;
    }): Promise<any> {
        return this.request.get(`${this.baseUri2}/line`, { params });
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

export default DeviceApi;
