/**
 * 本地存储的Hook组件
 * @param {string} key 关键Key
 * @param {T} initialValue 初始值
 * @param {number} timeout 过期时间（单位：毫秒）
 */
declare function useLocalStorage<T>(key: string, initialValue: T, timeout?: number): any[];

declare const useWindowSize: () => any;

export { useLocalStorage, useWindowSize };
//# sourceMappingURL=bundle.d.ts.map
