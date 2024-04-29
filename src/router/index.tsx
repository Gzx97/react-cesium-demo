import React from 'react';
import { useRoutes, RouteObject, Navigate } from 'react-router-dom';
import SignInView from '../views/account/sign-in';
import AppLayout from '../components/app-layout';
import GetPositionPage from '@/views/get-position-page';
import { RoutesConstants } from './routes.constants';
import LargeScreenPage from '@/views/large-screen';
import { DubheRouter } from '@dubhe/core';
import CesiumDemo from '@/views/cesium-demo';

export const routes: RouteObject[] = [
    { path: '/sign-in', element: <SignInView /> },
    {
        path: RoutesConstants.BELT_LARGE_SCREEN.path(),
        element: <LargeScreenPage />,
    },
    {
        path: RoutesConstants.CESIUM.path(),
        element: <CesiumDemo />,
    },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <GetPositionPage /> },
            {
                path: RoutesConstants.GET_POSITION_PAGE.path(),
                element: <GetPositionPage />,
            },
        ],
    },
];

// 生成路由
const AppRoutes = () => {
    return (
        <DubheRouter name={`DubheLargeScreen`}>{useRoutes(routes)}</DubheRouter>
    );
};

export default AppRoutes;
