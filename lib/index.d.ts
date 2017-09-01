export class Jsonnet {
    constructor();
    eval(code: string): any;
    evalFile(filepath:string): any;
    destroy(): void;
};
