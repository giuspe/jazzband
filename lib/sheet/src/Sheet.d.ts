import { Measure, RenderedMeasure, MeasureOrString } from './Measure';
export declare type Measures = Array<MeasureOrString>;
export declare type SheetEvent<T> = {
    path: number[];
    divisions?: number[];
    value: T;
};
export declare type JumpSign = {
    pair?: string;
    move?: number;
    fine?: boolean;
    validator?: (state: SheetState) => boolean;
};
export declare type SheetState = {
    measures?: RenderedMeasure[];
    index?: number;
    sheet?: Measures;
    jumps?: {
        [key: number]: number;
    };
    visits?: {
        [key: number]: number;
    };
    nested?: boolean;
    fallbackToZero?: boolean;
    forms?: number;
    totalForms?: number;
    firstTime?: boolean;
    lastTime?: boolean;
    property?: string;
};
export declare class Sheet {
    static jumpSigns: {
        [sign: string]: JumpSign;
    };
    static sequenceSigns: {
        rest: string[];
        prolong: string[];
        repeat: string[];
    };
    static render(sheet: MeasureOrString[], options?: SheetState): RenderedMeasure[];
    static nextMeasure(state: SheetState): SheetState;
    static nextIndex(state: any): SheetState;
    static newForm(state: any): SheetState;
    static nextForm(state: any, force?: boolean): SheetState;
    static nextSection(state: SheetState): SheetState;
    /** Starts at a given index, stops when the pair functions returned equally often */
    static findPair(sheet: any, index: number, pairs: Array<(measure?: Measure, options?: {
        sheet?: Measures;
        index?: number;
    }) => boolean>, move?: number, stack?: number): number;
    static findMatch(sheet: any, index: number, find: (measure?: Measure, options?: {
        sheet?: Measures;
        index?: number;
    }) => boolean, move?: number): number;
    static getJumpDestination(state: SheetState): number;
    static getBracePair({ sheet, index, fallbackToZero }: {
        sheet: Measures;
        index: number;
        fallbackToZero?: boolean;
    }): number;
    static canVisitHouse({ sheet, index, visits }: {
        sheet: any;
        index: any;
        visits: any;
    }): boolean;
    static getNextHouseIndex({ sheet, index, visits }: {
        sheet: any;
        index: any;
        visits: any;
    }, move?: number): number;
    static getNextSectionIndex({ sheet, index }: {
        sheet: any;
        index: any;
    }, move?: number): number;
    static wipeKeys(numberMap: any, range: any): {
        [key: number]: number;
    };
    static getRelatedHouse({ sheet, index }: {
        sheet: any;
        index: any;
    }): number;
    static isFirstHouse({ sheet, index }: {
        sheet: any;
        index: any;
    }): boolean;
    static getAllowedJumps({ sheet, index }: {
        sheet: any;
        index: any;
    }): number;
    static readyForFineOrCoda({ sheet, index, jumps, lastTime }: SheetState, move?: number): boolean;
    static shouldJump({ sheet, index, jumps, lastTime }: SheetState): boolean;
    /** Flattens the given possibly nested tree array to an array containing all values in sequential order.
     * You can then turn SheetEvent[] back to the original nested array with Measure.expand. */
    static flatEvents<T>(tree: T[] | T, path?: number[], divisions?: number[]): SheetEvent<T>[];
    /** Flattens the given possibly nested tree array to an array containing all values in sequential order.
     * If withPath is set to true, the values are turned to objects containing the nested path (FlatEvent).
     * You can then turn FlatEvent[] back to the original nested array with Measure.expand. */
    static flatten<T>(tree: T[] | T, withPath?: boolean, path?: number[], divisions?: number[]): T[] | SheetEvent<T>[];
    /** Turns a flat FlatEvent array to a (possibly) nested Array of its values. Reverts Measure.flatten (using withPath=true). */
    static expand<T>(items: SheetEvent<T>[]): any[];
    static pathOf(value: any, tree: any): number[] | undefined;
    static getPath<T>(tree: any, path: any, withPath?: boolean, flat?: SheetEvent<T>[]): any | SheetEvent<T>;
    static nextItem<T>(tree: any, path: any, move?: number, withPath?: boolean, flat?: SheetEvent<T>[]): any | SheetEvent<T>;
    static nextValue(tree: any, value: any, move?: number): any | undefined;
    static nextPath(tree: any, path?: any, move?: number): any | undefined;
    static stringify(measures: MeasureOrString[], property?: string): string | any[];
    static obfuscate(measures: Measures, keepFirst?: boolean): Measure[];
}