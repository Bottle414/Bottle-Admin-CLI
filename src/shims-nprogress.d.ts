declare module 'nprogress' {
    const NProgress: {
        start: () => void;
        done: () => void;
        configure: (options: Record<string, any>) => void;
    };
    export default NProgress;
}