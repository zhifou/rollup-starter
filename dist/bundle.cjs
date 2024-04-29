(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.zhooks = {}, global.react));
})(this, (function (exports, react) { 'use strict';

    /**
     * @file useLocalStorage 组件
     * @author zhifou
     */
    /**
     * 本地存储的Hook组件
     * @param {string} key 关键Key
     * @param {T} initialValue 初始值
     * @param {number} timeout 过期时间（单位：毫秒）
     */
    function useLocalStorage(key, initialValue, timeout) {
        const remove = () => {
            try {
                window.localStorage.removeItem(key);
            }
            catch (error) {
                console.log(error);
            }
        };
        const [storedValue, setStoredValue] = react.useState(() => {
            try {
                const item = window.localStorage.getItem(key);
                if (item && timeout) {
                    const current = new Date().getTime();
                    const result = JSON.parse(item);
                    // 判断是否过期，已过期
                    if (result.expired < current) {
                        remove();
                        return initialValue;
                    }
                }
                return item ? JSON.parse(item).value : initialValue;
            }
            catch (error) {
                console.log(error);
                return initialValue;
            }
        });
        const setValue = (value) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                const current = new Date().getTime() + (timeout || 0);
                const item = {
                    expired: current,
                    value: valueToStore,
                };
                window.localStorage.setItem(key, JSON.stringify(item));
            }
            catch (error) {
                console.log(error);
            }
        };
        return [storedValue, setValue, remove];
    }

    /**
     * @file useWindowSize 组件
     * @author zhifou
     */
    const useWindowSize = () => {
        const [state, setState] = react.useState(() => {
            const { clientWidth, clientHeight } = document
                .documentElement;
            return {
                width: clientWidth,
                height: clientHeight,
            };
        });
        const onResize = react.useCallback(() => {
            const { clientWidth, clientHeight } = document
                .documentElement;
            setState({
                width: clientWidth,
                height: clientHeight,
            });
        }, []);
        react.useEffect(() => {
            window.addEventListener("resize", onResize, false);
            return () => {
                window.removeEventListener("resize", onResize, false);
            };
        }, []);
        return state;
    };

    exports.useLocalStorage = useLocalStorage;
    exports.useWindowSize = useWindowSize;

}));
//# sourceMappingURL=bundle.cjs.map
