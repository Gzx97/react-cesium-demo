import { beltApi } from '@/apis';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import _ from 'lodash';

export const useBeltMonitoringSettingsItems = () => {
    const { data: settingsItems, run: queryBeltMonitoringSettingsItems } =
        useRequest(() => beltApi.queryBeltMonitoringSettingsItems(), {
            manual: true,
        });
    const findSettingsItemsLabelByValue = (value: string) => {
        return _.find(settingsItems, { value: value })?.label;
    };
    useEffect(() => {
        queryBeltMonitoringSettingsItems();
    }, []);
    return {
        settingsItemsOption: settingsItems,
        findSettingsItemsLabelByValue,
    };
};
