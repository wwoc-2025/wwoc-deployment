import { SvelteComponent } from "svelte";
import type { ComponentType } from 'svelte';
import type { PanelDefinition } from './types.js';
declare const __propDef: {
    props: {
        customPanel?: ComponentType | null;
        panels: PanelDefinition[];
        onProgress?: ((progress: any) => void) | null;
        onMarker: (marker: any) => void;
        observerOptions?: IntersectionObserverInit;
        /**
             * Performance optimization for mobile devices
             *
             * When `true`, components not in the viewport are removed from the DOM,
             * and marker loading is debounced during fast scrolling to improve performance.
             */ discardSlot?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {};
    bindings?: string;
};
export type ScrollytellerProps = typeof __propDef.props;
export type ScrollytellerEvents = typeof __propDef.events;
export type ScrollytellerSlots = typeof __propDef.slots;
export default class Scrollyteller extends SvelteComponent<ScrollytellerProps, ScrollytellerEvents, ScrollytellerSlots> {
}
export {};
