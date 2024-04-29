import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AppRoutes from './router';
import dayjs from 'dayjs';
import { WebSocketProvider } from './components/web-socket-provider';

dayjs.locale('zh-cn');

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HashRouter>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    components: {
                        Switch: {
                            /* here is your component tokens */
                        },
                    },
                }}
            >
                <WebSocketProvider enable={false}>
                    <AppRoutes />
                </WebSocketProvider>
            </ConfigProvider>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
