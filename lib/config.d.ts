/// <reference path="../typings/main.d.ts" />
export declare class config {
    appSettings: any;
    modulesSettings: any;
    constructor();
    mergeConfiguration(configuration_to_merge: any, key: string): void;
    persistConfiguration(): void;
    persistModules(): void;
}
