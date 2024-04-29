import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.less';
import ScaleLayout from './components/ScaleLayout';
import { LargeScreenContextProvider } from './components/LargeScreenProvider';
import LOGO from './images/logo.png';
import CLOSE from './images/close.png';
// import BELT_IMG from './images/belt_1.jpg';
import BELT_IMG from './images/belt.gif';
// import BELT_IMG from './images/belt_2.png';
import TreeSelectComponent from '@/components/tree-select-component';
import { useRequest, useSize } from 'ahooks';
import { globalApi } from '@/apis';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import _ from 'lodash';
import { findParentTitles } from '@/commons/util/findTreeParentTitles';
import { Breadcrumb, Descriptions, Empty, Spin } from 'antd';
import CustomizePopover from './components/CustomizePopover';
import { DETECTION_TYPE, DEVIATION_TYPE } from '@/constants/enums';
import {
    MaterialType,
    detectionTypeConfig,
    deviationTypeConfig,
} from '@/constants/consts';
import { DetectionType } from '@/constants/types';
import { LoadingOutlined } from '@ant-design/icons';
import { WebSocketContext } from '@/components/web-socket-provider';
import CurrentTimeComponent from '@/components/current-time';
import { useSearchParams } from 'react-router-dom';
/** 粒度 */
const WS_SIZE_URL = '/user/topic/device-data/real-time/material-size-detection';
/** 堵料 */
const WS_BLOCKAGE_URL =
    '/user/topic/device-data/real-time/material-blockage-detection';
/** 跑偏 */
const WS_DEVIATION_URL =
    '/user/topic/device-data/real-time/belt-deviation-detection';
/** 打滑 */
const WS_SLIPPAGE_URL =
    '/user/topic/device-data/real-time/belt-slipping-detection';
/** 表面缺陷 */
const WS_SURFACE_DEFECTS_URL =
    '/user/topic/device-data/real-time/belt-surface-defect-detection';
/** 撕裂 */
const WS_LACERATION_URL =
    '/user/topic/device-data/real-time/belt-laceration-detection';
/** 防烧损 */
const WS_BURN_URL =
    '/user/topic/device-data/real-time/prevent-burn-damage-detection';
/** 托辊异音 */
const WS_SOUND_URL =
    '/user/topic/device-data/real-time/abnormal-sound-detection';

const WS_SEND_BELT_ID_URL = '/app/belt-id';

const descriptionsConfig = {
    contentStyle: { color: 'white' },
    labelStyle: { color: 'white' },
    column: 1,
};

