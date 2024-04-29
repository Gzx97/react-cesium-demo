import { FC, useEffect, useMemo, useState } from 'react';
import { Layout, Spin } from 'antd';
import styles from './index.module.less';
import AppMenu from '../app-menu';
import {
    Outlet,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { LayoutContextProvider } from './LayoutProvider';
import _ from 'lodash';

export interface AppLayoutProps {
    /**
     * 1：侧边菜单布局
     * 2：顶部菜单布局
     * 3：混合菜单布局
     */
    navigationMode?: string | undefined;
    /**
     * 1：亮色菜单风格
     * 2：暗色菜单风格
     */
    overallStyle?: string | undefined;
}
const { Content, Footer, Header } = Layout;

const AppLayout: FC<AppLayoutProps> = ({
    navigationMode = '2',
    overallStyle = '1',
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [selectedKey, setSelectedKey] = useState<string>();

    const [showSiderHeaderLogo, setShowSiderHeaderLogo] =
        useState<boolean>(false);
    const [showHeaderLogo, setShowHeaderLogo] = useState<boolean>(false);
    const [showHeaderMenu, setShowHeaderMenu] = useState<boolean>(false);
    const [headerTheme, setHeaderTheme] = useState<any>('light');
    const [siderTheme, setSiderTheme] = useState<any>('light');
    const [menuTheme, setMenuTheme] = useState<any>('light');

    useEffect(() => {
        handleLayout();
    }, [navigationMode, overallStyle]);

    const handleLayout = () => {
        switch (overallStyle) {
            case '1':
                setMenuTheme('light');
                setSiderTheme('light');
                setHeaderTheme('light');
                break;
            case '2':
                setMenuTheme('dark');
                setSiderTheme('dark');
                setHeaderTheme('dark');
                break;
            default:
                setMenuTheme('dark');
                setSiderTheme('dark');
        }

        switch (navigationMode) {
            case '1':
                setShowSiderHeaderLogo(true);
                setShowHeaderLogo(false);
                setShowHeaderMenu(false);

                setHeaderTheme('light');
                break;
            case '2':
                setShowSiderHeaderLogo(true);
                setShowHeaderLogo(true);
                setShowHeaderMenu(true);
                break;
            case '3':
                setShowSiderHeaderLogo(false);
                setShowHeaderLogo(true);
                setShowHeaderMenu(false);

                setHeaderTheme('dark');
                setSiderTheme('light');
                setMenuTheme('light');
                break;
            default:
                setShowSiderHeaderLogo(false);
                setShowHeaderLogo(true);
                setShowHeaderMenu(false);

                setHeaderTheme('dark');
                setSiderTheme('light');
                setMenuTheme('light');
        }
    };

    const header = (
        <Header
            className={styles['app-header']}
            style={{
                background: headerTheme === 'light' ? '#fff' : '#001529',
                color: headerTheme === 'light' ? '#001529' : '#f0f2f5',
                zIndex: 19,
            }}
        >
            <div className={styles['header-layout-mix']}>
                <div
                    onClick={() => {
                        navigate('/');
                    }}
                    className={styles['header-logo']}
                >
                    {showHeaderLogo && '皮带机大屏'}
                </div>
                <div style={{ flex: '1 1 100%' }}>
                    {showHeaderMenu && (
                        <AppMenu theme={menuTheme} mode={'horizontal'} />
                    )}
                </div>
            </div>
        </Header>
    );

    const content = (
        <Content className={styles['app-layout-content']}>
            <div className={styles['app-layout-content-main-content']}>
                <Outlet />
            </div>
        </Content>
    );

    const sider = (
        <>
            <div
                style={{
                    width: collapsed ? '48px' : '200px',
                    flex: collapsed ? '0 0 48px' : '0 0 200px',
                    overflow: 'hidden',
                    maxWidth: collapsed ? '48px' : '200px',
                    minWidth: collapsed ? '48px' : '200px',
                    transition:
                        'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
                }}
            />
            <Layout.Sider
                theme={siderTheme}
                collapsible
                collapsedWidth={50}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    marginTop: navigationMode === '1' ? '0px' : '48px',
                    boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
                    zIndex: 100,
                }}
                trigger={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                }
                onCollapse={(value) => setCollapsed(value)}
            >
                {showSiderHeaderLogo && (
                    <div
                        onClick={() => {
                            navigate('/');
                        }}
                        className={styles['sider-header-logo']}
                        style={{
                            color: siderTheme === 'dark' ? 'white' : 'black',
                        }}
                    >
                        logo
                    </div>
                )}
                <AppMenu theme={menuTheme} />
            </Layout.Sider>
        </>
    );

    const footer = (
        <Footer
            style={{
                background: '#f0f2f5',
                textAlign: 'center',
                fontSize: '14px',
                color: 'rgba(0,0,0,.45)',
                padding: '0 0 5px 0',
            }}
        >
            Triones开发平台
        </Footer>
    );

    return (
        <LayoutContextProvider
            value={{
                selectedKey,
            }}
        >
            <div className={styles['app-layout']}>
                {navigationMode === '1' && (
                    <Layout hasSider>
                        {sider}
                        <Layout style={{ background: '#f0f2f5' }}>
                            {header}
                            <Layout>
                                {content}
                                {footer}
                            </Layout>
                        </Layout>
                    </Layout>
                )}

                {navigationMode === '2' && (
                    <Layout style={{ background: '#f0f2f5' }}>
                        {header}
                        <Layout style={{ height: '100%' }}>
                            {content}
                            {footer}
                        </Layout>
                    </Layout>
                )}

                {navigationMode === '3' && (
                    <Layout>
                        {header}
                        <Layout hasSider>
                            {sider}
                            <Layout style={{ background: '#f0f2f5' }}>
                                {content}
                                {footer}
                            </Layout>
                        </Layout>
                    </Layout>
                )}
            </div>
        </LayoutContextProvider>
    );
};

export default AppLayout;
