/** 匹配路由 */
export const isPathMatched = (path: string, paths: string[]): boolean => {
    for (const p of paths) {
        const regexStr = p.replace(/\/:\w+/g, '/\\w+');
        const regex = new RegExp(`^${regexStr}$`);

        if (regex.test(path)) {
            return true;
        }
    }

    return false;
};
