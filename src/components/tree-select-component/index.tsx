import React, { useEffect, useMemo, useState } from 'react';
import { Tree, Input } from 'antd';
import styles from './index.module.less';
import { DataNode } from '@/constants/types';
import { isNilEmpty } from '@/commons/util/isNilEmpty';
import * as Icons from '@/images';
import { getValueByKey } from '@/commons/util/getValueByKey';
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons';

interface TreeSelectComponentProps {
    treeData: DataNode[];
    onSelect: (selectedKeys: React.Key[], info?: any, titles?: any[]) => void;
    canSelectParent?: boolean;
}
/** 可以选择父节点 */

const TreeSelectComponent: React.FC<TreeSelectComponentProps> = ({
    treeData,
    onSelect,
    canSelectParent = false,
}) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchValue(value);
    };

    const newTreeData = useMemo(() => {
        /** 搜索变红 */
        const addColorToMatchingNodes = (
            data: DataNode[],
            value: string
        ): DataNode[] => {
            if (!value) return data;
            return data.map((node) => {
                const { title, children } = node;
                const isMatching = title.includes(value);
                const newNode: DataNode = {
                    ...node,
                    color: isMatching ? 'red' : undefined,
                };

                if (children) {
                    newNode.children = addColorToMatchingNodes(children, value);
                }

                return newNode;
            });
        };
        const data = addColorToMatchingNodes(treeData, searchValue);
        return data;
    }, [treeData, searchValue]);

    /** 查找出来默认选择的皮带机 */
    const defaultLeafNodeKey = useMemo(() => {
        const findFirstLeafNodeKey = (data: DataNode[]): string | undefined => {
            for (const node of data) {
                const isLeaf =
                    (node.isLeaf === true || node.leaf === true) &&
                    node.enabled;
                if (node.enabled) {
                    return node.key;
                }
                if (isLeaf && node.key !== '-1') {
                    return node.key;
                }

                if (node.children) {
                    const key = findFirstLeafNodeKey(node.children);
                    if (key) {
                        return key;
                    }
                }
            }
            return undefined;
        };
        const localStorageKey = localStorage.getItem('selectedKey');
        // console.log('localStorageKey', localStorageKey);
        if (
            isNilEmpty(selectedKeys) &&
            !isNilEmpty(localStorageKey) &&
            localStorageKey !== '-1'
        ) {
            return localStorageKey;
        }
        return findFirstLeafNodeKey(treeData);
    }, [treeData, selectedKeys]);

    const onSelectNode = (selectedKeys: React.Key[], info: any) => {
        if ((!info?.node?.isLeaf || !info.selected) && !canSelectParent) return;
        setSelectedKeys(selectedKeys);
        onSelect(selectedKeys);
    };

    useEffect(() => {
        if (defaultLeafNodeKey && isNilEmpty(selectedKeys)) {
            setSelectedKeys([defaultLeafNodeKey]);
            onSelect([defaultLeafNodeKey]);
        }
    }, [defaultLeafNodeKey]);

    /** 如果切换时选中的为disabled的key，自动切换 */
    useEffect(() => {
        const selectKey = selectedKeys?.[0] as string;
        const isDisabled = getValueByKey(treeData, selectKey, 'disabled');
        const notAllowSelectParent =
            !getValueByKey(treeData, selectKey, 'leaf') && !canSelectParent;

        if (notAllowSelectParent && defaultLeafNodeKey) {
            setSelectedKeys([defaultLeafNodeKey]);
            onSelect([defaultLeafNodeKey]);
            return;
        }
        if (isDisabled && defaultLeafNodeKey) {
            setSelectedKeys([defaultLeafNodeKey]);
            onSelect([defaultLeafNodeKey]);
            return;
        }
    }, [selectedKeys, treeData, defaultLeafNodeKey]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('selectedKey');
        };
    }, []);
    const loop = (data: DataNode[]): DataNode[] => {
        return data.map((item) => {
            const { key, title, children, isLeaf, color, leaf, enabled } = item;
            const isLeafNew = isLeaf || leaf;
            const itemTitle = (
                <span
                    key={key}
                    title={title}
                    style={{
                        color: color,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {/* <Icons.Belt style={{ marginRight: 8 }} /> */}
                    {isLeafNew && key !== '-1' && (
                        <Icons.Belt
                            style={{
                                display: 'inline-block',
                                // width: 8,
                                // height: 8,
                                color: enabled ? 'green' : '#ccc',
                                // borderRadius: '50%',
                                marginRight: 10,
                                flexShrink: 0,
                            }}
                        />
                    )}
                    {title}
                </span>
            );
            if (children) {
                return {
                    ...item,
                    title: itemTitle,
                    key: key,
                    isLeaf: isLeafNew,
                    children: loop(children as DataNode[]),
                };
            }
            return {
                ...item,
                title: itemTitle,
                isLeaf: isLeafNew,
                key: item.key,
            };
        });
    };

    return (
        <div className={styles.wrapper}>
            {/* <Search
                style={{ padding: 10 }}
                placeholder="请搜索"
                onChange={onSearch}
                value={searchValue}
            /> */}
            <Tree
                style={{ marginTop: 10 }}
                onSelect={onSelectNode}
                selectedKeys={selectedKeys}
                showLine
                // treeData={newTreeData}
                switcherIcon={
                    <CaretDownOutlined style={{ fontSize: '16px' }} />
                }
                treeData={loop(newTreeData)}
                defaultExpandAll={true}
                blockNode
            />
        </div>
    );
};

export default TreeSelectComponent;
