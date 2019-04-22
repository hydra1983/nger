import { Observable } from 'rxjs';

export interface Type<T> extends Function {
    new(...args: any[]): T;
}
export enum ChangeDetectionStrategy {
    OnPush = 0,
    Default = 1
}
export enum ViewEncapsulation {
    Emulated = 0,
    Native = 1,
    None = 2,
    ShadowDom = 3
}
export abstract class QueryList<T> {
    readonly dirty = true;
    private _results: any;
    readonly changes: Observable<any>;
    readonly length: number;
    readonly first: T;
    readonly last: T;
    abstract map<U>(fn: (item: T, index: number, array: T[]) => U): U[];
    abstract filter(fn: (item: T, index: number, array: T[]) => boolean): T[];
    abstract find(fn: (item: T, index: number, array: T[]) => boolean): T | undefined;
    abstract reduce<U>(fn: (prevValue: U, curValue: T, curIndex: number, array: T[]) => U, init: U): U;
    abstract forEach(fn: (item: T, index: number, array: T[]) => void): void;
    abstract some(fn: (value: T, index: number, array: T[]) => boolean): boolean;
    abstract toArray(): T[];
    abstract toString(): string;
    abstract reset(res: Array<T | any[]>): void;
    abstract notifyOnChanges(): void;
    abstract setDirty(): void;
    abstract destroy(): void;
}


export interface ValueSansProvider {
    useValue: any;
}
export interface ValueProvider extends ValueSansProvider {
    provide: any;
    multi?: boolean;
}
export interface StaticClassSansProvider {
    useClass: Type<any>;
    deps: any[];
}
export interface StaticClassProvider extends StaticClassSansProvider {
    provide: any;
    multi?: boolean;
}
export interface ConstructorSansProvider {
    deps?: any[];
}
export interface ConstructorProvider extends ConstructorSansProvider {
    provide: Type<any>;
    multi?: boolean;
}
export interface ExistingSansProvider {
    useExisting: any;
}
export interface ExistingProvider extends ExistingSansProvider {
    provide: any;
    multi?: boolean;
}
export interface FactorySansProvider {
    useFactory: Function;
    deps?: any[];
}
export interface FactoryProvider extends FactorySansProvider {
    provide: any;
    multi?: boolean;
}
export declare type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | any[];
export interface TypeProvider extends Type<any> { }
export interface ClassSansProvider {
    useClass: Type<any>;
}
export interface ClassProvider extends ClassSansProvider {
    provide: any;
    multi?: boolean;
}
export declare type Provider = TypeProvider | ValueProvider | ClassProvider | ConstructorProvider | ExistingProvider | FactoryProvider | any[];

export interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
}

export interface SchemaMetadata {
    name: string;
}