
// rewrite only support at build phase
// see: https://github.com/vercel/next.js/discussions/33932
// eslint-disable-next-line import/no-anonymous-default-export
export default (phase, { defaultConfig }) => {
    return {
        ...defaultConfig,
        reactStrictMode: true,
        output: "standalone",
    };
}
