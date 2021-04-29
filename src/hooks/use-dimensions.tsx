import {useState, useCallback, useLayoutEffect, useEffect} from "react";

interface DimensionObject {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
    right: number;
    bottom: number;
}

type UseDimensionsHook = [
    (node: HTMLElement) => void,
    DimensionObject,
    HTMLElement,
];

interface UseDimensionsArgs {
    liveMeasure?: boolean;
}

function getDimensionObject(node: HTMLElement): DimensionObject {
    const rect = node.getBoundingClientRect() as any;

    return {
        width: rect.width,
        height: rect.height,
        top: "x" in rect ? rect.x : rect.top,
        left: "y" in rect ? rect.y : rect.left,
        x: "x" in rect ? rect.x : rect.left,
        y: "y" in rect ? rect.y : rect.top,
        right: rect.right,
        bottom: rect.bottom
    };
}

function useDimensions({ liveMeasure = true }: UseDimensionsArgs = {}): UseDimensionsHook {
    const [dimensions, setDimensions] = useState({
        x: undefined,
        y: undefined,
        width: undefined,
        height: undefined,
        top: undefined,
        left: undefined,
        right: undefined,
        bottom: undefined,
    });
    const [node, setNode] = useState(null);

    const ref = useCallback(node => {
        setNode(node);
    }, []);

    // useLayoutEffect(() => {
    useEffect(() => {
        if (node) {
            const measure = () =>
                window.requestAnimationFrame(() =>
                    setDimensions(getDimensionObject(node))
                );
            measure();

            if (liveMeasure) {
                window.addEventListener("resize", measure);
                window.addEventListener("scroll", measure);

                return () => {
                    window.removeEventListener("resize", measure);
                    window.removeEventListener("scroll", measure);
                };
            }
        }
    }, [node]);

    return [ref, dimensions, node];
}

export default useDimensions;
