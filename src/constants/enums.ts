/** 在线状态 */
export enum ONLINE_STATUS {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    UNKNOWN = 'UNKNOWN',
}

/** 检测类型 */
export enum DETECTION_TYPE {
    /** 堵料检测 */
    BLOCKAGE = 'BLOCKAGE',
    /** 粒度检测 */
    SIZE_DETECTION = 'SIZE_DETECTION',
    /** 表面缺陷 */
    SURFACE_DEFECTS = 'SURFACE_DEFECTS',
    /** 皮带撕裂 */
    BELT_TORN = 'BELT_TORN',
    /** 异音托辊 */
    NOISE_ROLLER = 'NOISE_ROLLER',
    /** 跑偏监测 */
    DEVIATION = 'DEVIATION',
    /** 打滑监测 */
    SLIPPAGE = 'SLIPPAGE',
    /** 防烧损 */
    PREVENT_BURN_DAMAGE = 'PREVENT_BURN_DAMAGE',
}

export enum DEVIATION_TYPE {
    /** 正常 */
    NORMAL = 'NORMAL',
    /** 跑偏 */
    DEVIATION = 'DEVIATION',
    /** 轻微跑偏 */
    SLIGHT_DEVIATION = 'SLIGHT_DEVIATION',
    /** 严重跑偏 */
    SEVERE_DEVIATION = 'SEVERE_DEVIATION',
}