// contentStyle={{
//   color: 'white',
// }}
// labelStyle={{
//   color: 'white',
// }}
// column={1}
const LargeScreenPage: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const wrapperSize = useSize(wrapperRef);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const { connected, subscribe, unsubscribe, send } =
        useContext(WebSocketContext);
    const [selectedKey, setSelectedKey] = useState<string>();
    const [sizeData, setSizeData] = useState<any>();
    const [blockageData, setBlockageData] = useState<any>();
    const [deviationData, setDeviationData] = useState<any>();
    const [slippageData, setSlippageData] = useState<any>();
    const [surfaceData, setSurfaceData] = useState<any>(); //表面缺陷
    const [lacerationData, setLacerationData] = useState<any>(); //撕裂
    const [burnData, setBurnData] = useState<any>(); //防烧损
    const [soundData, setSoundData] = useState<any>(); //托辊异音
    const [subscribeIds, setSubscribe] = useState<string[]>();
    const [searchParams] = useSearchParams();
    /** 获取tree数据 */
    const { loading, data: treeData1 } = useRequest(() =>
        globalApi.getRegionTree()
    );
    const newTreeData = useMemo(() => {
        if (isNilEmpty(treeData1) || !_.isArray(treeData1)) return [];
        return [...treeData1];
    }, [treeData1]);

    const titles = useMemo(() => {
        if (newTreeData && selectedKey) {
            return findParentTitles(newTreeData, selectedKey);
        }
    }, [newTreeData, selectedKey]);

    const renderPointCard = (item: DetectionType) => {
        const { type } = item;
        switch (type) {
            case DETECTION_TYPE.NOISE_ROLLER:
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="设备状态">
                            {soundData?.alarmed ? '存在异音' : '正常'}
                        </Descriptions.Item>
                        <Descriptions.Item label="异常类型">
                            {/* {soundData?.data} */}
                            --
                        </Descriptions.Item>
                    </Descriptions>
                );
            case DETECTION_TYPE.PREVENT_BURN_DAMAGE:
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="设备状态">
                            {burnData?.alarmed ? '烧损' : '正常'}
                        </Descriptions.Item>
                        <Descriptions.Item label="平均温度">
                            {burnData?.data?.avgTemperature}
                        </Descriptions.Item>
                        <Descriptions.Item label="水压（MPa）">
                            {burnData?.data?.waterPressure}
                        </Descriptions.Item>
                        <Descriptions.Item label="流量（m³/s）">
                            {burnData?.data?.waterFlow}
                        </Descriptions.Item>
                    </Descriptions>
                );
            case DETECTION_TYPE.BELT_TORN:
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="设备状态">
                            {lacerationData?.alarmed ? '撕裂' : '正常'}
                        </Descriptions.Item>
                        {/* <Descriptions.Item label="裂纹尺寸">
                            长20mm 宽17mm
                        </Descriptions.Item> */}
                    </Descriptions>
                );
            case DETECTION_TYPE.SURFACE_DEFECTS:
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="设备状态">
                            {surfaceData?.alarmed ? '异常' : '正常'}
                        </Descriptions.Item>
                    </Descriptions>
                );

            case DETECTION_TYPE.BLOCKAGE:
                if (isNilEmpty(blockageData?.data)) {
                    return <Empty description="" />;
                }
                return (
                    <>
                        {blockageData?.data?.map(
                            (item: Record<string, any>) => {
                                return (
                                    <Descriptions {...descriptionsConfig}>
                                        <Descriptions.Item label="点位名称">
                                            {item?.pointName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="当前状态">
                                            {item?.blocked ? '堵料' : '正常'}
                                        </Descriptions.Item>
                                    </Descriptions>
                                );
                            }
                        )}
                    </>
                );
            case DETECTION_TYPE.DEVIATION:
                if (isNilEmpty(deviationData?.data)) {
                    return <Empty description="" />;
                }
                return (
                    <Descriptions {...descriptionsConfig}>
                        {deviationData?.data?.map(
                            (item: Record<string, any>) => {
                                return (
                                    <>
                                        <Descriptions.Item label="跑偏点">
                                            {item?.pointName}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="跑偏">
                                            {
                                                deviationTypeConfig?.[
                                                    item.deviated as DEVIATION_TYPE
                                                ].label
                                            }
                                        </Descriptions.Item>
                                    </>
                                );
                            }
                        )}
                    </Descriptions>
                );
            case DETECTION_TYPE.SLIPPAGE:
                if (isNilEmpty(slippageData?.data)) {
                    return <Empty description="" />;
                }
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="速度" span={16}>
                            {slippageData?.data?.speed}m/s
                        </Descriptions.Item>
                        <Descriptions.Item label="打滑" span={16}>
                            {slippageData?.data?.slipped ? '打滑' : '正常'}
                        </Descriptions.Item>
                    </Descriptions>
                );
            case DETECTION_TYPE.SIZE_DETECTION:
                if (isNilEmpty(sizeData?.data)) {
                    return <Empty description="" />;
                }
                const {
                    materialType,
                    particleAvgSize,
                    particleMaxSize,
                    particleTotal,
                } = sizeData?.data;
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="物料类型" span={16}>
                            {MaterialType?.[materialType] ?? '--'}
                        </Descriptions.Item>
                        <Descriptions.Item label="平均粒度" span={16}>
                            {particleAvgSize ?? '--'}
                        </Descriptions.Item>
                        <Descriptions.Item label="最大粒度" span={16}>
                            {particleMaxSize ?? '--'}
                        </Descriptions.Item>
                        <Descriptions.Item label="颗粒数" span={16}>
                            {particleTotal ?? '--'}
                        </Descriptions.Item>
                    </Descriptions>
                );
            default:
                return (
                    <Descriptions {...descriptionsConfig}>
                        <Descriptions.Item label="当前状态">
                            --
                        </Descriptions.Item>
                    </Descriptions>
                );
        }
    };
    const setStates = (url: string, data: any) => {
        switch (url) {
            case WS_SIZE_URL:
                setSizeData(data);
                break;
            case WS_BLOCKAGE_URL:
                setBlockageData(data);
                break;
            case WS_DEVIATION_URL:
                setDeviationData(data);
                break;
            case WS_SLIPPAGE_URL:
                setSlippageData(data);
                break;
            case WS_SURFACE_DEFECTS_URL:
                setSurfaceData(data);
                break;
            case WS_LACERATION_URL:
                setLacerationData(data);
                break;
            case WS_BURN_URL:
                setBurnData(data);
                break;

            case WS_SOUND_URL:
                setSoundData(data);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        if (connected) {
            const ids = [
                WS_SIZE_URL,
                WS_BLOCKAGE_URL,
                WS_DEVIATION_URL,
                WS_SLIPPAGE_URL,
                WS_SURFACE_DEFECTS_URL,
                WS_LACERATION_URL,
                WS_BURN_URL,
                WS_SOUND_URL,
            ].map((url) => {
                const stompCameraSubscription = subscribe(
                    url,
                    (message) => {
                        const data = JSON.parse(message.body);
                        setStates(url, data);
                    },
                    {}
                );
                return stompCameraSubscription?.id;
            });
            setSubscribe(ids as string[]);
        }
    }, [connected]);
    useEffect(() => {
        if (connected) {
            send(WS_SEND_BELT_ID_URL, {}, { beltId: selectedKey });
        }
    }, [selectedKey, connected]);
    useEffect(() => {
        return () => {
            for (var i = 0; i < 1000; i++) {
                !isNilEmpty(subscribeIds) && unsubscribe?.(`sub-${i}`, {});
            }
            subscribeIds?.forEach((id) => {
                id && unsubscribe?.(id, {});
            });
        };
    }, [subscribeIds, unsubscribe]);
    useEffect(() => {
        // console.log('堵料 blockageData', blockageData);
        // console.log('粒度 sizeData', sizeData);
        // console.log('跑偏 deviationData', deviationData);
        // console.log('打滑 slippageData', slippageData);
    }, [blockageData, sizeData, deviationData, slippageData]);
    /** 获取子应用互相跳转 路由携带的beltId */
    useEffect(() => {
        const paramBeltId = searchParams.get?.('beltId');
        if (paramBeltId) {
            setSelectedKey(paramBeltId);
        }
    }, []);
    useEffect(() => {
        selectedKey && localStorage.setItem('selectedKey', `${selectedKey}`);
    }, [selectedKey]);

    return (
        <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
            <ScaleLayout
                width={wrapperSize?.width}
                height={wrapperSize?.height}
                className={styles['outWrapper']}
            >
                <LargeScreenContextProvider value={{}}>
                    <div className={styles.wrapper}>
                        {loading && (
                            <div className={styles['loadingWrapper']}>
                                <LoadingOutlined
                                    className={styles['loadingIcon']}
                                />
                            </div>
                        )}

                        {/* --------头部--------- */}
                        <div className={styles['pageTop']}>
                            <h1
                                data-text="皮带管家全局大屏"
                                className={styles['title']}
                            >
                                皮带管家全局大屏
                            </h1>
                            <CurrentTimeComponent
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    textAlign: 'center',
                                    color: 'white',
                                    marginTop: 10,
                                    fontSize: 20,
                                }}
                            />
                            <div className={styles['logoWrapper']}>
                                <img
                                    src={LOGO}
                                    alt="logo"
                                    className={styles['logo']}
                                />
                            </div>
                            <div className={styles['buttonWrapper']}>
                                {/* <Button
                                className={styles['largeButton']}
                                type="primary"
                                onClick={handleNavigateMain}
                            >
                                管理后台
                            </Button> */}
                            </div>
                        </div>
                        {/* --------底部----- */}
                        <div className={styles['pageBot']}>
                            <div
                                style={{
                                    width: collapsed ? '20px' : '300px',
                                    // flex: collapsed ? '0 0 48px' : '0 0 300px',
                                    overflow: 'hidden',
                                    maxWidth: collapsed ? '20px' : '300px',
                                    minWidth: collapsed ? '20px' : '300px',
                                    overflowX: 'hidden',
                                    border: collapsed ? 'none' : '',
                                    boxShadow: collapsed ? 'none' : '',
                                    transition:
                                        'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s, opacity 0.3s ease 0s',
                                }}
                                className={styles['pageBotLeft']}
                            >
                                <div
                                    style={{ opacity: !collapsed ? '1' : '0' }}
                                >
                                    {!isNilEmpty(newTreeData) && (
                                        <div className={styles['treeWrapper']}>
                                            <div
                                                className={styles['viewTitle']}
                                            >
                                                区域视图
                                            </div>
                                            <TreeSelectComponent
                                                treeData={newTreeData}
                                                onSelect={(v) => {
                                                    const selectedKey = `${v?.[0]}`;
                                                    setSelectedKey(selectedKey);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={styles['closeIcon']}
                                    onClick={() => {
                                        setCollapsed(!collapsed);
                                    }}
                                >
                                    <img
                                        src={CLOSE}
                                        alt="close"
                                        style={{
                                            transform: collapsed
                                                ? 'rotateY(180deg)'
                                                : '',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={styles['pageBotRight']}>
                                <div className={styles['pageBotRightTop']}>
                                    <div className={styles.breadcrumb}>
                                        <Breadcrumb
                                            items={titles
                                                ?.map((title) => {
                                                    return { title };
                                                })
                                                .reverse()}
                                        />
                                    </div>
                                </div>

                                <div className={styles['pageBotRightBot']}>
                                    <div className={styles['beltName']}>
                                        {titles?.[0]}
                                    </div>
                                    <div className={styles['imgBox']}>
                                        <div className={styles['imgOut']}>
                                            <img src={BELT_IMG} alt="皮带机" />
                                            {detectionTypeConfig.map((item) => {
                                                const dataSourceMap = [
                                                    {
                                                        data: blockageData,
                                                        type: DETECTION_TYPE.BLOCKAGE,
                                                    },
                                                    {
                                                        data: deviationData,
                                                        type: DETECTION_TYPE.DEVIATION,
                                                    },
                                                    {
                                                        data: slippageData,
                                                        type: DETECTION_TYPE.SLIPPAGE,
                                                    },
                                                    {
                                                        data: sizeData,
                                                        type: DETECTION_TYPE.SIZE_DETECTION,
                                                    },
                                                    {
                                                        data: surfaceData,
                                                        type: DETECTION_TYPE.SURFACE_DEFECTS,
                                                    },
                                                    {
                                                        data: lacerationData,
                                                        type: DETECTION_TYPE.BELT_TORN,
                                                    },
                                                    {
                                                        data: burnData,
                                                        type: DETECTION_TYPE.PREVENT_BURN_DAMAGE,
                                                    },
                                                    {
                                                        data: soundData,
                                                        type: DETECTION_TYPE.NOISE_ROLLER,
                                                    },
                                                ];

                                                const alertItems: DETECTION_TYPE[] =
                                                    [];
                                                dataSourceMap.forEach(
                                                    (item) => {
                                                        if (
                                                            item.data?.alarmed
                                                        ) {
                                                            alertItems.push(
                                                                item.type
                                                            );
                                                        }
                                                    }
                                                );
                                                return (
                                                    <CustomizePopover
                                                        key={item?.type}
                                                        isAlert={alertItems.includes(
                                                            item.type
                                                        )}
                                                        selectedKey={
                                                            selectedKey
                                                        }
                                                        {...item}
                                                    >
                                                        {renderPointCard(item)}
                                                    </CustomizePopover>
                                                );
                                            })}

                                            {/* <div className=''>sss</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </LargeScreenContextProvider>
            </ScaleLayout>
        </div>
    );
};

export default LargeScreenPage;
