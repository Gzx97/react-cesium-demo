import React, { useEffect, useRef } from 'react';
import styles from './index.module.less';
import {
    Viewer,
    Ion,
    UrlTemplateImageryProvider,
    BoundingSphere,
    Cartesian3,
} from 'cesium';
import * as Cesium from 'cesium';
/** https://ion.cesium.com/tokens 去创建token  */
const CESIUM_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMWU3OTBlYy0xMzIzLTQ4ZGMtYTUxZi03NDNkZjgzNWU3N2YiLCJpZCI6MjExOTY0LCJpYXQiOjE3MTQzNjc3MDh9.dOpvTpETE5LIU5JGfwuFBlZEjMomlApWN_ZyWFjSg7I`;
const CesiumDemo: React.FC = () => {
    Ion.defaultAccessToken = CESIUM_TOKEN;
    const csmViewerRef = useRef<null | Viewer>(null);
    const viewerContainerRef = useRef(null);
    const init = () => {
        if (viewerContainerRef.current && !csmViewerRef.current) {
            csmViewerRef.current = new Viewer('csm-viewer-container', {
                baseLayerPicker: false, // 如果设置为false，将不会创建右上角图层按钮。
                geocoder: false, // 如果设置为false，将不会创建右上角查询(放大镜)按钮。
                navigationHelpButton: false, // 如果设置为false，则不会创建右上角帮助(问号)按钮。
                homeButton: false, // 如果设置为false，将不会创建右上角主页(房子)按钮。
                sceneModePicker: false, // 如果设置为false，将不会创建右上角投影方式控件(显示二三维切换按钮)。
                animation: false, // 如果设置为false，将不会创建左下角动画小部件。
                timeline: false, // 如果设置为false，则不会创建正下方时间轴小部件。
                fullscreenButton: false, // 如果设置为false，将不会创建右下角全屏按钮。
                scene3DOnly: true, // 为 true 时，每个几何实例将仅以3D渲染以节省GPU内存。
                shouldAnimate: false, // 默认true ，否则为 false 。此选项优先于设置 Viewer＃clockViewModel 。
                // ps. Viewer＃clockViewModel 是用于控制当前时间的时钟视图模型。我们这里用不到时钟，就把shouldAnimate设为false
                infoBox: false, // 是否显示点击要素之后显示的信息
                sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
                requestRenderMode: false, // 启用请求渲染模式，不需要渲染，节约资源吧
                fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处，虽然我关闭了全屏按钮，但是键盘按F11 浏览器也还是会进入全屏
                // imageryProvider: new UrlTemplateImageryProvider({
                //     url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                // }),
            });
        }
        const viewer = csmViewerRef.current;
        if (!viewer) return;
        viewer.imageryLayers.addImageryProvider(
            new UrlTemplateImageryProvider({
                url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
            })
        );
        // 设置初始位置  Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
        const boundingSphere = new BoundingSphere(
            Cartesian3.fromDegrees(120.55538, 31.87532, 100),
            15000
        );
        // 定位到初始位置
        viewer.camera.flyToBoundingSphere(boundingSphere, {
            // 定位到初始位置的过渡时间，设置成0，就没有过渡，类似一个过场的动画时长
            duration: 0,
        });

        console.log(viewer);
    };
    useEffect(() => {
        init();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div
                style={{ width: '1000px', height: '1000px' }}
                className="csm-viewer-container"
                id="csm-viewer-container"
                ref={viewerContainerRef}
            ></div>
        </div>
    );
};

export default CesiumDemo;
