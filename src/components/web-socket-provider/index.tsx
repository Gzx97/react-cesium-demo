import { createContext, FC, ReactElement, useState } from 'react';
import { CompatClient, messageCallbackType, Stomp } from '@stomp/stompjs';
import { StompHeaders } from '@stomp/stompjs/src/stomp-headers';
import { StompSubscription } from '@stomp/stompjs/src/stomp-subscription';
import SockJS from 'sockjs-client';

export interface WebSocketProviderProps {
    children?: ReactElement;
    enable?: boolean;
}

export type WebSocketContextType = {
    connected?: boolean;
    resetConnect: () => void;
    subscribe: (
        destination: string,
        callback: messageCallbackType,
        headers: StompHeaders
    ) => StompSubscription | null;
    unsubscribe: (id: string, headers: StompHeaders) => void;
    send: (destination: string, headers: StompHeaders, data: any) => void;
};

export const WebSocketContext = createContext<WebSocketContextType>({
    connected: false,
    resetConnect: () => null,
    subscribe: () => null,
    unsubscribe: () => null,
    send: () => null,
});

export const WebSocketProvider: FC<WebSocketProviderProps> = (props) => {
    const [stompClient, setStompClient] = useState<CompatClient | undefined>();
    const [connected, setConnected] = useState<boolean>(false);

    let retryConnectCount = 0;

    const handleConnect = () => {
        if (!stompClient || !stompClient.connected) {
            const sock = new SockJS(`/stomp/endpoint`, null, {
                timeout: 50000,
            });
            const stomp = Stomp.over(sock);

            setStompClient(stomp);

            stomp.debug = () => {};
            let headers = {};
            stomp.connect(
                headers,
                (frame: any) => {
                    console.log('链接建立', frame);
                    setConnected(true);
                    retryConnectCount = 0;
                },
                handleConnectError,
                handleConnectClose
            );
        }
    };

    const handleConnectError = () => {
        console.log('链接建立失败');
        setConnected(false);
        retryConnect();
    };

    const handleConnectClose = () => {
        console.log('链接被关闭');
        setConnected(false);
        retryConnect();
    };

    const retryConnect = () => {
        console.log('第[' + (retryConnectCount + 1) + ']次重试连接WebSocket');
        if (retryConnectCount <= 20) {
            handleConnect();
            retryConnectCount += 1;
        } else {
            console.warn(
                '已重连WebSocket[' +
                    (retryConnectCount + 1) +
                    ']次，均失败，将不会自动重连。'
            );
        }
    };

    const resetConnect = (): boolean => {
        if (connected) {
            return true;
        }

        retryConnectCount = 0;
        retryConnect();
        return !!stompClient;
    };

    const subscribe = (
        destination: string,
        callback: messageCallbackType,
        headers: StompHeaders = {}
    ): StompSubscription | null => {
        let subscription: StompSubscription | null = null;
        if (stompClient) {
            subscription = stompClient.subscribe(
                destination,
                callback,
                headers
            );
        }
        return subscription;
    };

    const unsubscribe = (id: string, headers: StompHeaders = {}): void => {
        if (stompClient) {
            stompClient.unsubscribe(id);
        }
    };
    const send = (
        destination: string,
        headers: StompHeaders,
        data: Record<string, any>
    ) => {
        console.log('send', data);
        console.log('connected', connected);
        if (stompClient && connected && data) {
            stompClient?.send?.(destination, {}, JSON.stringify(data));
        }
    };
    if (props.enable && !stompClient) {
        console.log('enable && !stompClient');
        handleConnect();
    }

    return (
        <WebSocketContext.Provider
            value={{
                connected,
                resetConnect,
                subscribe,
                unsubscribe,
                send,
            }}
        >
            {props.children}
        </WebSocketContext.Provider>
    );
};
