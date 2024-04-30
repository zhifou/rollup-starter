/**
 * @file useWindowSize 组件
 * @author zhifou
 */
import { useEffect, useState, useCallback } from "react";

export type Size = { width?: number; height?: number };

/**
 * 监听窗口大小变化的Hook组件
 * @returns {Size} 窗口宽高对象
 */
const useWindowSize = (): Size => {
    const [state, setState] = useState<Size>(() => {
        const { clientWidth, clientHeight } = (document as Document)
            .documentElement;
        return {
            width: clientWidth,
            height: clientHeight,
        };
    });

    const onResize = useCallback(() => {
        const { clientWidth, clientHeight } = (document as Document)
            .documentElement;
        setState({
            width: clientWidth,
            height: clientHeight,
        });
    }, []);

    useEffect(() => {
        window.addEventListener("resize", onResize, false);

        return () => {
            window.removeEventListener("resize", onResize, false);
        };
    }, []);

    return state;
};

export default useWindowSize;
