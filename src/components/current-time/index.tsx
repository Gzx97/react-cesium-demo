import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Descriptions } from 'antd';

const CurrentTimeComponent: React.FC<{ style?: React.CSSProperties }> = ({
    style,
}) => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const interval = setInterval(() => {
            const formattedTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            setCurrentTime(formattedTime);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <div style={style}>{currentTime}</div>;
};

export default CurrentTimeComponent;
