import { DataNode } from 'antd/lib/tree';
import _ from 'lodash';

type PageInfo = {
    pageIndex: number;
    pageSize: number;
    total: number;
};

export type PageResponse<T extends Record<string, unknown>> = PageInfo & {
    list: T[];
};

export type TableResponse<T extends Record<string, unknown>> = {
    data: T[];
    pageInfo?: {
        pageIndex: number;
        pageSize: number;
        total: number;
    };
};

export type TreeMenuResponse<T extends Record<string, unknown>> = (T &
    DataNode)[];

export type TreeItemType<T> = {
    value?: number;
    label: string;
    id?: number;
    children?: T[] | DataNode[];
    key: number;
};

export type selectItemType = {
    value: number;
    label: string;
};

type ValuePath<T = any, K = keyof T> = ((item: T) => K) | K;

/**
 * 将后端的返回转换成 treeMenu 需要的格式
 * @param response
 */
export function treeDataTransformer<T extends Record<string, unknown>>(
    list: undefined | T[],
    titlePath: keyof T = 'name',
    valuePath: ValuePath<T> = 'id'
): TreeMenuResponse<T> {
    return (function loop(list, positionId?: number | unknown) {
        return (list || []).map(function mapTitleAndKey(item) {
            const result = {
                ...item,
                title: item[titlePath],
                key:
                    typeof valuePath === 'function'
                        ? valuePath(item)
                        : item[valuePath],
            } as any;
            if (!('pid' in item)) {
                result.positionId = item.id;
            }
            if (positionId) {
                result.positionId = positionId;
            }
            if (Array.isArray(result.children)) {
                result.children = loop(result.children, result.positionId);
            }
            return result;
        }) as TreeMenuResponse<T>;
    })(list);
}

/**
 * 将后端的返回转换成 treeSelect 需要的格式
 * @param response
 */
export function treeSelectDataTransformer<T extends Record<string, unknown>>(
    list: null | undefined | T[]
): TreeItemType<T>[] {
    return (list || []).map(function mapValueAndTitle(item) {
        const result = {
            title: item?.name || item?.groupName,
            label: item.name || item?.groupName,
            id: item.id || item?.groupId,
            children: item.children,
            value: item.id || item?.groupId,
            key: item?.id || item?.groupId,
            parentId: item?.parentId,
        } as any;
        if (Array.isArray(result.children)) {
            result.children = result.children.map(mapValueAndTitle);
        }
        return result;
    }) as TreeItemType<T>[];
}

/**
 * 将后端的返回转换成 Select 需要的格式
 * @param response
 */
export function selectDataTransformer<T extends Record<string, unknown>>(
    list: null | T[]
): TreeItemType<T>[] {
    return (list || []).map((item) => {
        const result = {
            ...item,
            value: item?.code || item?.id,
            key: item?.code || item?.id,
            label: item?.name,
            webUrl: item?.webUrl,
        };
        return result;
    }) as TreeItemType<T>[];
}

/**
 * 根据树中子节点Id返回该节点所在的树分支
 * @param treeData
 * @param id: string
 */
export function findTree<T extends Record<string, unknown>>(
    treeData: T[] | null | undefined,
    id: string
): TreeItemType<T> {
    const temp: any[] = [];
    function mapTree(data: any, id: string) {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.id === id) {
                temp.push(item);
                mapTree(treeData, item.parentId);
                break;
            } else {
                if (Array.isArray(item.children)) {
                    mapTree(item.children, id);
                }
            }
        }
    }
    mapTree(treeData, id);
    return _.last(temp) as TreeItemType<T>;
}
