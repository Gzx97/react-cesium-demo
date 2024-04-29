import { DETECTION_TYPE } from './enums';
import * as Icons from '@/images/index';
export type TableParams = {
    pageSize: number;
    pageNum: number;
    total?: number;
    [key: string]: any;
};

export type OptionType = {
    value?: number;
    key: number;
    label?: string;
    id?: number;
    name?: string;
    title?: string;
};
export type DataNode = {
    title: any;
    key: string;
    isLeaf?: boolean;
    leaf?: boolean;
    color?: string;
    disabled?: boolean;
    enabled?: boolean; //在线状态
    children?: DataNode[];
};

export type DetectionType = {
    type: DETECTION_TYPE;
    label: string;
    Icon: Icons.IconType;
    style?: React.CSSProperties;
    position?: { top: string; left: string };
    status?: '';
    direction?: 'top' | 'bottom';
    show?: boolean;
    realTimeUrl?: string;
    alarmUrl?: string;
    name?: string;
};
