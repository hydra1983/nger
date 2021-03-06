import { ApplicationRef } from './application_ref'
import { Injector } from 'nger-di'
import { NgModuleRef } from './ng_module_ref'
import { ComponentRef } from './component_ref'
import { ComponentFactory } from './component_factory'
export abstract class ChangeDetectorRef<T = any> {
    abstract next(that: Partial<T>): void;
}
export abstract class ViewRef extends ChangeDetectorRef {
    abstract destroy(): void;
    abstract get destroyed(): boolean;
    abstract onDestroy(callback: Function): any /** TODO #9100 */;
}
/** 挂载 */
export abstract class EmbeddedViewRef<C> extends ViewRef {
    abstract get context(): C;
    abstract get rootNodes(): any[];
}
export interface InternalViewRef extends ViewRef {
    detachFromAppRef(): void;
    attachToAppRef(appRef: ApplicationRef): void;
}
export class ElementRef<T = any> {
    public nativeElement: T;
    constructor(nativeElement: T) { this.nativeElement = nativeElement; }
}
/**
 * ng-template
 */
export abstract class TemplateRef<C> {
    abstract get elementRef(): ElementRef;
    abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}
// 这个是一个ViewContainerRef
export abstract class ViewContainerRef {
    abstract get element(): ElementRef;
    abstract get injector(): Injector;
    abstract get parentInjector(): Injector;
    abstract clear(): void;
    abstract get(index: number): ViewRef | null;
    abstract get length(): number;
    abstract createEmbeddedView<C>(
        templateRef: TemplateRef<C>,
        context?: C,
        index?: number
    ): EmbeddedViewRef<C>;
    abstract createComponent<C>(
        componentFactory: ComponentFactory<C>,
        index?: number,
        injector?: Injector,
        projectableNodes?: any[][],
        ngModule?: NgModuleRef<any>
    ): ComponentRef<C>;
    abstract insert(viewRef: ViewRef, index?: number): ViewRef;
    abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;
    abstract indexOf(viewRef: ViewRef): number;
    abstract remove(index?: number): void;
    abstract detach(index?: number): ViewRef | null;
}
import { BehaviorSubject } from 'rxjs'
export class DefaultChangeDetectorRef<T = any> extends ChangeDetectorRef<T> {
    constructor(public subject: BehaviorSubject<any>) {
        super();
    }
    next(that: Partial<T>): void {
        this.subject.next(that);
    }
}