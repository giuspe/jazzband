export declare class RealParser {
    /**
     * The RegExp for a complete chord. The match array contains:
     * 1 - the base note
     * 2 - the modifiers (+-ohd0123456789 and su for sus)
     * 3 - any comments (may be e.g. add, sub, or private stuff)
     * 4 - the "over" part starting with a slash
     * 5 - the top chord as (chord)
     * @type RegExp
     */
    chordRegex: RegExp;
    regExps: RegExp[];
    replacements: {
        "LZ": string[];
        "XyQ": string[];
        "Kcl": string[];
    };
    raw: string;
    sections: any;
    bars: any;
    tokens: any;
    constructor(raw: any, times?: number);
    renderSong(sections?: any, times?: number): any[];
    getBars(sections: any, { first, last }: {
        first: any;
        last: any;
    }, repeated?: any[]): any;
    getSections(tokens: any): any;
    parse(raw: string): any;
    parseChord(match: any): iRealChord;
    newToken(arr: any): iRealToken;
}
declare class iRealChord {
    note: any;
    modifiers: any;
    over: any;
    alternate: any;
    constructor(note: any, modifiers: any, over: any, alternate: any);
}
declare class iRealToken {
    chord: any;
    spacer: number;
    bars: string;
    comments: any[];
    token: any;
    annots: any[];
    constructor();
}
export {};
