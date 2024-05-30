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
import ICON from '@/images/blockage.svg';
import { setTimeout } from 'timers/promises';
/** https://ion.cesium.com/tokens 去创建token  */
const CESIUM_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMWU3OTBlYy0xMzIzLTQ4ZGMtYTUxZi03NDNkZjgzNWU3N2YiLCJpZCI6MjExOTY0LCJpYXQiOjE3MTQzNjc3MDh9.dOpvTpETE5LIU5JGfwuFBlZEjMomlApWN_ZyWFjSg7I`;
const pointInfo = [
    {
        id: '392f7fbb-ae25-4eef-ac43-58fd91148d1f',
        latitude: 31.292397,
        longitude: 120.775997,
        psName: '人工智能产业园',
    },
    {
        id: '0278a88c-b4f4-4d64-9ccb-65831b3fb19d',
        latitude: 31.991057,
        longitude: 120.700713,
        psName: '有限公司2',
    },
    {
        id: '248f6853-2ced-4aa6-b679-ea6422a5f3ac',
        latitude: 31.94181,
        longitude: 120.51517,
        psName: '有限公司3',
    },
    {
        id: 'F8DADA95-A438-49E1-B263-63AE3BD7DAC4',
        latitude: 31.97416,
        longitude: 120.56132,
        psName: '有限公司4',
    },
    {
        id: '9402a911-78c5-466a-9162-d5b04d0e48f0',
        latitude: 31.91604,
        longitude: 120.57771,
        psName: '有限公司5',
    },
    {
        id: 'EB392DD3-6998-437F-8DCB-F805AD4DB340',
        latitude: 31.88727,
        longitude: 120.48887,
        psName: '有限公司6',
    },
];
const CesiumDemo: React.FC = () => {
    Ion.defaultAccessToken = CESIUM_TOKEN;
    const csmViewerRef = useRef<null | Viewer>(null);
    const viewerContainerRef = useRef(null);

    // const loadPoints = () => {};
    const addMarker = () => {
        // 自定义label颜色
        const _textColor = 'rgb(255, 0, 0)';
        const viewer = csmViewerRef.current!;
        // 清除上一次加载的点位
        viewer.entities.removeAll();
        pointInfo.forEach((pointObj) => {
            viewer.entities.add({
                name: pointObj.psName,
                id: pointObj.id,
                position: Cesium.Cartesian3.fromDegrees(
                    pointObj.longitude * 1,
                    pointObj.latitude * 1,
                    1000
                ),
                // 点
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                },
                polyline: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                        pointObj.longitude,
                        pointObj.latitude,
                        0,
                        pointObj.longitude,
                        pointObj.latitude,
                        1000,
                    ]),
                    width: 1,
                    // 材质设置
                    // material: Cesium.Color.DODGERBLUE,
                    material: Cesium.Color.fromCssColorString('red'),
                },
                // 文字标签
                label: {
                    // show: false,
                    text: pointObj.psName,
                    font: '12px monospace',
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    // fillColor: Cesium.Color.LIME,
                    fillColor: Cesium.Color.fromCssColorString(_textColor),
                    outlineWidth: 4,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                    pixelOffset: new Cesium.Cartesian2(0, -20), // 偏移量
                },
                // 图标
                billboard: {
                    image: ICON,
                    width: 18,
                    height: 24,
                },
            });
        });
    };
    const init = async () => {
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
                terrain: Cesium.Terrain.fromWorldTerrain(),
            });
        }
        const viewer = csmViewerRef.current;
        if (!viewer) return;
        viewer.imageryLayers.addImageryProvider(
            new UrlTemplateImageryProvider({
                //高德影像标注地图
                url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
            })
        );

        // 设置初始位置  Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
        const boundingSphere = new BoundingSphere(
            Cartesian3.fromDegrees(120.775997, 31.292397, 100), //苏州人工智能产业园
            15000
        );
        // 定位到初始位置
        viewer.camera.flyToBoundingSphere(boundingSphere, {
            // 定位到初始位置的过渡时间，设置成0，就没有过渡，类似一个过场的动画时长
            duration: 2,
        });
        addMarker();

        //添加模型
        viewer.entities.add({
            name: 'Blue box',
            position: Cesium.Cartesian3.fromDegrees(
                120.775997,
                31.292397,
                100.0
            ),
            box: {
                // new Cesium.Cartesian3(长, width, height)
                dimensions: new Cesium.Cartesian3(400.0, 1000.0, 1500.0),
                material: Cesium.Color.BLUE, // 配置颜色
                // material: Cesium.Color.RED.withAlpha(0.5), // 配置颜色透明度
                // fill: false, // 配置 是否填满
                outline: true, // 配置 是否显示外边框线
                outlineColor: Cesium.Color.YELLOW, // 配置 设置外边框线颜色
            },
        });
        add3DTiles();
        // addGLTF();
        // //加载3dTiles文件
        // const tileset = await Cesium.Cesium3DTileset.fromUrl(
        //     'https://data.mars3d.cn/3dtiles/qx-dyt/tileset.json',
        //     {
        //         skipLevelOfDetail: true,
        //         baseScreenSpaceError: 1024,
        //         skipScreenSpaceErrorFactor: 16,
        //         skipLevels: 1,
        //         immediatelyLoadDesiredLevelOfDetail: false,
        //         loadSiblings: false,
        //         cullWithChildrenBounds: true,
        //     }
        // );
        // //添加到地图上，定位到苏州人工智能产业园
        // viewer.scene.primitives.add(tileset);
        // //加载完成后缩放到模型位置
        // viewer.zoomTo(tileset);
        // console.log(tileset);
    };
    //加载3dTiles文件
    const add3DTiles = async () => {
        const viewer = csmViewerRef.current!;
        let translation = Cesium.Cartesian3.fromArray([0, 0, 0]);
        let m = Cesium.Matrix4.fromTranslation(translation);
        const url = 'http://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json';
        try {
            const tileset = await Cesium.Cesium3DTileset.fromUrl(url, {
                modelMatrix: m,
                show: true, // 是否显示图块集(默认true)
            });
            viewer.scene.primitives.add(tileset);
            viewer.flyTo(tileset);
        } catch (error) {
            console.error(`Error creating tileset: ${error}`);
        }
    };

    const addGLTF = () => {
        const viewer = csmViewerRef.current!;
        // 指定模型的URI（这里假设你有一个名为'myModel.gltf'的模型文件）
        const modelUri = '/models/belt.glb';
        const modelEntity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(120.775997, 31.292397, 0), // 指定模型的位置
            model: {
                uri: modelUri, // 指定GLB文件的路径
                scale: 1.0, // 模型的缩放比例
                minimumPixelSize: 128, // 最小像素尺寸
                maximumScale: 20000, // 最大缩放比例
            },
        });

        viewer.zoomTo(modelEntity); // 调整视图以聚焦模型
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
