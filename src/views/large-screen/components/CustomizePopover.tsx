import React, { useEffect, useState } from 'react';
import styles from './CustomizePopover.module.less';
import * as Icons from '../images';
import { DetectionType } from '@/constants/types';
import classNames from 'classnames';
import { useBoolean } from 'ahooks';
import {
    AlertOutlined,
    CameraOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { useDubheNavigate } from '@dubhe/core';

export type CustomizePopoverType = DetectionType & {
    isAlert?: boolean;
    selectedKey?: string;
    children?: React.ReactNode;
};

const CustomizePopover: React.FC<CustomizePopoverType> = ({
    label,
    position,
    type,
    Icon,
    direction,
    isAlert,
    name,
    realTimeUrl,
    alarmUrl,
    selectedKey,
    children,
}) => {
    const [showCard, { toggle, setTrue, setFalse }] = useBoolean(false);
    const dubheNavigate = useDubheNavigate();

    const wrapperStyles: React.CSSProperties = {
        top: position?.top,
        left: position?.left,
    };
    const elementColor = isAlert ? '#FF0000' : '#04CA09';
    useEffect(() => {
        if (isAlert) {
            setTrue();
        }
    }, [isAlert]);
    return (
        <div
            style={wrapperStyles}
            className={styles['CustomizePopoverWrapper']}
        >
            <div
                style={{
                    borderColor: elementColor,
                    opacity: showCard ? 1 : 0,
                }}
                className={classNames({
                    [styles['frameBotWrapper']]: direction === 'bottom',
                    [styles['frameTopWrapper']]: direction === 'top',
                })}
            >
                {/* 左上角圆点 */}
                <div
                    className={classNames(styles['leftTopRound'], {
                        [styles['leftTopRoundGreen']]: !isAlert,
                        [styles['leftTopRoundRed']]: isAlert,
                    })}
                />
                {/* 装饰框 */}
                <div className={styles['decorativeBoxWrapper']}>
                    <div
                        style={{ borderColor: elementColor }}
                        className={classNames(styles['decorativeBox'])}
                    >
                        <div
                            style={{ background: elementColor }}
                            className={styles['inner']}
                        />
                        <div
                            style={{ background: elementColor }}
                            className={styles['inner']}
                        />
                    </div>
                    <div
                        style={{ borderColor: elementColor }}
                        className={classNames(styles['decorativeBox'])}
                    >
                        <div
                            style={{ background: elementColor }}
                            className={styles['inner']}
                        />
                        <div
                            style={{ background: elementColor }}
                            className={styles['inner']}
                        />
                    </div>
                </div>
                {/* 连接线 */}
                <div
                    style={{ backgroundColor: elementColor }}
                    className={classNames({
                        [styles['frameWrapperBotLine']]: direction === 'bottom',
                        [styles['frameWrapperTopLine']]: direction === 'top',
                    })}
                />
                {/* 标题 */}
                <div
                    style={{
                        background: `linear-gradient(
                          90deg,
                        ${elementColor}80 2%,
                          rgba(4, 202, 9, 0) 73%
                      )`,
                    }}
                    className={styles['cardTitle']}
                >
                    {label}
                </div>
                {/* 内容 */}
                <div className={styles['content']}>
                    <div> {children}</div>
                </div>
                <div
                    style={{ borderColor: elementColor }}
                    className={styles['footer']}
                >
                    <div
                        className={styles['centerLine']}
                        style={{ backgroundColor: elementColor }}
                    />
                    <div
                        style={{ color: elementColor }}
                        className={styles['footerItem']}
                        onClick={() => {
                            if (name && alarmUrl && selectedKey) {
                                dubheNavigate(
                                    `${alarmUrl}?beltId=${selectedKey}`,
                                    {
                                        app: name,
                                        appHashRouter: true,
                                    }
                                );
                            }
                        }}
                    >
                        {isAlert && (
                            <>
                                <WarningOutlined style={{ marginRight: 5 }} />
                                查看告警
                            </>
                        )}
                    </div>
                    <div
                        style={{ color: 'rgba(70,148,213)' }}
                        className={styles['footerItem']}
                        onClick={() => {
                            console.log(name);
                            console.log(realTimeUrl);
                            console.log(selectedKey);
                            if (name && realTimeUrl && selectedKey) {
                                dubheNavigate(
                                    `${realTimeUrl}?beltId=${selectedKey}`,
                                    {
                                        app: name,
                                        appHashRouter: true,
                                    }
                                );
                            }
                        }}
                    >
                        <CameraOutlined style={{ marginRight: 5 }} /> 实时监控
                    </div>
                </div>
            </div>

            <div
                onClick={() => {
                    if (isAlert) {
                        return;
                    }
                    toggle();
                }}
                className={styles['iconBox']}
            >
                {Icon && <Icon className={styles['innerIcon']} />}

                <Icons.Round
                    style={{ color: elementColor }}
                    className={styles['roundIcon']}
                />
            </div>
        </div>
    );
};

export default CustomizePopover;
