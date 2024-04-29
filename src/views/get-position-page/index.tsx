import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.less';
import BELT_1 from './images/belt_1.jpg';
import {
    Form,
    Input,
    Radio,
    RadioChangeEvent,
    Select,
    Space,
    Typography,
} from 'antd';
import { useMouse } from 'ahooks';
import { useBeltMonitoringSettingsItems } from '@/hooks/useOptions/useBeltMonitoringSettingsItems';
const IMG_URL = [
    {
        beltName: '皮带机1',
        url: BELT_1,
    },
];
const GetPositionPage: React.FC = () => {
    const [form] = Form.useForm();
    const { findSettingsItemsLabelByValue, settingsItemsOption } =
        useBeltMonitoringSettingsItems();
    const ref = useRef(null);
    const mouse = useMouse(ref.current);
    const [imgUrl, setImgUrl] = useState(IMG_URL[0].url);
    const [clickHistory, setClickHistory] = useState<
        {
            x: number;
            y: number;
            percentX: string;
            percentY: string;
        }[]
    >([]);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setImgUrl(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <Form form={form}>
                <Typography.Title level={3}>
                    皮带机图片信息取值
                </Typography.Title>
                <Form.Item label="选择皮带机图片">
                    <Radio.Group onChange={onChange} value={imgUrl}>
                        {IMG_URL.map((item) => {
                            return (
                                <Radio key={item.beltName} value={item?.url}>
                                    {item.beltName}
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                </Form.Item>
                <Space>
                    <Form.Item label="监测项" name="monitoringItem" required>
                        <Select
                            style={{ width: 200 }}
                            options={settingsItemsOption}
                        />
                    </Form.Item>
                    <Form.Item dependencies={['monitoringItem']} noStyle>
                        {(form) => {
                            return (
                                <Space>
                                    <Form.Item
                                        label="X坐标"
                                        name="xPosition"
                                        required
                                    >
                                        <Input
                                            style={{ width: 150 }}
                                            addonAfter="%"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Y坐标"
                                        name="yPosition"
                                        required
                                    >
                                        <Input
                                            style={{ width: 150 }}
                                            addonAfter="%"
                                        />
                                    </Form.Item>
                                </Space>
                            );
                        }}
                    </Form.Item>
                </Space>

                <div>
                    <Space split="|">
                        <p>
                            大小：x: {mouse.elementW}, y: {mouse.elementH}
                        </p>
                        <p>
                            坐标（像素）：x: {mouse.elementX}px, y:{' '}
                            {mouse.elementY}
                            px
                        </p>

                        <p>
                            坐标（比例）：x:
                            {((mouse.elementX / mouse.elementW) * 100).toFixed(
                                2
                            )}
                            %, y:
                            {((mouse.elementY / mouse.elementH) * 100).toFixed(
                                2
                            )}
                            %
                        </p>
                        {/* <p>
                    图的坐标 x: {mouse.elementPosX}, y: {mouse.elementPosY}
                </p>
                <p>
                    图的大小 - width: {mouse.elementW}, height: {mouse.elementH}
                </p> */}
                    </Space>
                </div>

                <div
                    ref={ref}
                    className={styles['imgBox']}
                    onClick={() => {
                        setClickHistory([
                            ...clickHistory,
                            {
                                x: mouse.elementX,
                                y: mouse.elementY,
                                percentX: `${(
                                    (mouse.elementX / mouse.elementW) *
                                    100
                                ).toFixed(2)}%`,
                                percentY: `${(
                                    (mouse.elementY / mouse.elementH) *
                                    100
                                ).toFixed(2)}%`,
                            },
                        ]);
                        form.setFieldsValue({
                            xPosition: (
                                (mouse.elementX / mouse.elementW) *
                                100
                            ).toFixed(2),
                            yPosition: (
                                (mouse.elementY / mouse.elementH) *
                                100
                            ).toFixed(2),
                        });
                    }}
                >
                    <img src={imgUrl} alt="皮带机1" />
                    {/* <div className={styles['historyBox']}>
                        {clickHistory.map((item, index) => {
                            return (
                                <div key={index}>
                                    第{index + 1}次记录 x:{item.x}（
                                    {item.percentX}
                                    ）,y:{item.y}（{item.percentY}）
                                </div>
                            );
                        })}
                    </div> */}
                </div>
            </Form>
        </div>
    );
};

export default GetPositionPage;
