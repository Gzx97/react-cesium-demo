import { DETECTION_TYPE, DEVIATION_TYPE } from './enums';
import * as Icons from '@/images/index';
import { DetectionType } from './types';
export const Demo = {};

export const detectionTypeConfig: DetectionType[] = [
    {
        type: DETECTION_TYPE.BELT_TORN,
        label: '皮带撕裂',
        Icon: Icons.Torn,
        position: { top: '48%', left: '30%' },
        direction: 'bottom',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheLacerationMonitoring',
    },
    {
        type: DETECTION_TYPE.BLOCKAGE,
        label: '堵料检测',
        Icon: Icons.Blockage,
        position: { top: '20%', left: '30%' },
        direction: 'top',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheBlockingMonitoring',
    },
    {
        type: DETECTION_TYPE.NOISE_ROLLER,
        label: '托辊异音',
        Icon: Icons.Noise,
        position: { top: '45%', left: '40%' },
        direction: 'top',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheAbnormalSoundDetection',
    },
    {
        type: DETECTION_TYPE.SLIPPAGE,
        label: '打滑监测',
        Icon: Icons.Slippage,
        position: { top: '55%', left: '50%' },
        direction: 'bottom',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheBeltSlip',
    },
    {
        type: DETECTION_TYPE.SIZE_DETECTION,
        label: '粒度监测',
        Icon: Icons.Size,
        position: { top: '48%', left: '83%' },
        direction: 'top',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheGranularityMonitoring',
    },
    {
        type: DETECTION_TYPE.SURFACE_DEFECTS,
        label: '表面缺陷',
        Icon: Icons.SurfaceDefects,
        position: { top: '52%', left: '92%' },
        direction: 'bottom',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheSurfaceDefectMonitoring',
    },
    {
        type: DETECTION_TYPE.DEVIATION,
        label: '跑偏监测',
        Icon: Icons.Surface,
        position: { top: '44%', left: '62%' },
        direction: 'top',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubheBeltDeviation',
    },
    {
        type: DETECTION_TYPE.PREVENT_BURN_DAMAGE,
        label: '防烧损',
        Icon: Icons.PreventBurnDamageDetection,
        position: { top: '50%', left: '71%' },
        direction: 'bottom',
        realTimeUrl: '/real-time-view',
        alarmUrl: '/alarm-log',
        name: 'DubhePreventBurnDamage',
    },
];
export const MaterialType: { [key: string]: string } = {
    ORE: '矿石',
    COKE: '焦炭',
    UNKNOWN: '未知',
};

export const deviationTypeConfig: {
    [key in DEVIATION_TYPE]: { label: string; color: string };
} = {
    [DEVIATION_TYPE.NORMAL]: {
        label: '正常',
        color: '#5FA45D',
    },
    [DEVIATION_TYPE.DEVIATION]: {
        label: '跑偏',
        color: '#BD3124',
    },
    [DEVIATION_TYPE.SLIGHT_DEVIATION]: {
        label: '轻微跑偏',
        color: '#FF8600',
    },
    [DEVIATION_TYPE.SEVERE_DEVIATION]: {
        label: '严重跑偏',
        color: '#BD3124',
    },
};
