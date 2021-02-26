export default (() => new Promise<void>(setImmediate)) as () => Promise<void>;
