import { deviceApi } from '@/apis';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';

/** 获取所有设备 */
const useQueryDeviceList = () => {
    /** 查询监控设备*/
    const {
        data: deviceList,
        run: queryDeviceList,
        loading,
    } = useRequest((id) => deviceApi.queryDeviceList(id), {
        manual: true,
    });
    const deviceListOptions = useMemo(() => {
        return deviceList?.map((item: any) => {
            return {
                label: item.remarkName,
                value: item.name,
            };
        });
    }, [deviceList]);
    return {
        data: deviceList,
        deviceListOptions,
        loading,
        queryDeviceList,
    };
};
export default useQueryDeviceList;
