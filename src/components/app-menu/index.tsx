import React, { FC, useEffect, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutesConstants } from 'src/router/routes.constants';

export interface AppMenuProps {
    mode?: any;
    theme?: any;
}

const AppMenu: FC<AppMenuProps> = (props) => {
    const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const menuItems: MenuProps['items'] = [
        {
            key: RoutesConstants.GET_POSITION_PAGE.key,
            label: '页面配置',
            onClick: () => navigate(RoutesConstants.GET_POSITION_PAGE.path()),
        },
    ];

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };
    useEffect(() => {
        if (location && location.pathname) {
            const keyArr = location.pathname.split('/');
            // setOpenKeys([keyArr?.[1]]);
            setSelectedKeys([keyArr?.[1]]);
        }
    }, [location]);

    return (
        <Menu
            mode={props.mode || 'inline'}
            theme={props.theme || 'light'}
            items={menuItems}
            // openKeys={openKeys}
            selectedKeys={selectedKeys}
            onOpenChange={onOpenChange}
        />
    );
};
export default AppMenu;
