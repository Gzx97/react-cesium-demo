import { DataNode } from '@/constants/types';

/** 获取该key所在的数据 */
export const getValueByKey = (
    data: DataNode[],
    key: string,
    name: keyof DataNode = 'disabled'
): boolean | undefined => {
    for (const node of data) {
        if (node.key === key) {
            return node?.[name];
        }
        if (node.children) {
            const myName = getValueByKey(node.children, key, name);
            if (myName !== undefined) {
                return myName;
            }
        }
    }
    return undefined;
};
