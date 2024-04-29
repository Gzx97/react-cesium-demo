import { DataNode } from '@/constants/types';
import _ from 'lodash';

/**

 */
export const findParentTitles = (
    treeData: DataNode[],
    key: string
): string[] => {
    const result: string[] = [];

    const findParent = (data: DataNode[], targetKey: string): boolean => {
        for (const node of data) {
            if (node.key === targetKey) {
                result.push(node.title);
                return true;
            }
            if (node.children) {
                if (findParent(node.children, targetKey)) {
                    result.push(node.title);
                    return true;
                }
            }
        }
        return false;
    };

    findParent(treeData, key);

    return result;
};
