declare module '@unboundedsystems/jsonnet' {
    export class Jsonnet {
        constructor();
        eval(code: string): any;
        evalFile(filepath:string): any;
        destroy(): void;
    }
    export default Jsonnet;
    export const FS:any;
}
