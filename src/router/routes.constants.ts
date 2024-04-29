type RoutesConstantsProps = {
    [key: string]: {
        key: string;
        path: (text?: string) => string;
        label?: string;
    };
};

export const RoutesConstants: RoutesConstantsProps = {
    GET_POSITION_PAGE: {
        key: 'setting',
        path: () => `/setting`,
        label: '数据统计',
    },
    CESIUM: {
        key: 'cesium',
        path: () => `/cesium`,
        label: 'cesium',
    },
    BELT_LARGE_SCREEN: {
        key: 'belt-large-screen',
        path: () => `/belt-large-screen`,
        label: '皮带机大屏',
    },
};
