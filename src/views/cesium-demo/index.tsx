import React, { useEffect, useRef } from 'react';
import styles from './index.module.less';
import { Viewer } from 'cesium';

const CesiumDemo: React.FC = () => {
    const csmViewerRef = useRef<null | Viewer>(null);
    const viewerContainerRef = useRef(null);

    useEffect(() => {
        if (viewerContainerRef.current && !csmViewerRef.current) {
            csmViewerRef.current = new Viewer('csm-viewer-container');
        }
    }, [viewerContainerRef]);

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
