export type IProcessEnvironment = Record<string, string>;
export interface INodeProcess {
    platform: 'win32' | 'linux' | 'darwin';
    env: IProcessEnvironment;
    nextTick: Function;
    versions?: {
        electron?: string;
    };
    sandboxed?: boolean;
    type?: string;
    cwd: () => string;
}
export declare const isElectronSandboxed: boolean | undefined;
export declare const browserCodeLoadingCacheStrategy: 'none' | 'code' | 'bypassHeatCheck' | 'bypassHeatCheckAndEagerCompile' | undefined;
export declare const isPreferringBrowserCodeLoad: boolean;
export declare enum Platform {
    Web = 0,
    Mac = 1,
    Linux = 2,
    Windows = 3
}
export declare function PlatformToString(platform: Platform): "Windows" | "Linux" | "Web" | "Mac";
export declare const isWindows: boolean;
export declare const isMacintosh: boolean;
export declare const isOSX: boolean;
export declare const isLinux: boolean;
export declare const isLinuxSnap: boolean;
export declare const isNative: boolean;
export declare const isWeb: boolean;
export declare const isIOS: boolean;
export declare const platform: Platform;
export declare const userAgent: string | undefined;
export declare const isIE: boolean;
export declare const isEdge: boolean;
export declare const isEdgeOrIE: boolean;
export declare const isOpera: boolean;
export declare const isFirefox: boolean;
export declare const isWebKit: boolean;
export declare const isChrome: boolean;
export declare const isSafari: boolean;
export declare const isIPad: boolean;
/**
 * The language used for the user interface. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese)
 */
export declare const language: string;
export declare namespace Language {
    function value(): string;
    function isDefaultVariant(): boolean;
    function isDefault(): boolean;
}
/**
 * The OS locale or the locale specified by --locale. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese). The UI is not necessarily shown in the provided locale.
 */
export declare const locale: string | undefined;
/**
 * The translatios that are available through language packs.
 */
export declare const translationsConfigFile: string | undefined;
export declare const globals: any;
export declare enum OperatingSystem {
    Windows = 1,
    Macintosh = 2,
    Linux = 3
}
export declare const OS: OperatingSystem;
export declare function isLittleEndian(): boolean;
export declare const isBasicWasmSupported: boolean;
//# sourceMappingURL=platform.d.ts.map