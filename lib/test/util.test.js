"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = __importStar(require("../util"));
var util_1 = require("../util");
var tonal_1 = require("tonal");
test('getIntervalFromStep: undefined', function () {
    expect(util.getIntervalFromStep('d3g2g3')).toEqual(undefined);
});
test('getIntervalFromStep: numbers', function () {
    expect(util.getIntervalFromStep(1)).toEqual('1P');
    expect(util.getIntervalFromStep(2)).toEqual('2M');
    expect(util.getIntervalFromStep(-2)).toEqual('2m');
    expect(util.getIntervalFromStep(3)).toEqual('3M');
    expect(util.getIntervalFromStep(-3)).toEqual('3m');
    expect(util.getIntervalFromStep(4)).toEqual('4P');
    expect(util.getIntervalFromStep(5)).toEqual('5P');
    expect(util.getIntervalFromStep(6)).toEqual('6M');
    expect(util.getIntervalFromStep(7)).toEqual('7M');
});
test('getIntervalFromStep: strings', function () {
    expect(util.getIntervalFromStep('1')).toEqual('1P');
    expect(util.getIntervalFromStep('b2')).toEqual('2m');
    expect(util.getIntervalFromStep('b3')).toEqual('3m');
});
test('getChordScales', function () {
    expect(util.getChordScales('D-')).toEqual(["dorian",
        "phrygian",
        "aeolian",
        "harmonic minor",
        "dorian #4",
        "melodic minor",
        "melodic minor second mode"]);
    expect(util.getChordScales('D-', 'Basic')).toEqual(["minor pentatonic",
        "minor blues",
        "dorian",
        "phrygian",
        "aeolian"]);
    expect(util.getChordScales('D7#11', 'Diatonic')).toEqual(["lydian dominant"]);
});
test('findDegree', function () {
    expect(util.findDegree(1, tonal_1.Scale.intervals('major'))).toBe('1P');
    expect(util.findDegree(2, tonal_1.Scale.intervals('major'))).toBe('2M');
    expect(util.findDegree(2, tonal_1.Scale.intervals('phrygian'))).toBe('2m');
    expect(util.findDegree(3, tonal_1.Scale.intervals('major'))).toBe('3M');
    expect(util.findDegree(3, tonal_1.Scale.intervals('minor'))).toBe('3m');
    expect(util.findDegree('3', tonal_1.Scale.intervals('minor'))).toBe('3m');
    expect(util.findDegree('b3', tonal_1.Scale.intervals('minor'))).toBe('3m');
    expect(util.findDegree('b3', tonal_1.Scale.intervals('major'))).toBe(undefined);
});
test('hasDegree', function () {
    expect(util.hasDegree(3, ['1', 'b3', '5'])).toBe(true);
    expect(util.hasDegree(2, ['1', 'b3', '5'])).toBe(false);
    expect(util.hasDegree(9, ['1', '2M', 'b3', '5'])).toBe(true);
    expect(util.hasDegree(9, ['1', 'b3', '5'])).toBe(false);
});
test('hasAllDegrees', function () {
    expect(util.hasAllDegrees([1, 5, 3], ['1', 'b3', '5'])).toBe(true);
    expect(util.hasAllDegrees([1, 5, 2], ['1', 'b3', '5'])).toBe(false);
    expect(util.hasAllDegrees([1, 2], ['1', 'b9', '5'])).toBe(false);
});
test('getScaleDegree', function () {
    expect(util.getScaleDegree(1, 'major')).toBe('1P');
    expect(util.getScaleDegree(2, 'major')).toBe('2M');
    expect(util.getScaleDegree(2, 'phrygian')).toBe('2m');
    expect(util.getScaleDegree(3, 'major')).toBe('3M');
    expect(util.getScaleDegree(3, 'minor')).toBe('3m');
    expect(util.getScaleDegree('3', 'minor')).toBe('3m');
    expect(util.getScaleDegree('b3', 'minor')).toBe('3m');
    expect(util.getScaleDegree('b3', 'major')).toBe(undefined);
});
test('getScalePattern', function () {
    expect(util.getScalePattern([1, 2, 3, 5], 'major')).toEqual(['1P', '2M', '3M', '5P']);
    expect(util.getScalePattern([1, 3, 4, 5], 'minor')).toEqual(['1P', '3m', '4P', '5P']);
});
test('permutateIntervals', function () {
    expect(util.permutateIntervals(tonal_1.Scale.intervals('major'), [1, 5, 3, 7])).toEqual(['1P', '5P', '3M', '7M']);
    expect(util.permutateIntervals(tonal_1.Scale.intervals('minor'), [1, 5, 3, 7])).toEqual(['1P', '5P', '3m', '7m']);
});
test('getPatternInChord', function () {
    expect(util.getPatternInChord([1, 5, 3, 7], '7')).toEqual(['1P', '5P', '3M', '7m']);
    expect(util.getPatternInChord([1, 5, 3, 7], '-7')).toEqual(['1P', '5P', '3m', '7m']);
    expect(util.getPatternInChord([1, 9, 3, 7], '-7')).toEqual(['1P', '2M', '3m', '7m']);
});
test('renderIntervals', function () {
    expect(util.renderIntervals(['1P', '3m', '7m'], 'C')).toEqual(['C', 'Eb', 'Bb']);
});
test('renderSteps', function () {
    expect(util.renderSteps(['1', 'b3', 'b7'], 'C')).toEqual(['C', 'Eb', 'Bb']);
});
test('renderDigitalPattern', function () {
    expect(util.renderDigitalPattern('7')).toEqual(['1P', '2M', '3M', '5P']);
    expect(util.renderDigitalPattern('-7')).toEqual(['1P', '3m', '4P', '5P']);
    expect(util.renderDigitalPattern('C-7')).toEqual(['C', 'Eb', 'F', 'G']);
    expect(util.renderDigitalPattern('F7')).toEqual(['F', 'G', 'A', 'C']);
    expect(util.renderDigitalPattern('F^7')).toEqual(['F', 'G', 'A', 'C']);
});
test('getGuideTones', function () {
    expect(util.getGuideTones('C7')).toEqual(['E', 'Bb']);
    expect(util.getGuideTones('D-7')).toEqual(['F', 'C']);
    expect(util.getGuideTones('Ab-7')).toEqual(['Cb', 'Gb']);
});
test('simplifyInterval', function () {
    expect(util.simplifyInterval('8P')).toBe('1P');
    expect(util.simplifyInterval('-8P')).toBe('1P');
    expect(util.simplifyInterval('1P')).toBe('1P');
    expect(util.simplifyInterval('0A')).toBe('1P');
    expect(util.simplifyInterval('-0A')).toBe('1P');
    expect(util.simplifyInterval('2A')).toBe('2A');
    expect(util.simplifyInterval('5A')).toBe('5A');
    expect(util.simplifyInterval('9M')).toBe('2M');
    expect(util.simplifyInterval('-9M')).toBe('-2M');
    expect(util.simplifyInterval('-2M')).toBe('-2M');
});
test('minInterval', function () {
    expect(util.minInterval('9M')).toBe('2M');
    expect(util.minInterval('8P')).toBe('1P');
    expect(util.minInterval('2m')).toBe('2m');
    expect(util.minInterval('-7M')).toBe('2m');
    expect(util.minInterval('-7M', 'up', true)).toBe('2m');
    expect(util.minInterval('-7M', 'down', true)).toBe('-7M');
    expect(util.minInterval('2m', 'down', true)).toBe('-7M');
    expect(util.minInterval('2m', 'up', true)).toBe('2m');
});
test('mapMinInterval', function () {
    expect(['2M', '2m', '7M', '4P']
        .map(util.mapMinInterval('up')))
        .toEqual(['2M', '2m', '-2m', '4P']);
});
test('sortMinIntervals', function () {
    expect(['2M', '2m', '-2m', '4P']
        .sort(util.sortMinInterval()))
        .toEqual(['2m', '-2m', '2M', '4P']);
});
test('invertInterval', function () {
    expect(util.invertInterval('1A')).toEqual('-8d');
    expect(util.invertInterval('-1A')).toEqual('8d');
});
test('forceDirection', function () {
    expect(util.forceDirection('-2M', 'up')).toEqual('7m');
    expect(util.forceDirection('-2M', 'down')).toEqual('-2M');
    expect(util.forceDirection('3M', 'up')).toEqual('3M');
    expect(util.forceDirection('3M', 'down')).toEqual('-6m');
    expect(util.forceDirection('-8A', 'down')).toEqual('-8A');
    expect(util.forceDirection('-8P', 'up')).toEqual('8P');
    expect(util.forceDirection('1A', 'down')).toEqual('-8d');
});
test('getNearestNote', function () {
    expect(util.getNearestNote('C4', 'G')).toBe('G3');
    expect(util.getNearestNote('C4', 'F')).toBe('F4');
    expect(util.getNearestNote('C4', 'F', 'down')).toBe('F3');
    expect(util.getNearestNote('C4', 'F', 'up')).toBe('F4');
    expect(util.getNearestNote('D5', 'Db')).toBe('Db5');
    expect(util.getNearestNote('D5', 'Db', 'down')).toBe('Db5');
});
test('getNearestTargets', function () {
    expect(util.getNearestTargets('C4', ['F', 'G'])[0]).toBe('G3');
    expect(util.getNearestTargets('E5', ['G', 'D'])[0]).toBe('D5');
    expect(util.getNearestTargets('C4', ['F', 'G'], 'up')[0]).toBe('F4');
    expect(util.getNearestTargets('C4', ['F', 'G'], 'down')[0]).toBe('G3');
    expect(util.getNearestTargets('C4', ['F', 'Gb'], 'down')[0]).toBe('F4');
    expect(util.getNearestTargets('C4', ['F', 'F#'], 'down', true)[0]).toBe('F#3');
    expect(util.getNearestTargets('D5', ['Db', 'Ab'], 'down')[0]).toBe('Db5');
    expect(util.getNearestTargets('C4', ['D', 'E'], 'down', true)[0]).toBe('E3');
    expect(util.getNearestTargets('C4', ['D', 'Db'], 'down', true)[0]).toBe('D3');
    expect(util.getNearestTargets('C4', ['D', 'C#'], 'down', true)[0]).toBe('D3');
    expect(util.getNearestTargets('C4', ['Db', 'C#'], 'down', true)[0]).toBe('C#3');
    expect(util.getNearestTargets('B3', ['Bb', 'E'], 'down', true)[0]).toBe('Bb3');
});
test('getRangePosition', function () {
    expect(util.getRangePosition('C2', ['C3', 'C4'])).toBe(-1);
    expect(util.getRangePosition('C5', ['C3', 'C4'])).toBe(2);
    expect(util.getRangePosition('C3', ['C3', 'C4'])).toBe(0);
    expect(util.getRangePosition('F#', ['C3', 'C4'])).toBe(.5);
    expect(util.getRangePosition('C4', ['C3', 'C4'])).toBe(1);
    expect(util.getRangePosition('G#3', ['C3', 'C4'])).toBe(8 / 12);
    expect(util.getRangePosition('A3', ['C3', 'C4'])).toBe(9 / 12);
    expect(util.getRangePosition('D3', ['C3', 'C4'])).toBe(2 / 12);
});
test('isFirstInPath', function () {
    expect(util.isFirstInPath([0, 0, 0], 1)).toBe(true);
    expect(util.isFirstInPath([0, 1, 0], 1)).toBe(false);
    expect(util.isFirstInPath([0, 0, 1], 1)).toBe(false);
    expect(util.isFirstInPath([0, 1, 1], 1)).toBe(false);
    expect(util.isFirstInPath([0, 0, 0], 2)).toBe(true);
    expect(util.isFirstInPath([0, 0, 1], 2)).toBe(false);
    expect(util.isFirstInPath([0, 1, 0], 2)).toBe(true);
    expect(util.isFirstInPath([1, 1, 0], 2)).toBe(true);
    expect(util.isFirstInPath([1, 0, 0, 0, 0], 0)).toBe(false);
    expect(util.isFirstInPath([1, 0, 0, 0, 0], 1)).toBe(true);
    expect(util.isFirstInPath([1, 0, 0, 0, 0], 2)).toBe(true);
    expect(util.isFirstInPath([1, 0, 0, 0, 0], 3)).toBe(true);
    expect(util.isFirstInPath([1, 0, 0, 0, 0], 4)).toBe(true);
});
test('parseChords', function () {
    expect(util_1.parseChordSnippet('D-7')).toEqual(['D-7']);
    expect(util_1.parseChordSnippet('D-7 G7 C^7')).toEqual([['D-7', 'G7', 'C^7']]);
    expect(util_1.parseChordSnippet('D-7 | G7 | C^7')).toEqual(['D-7', 'G7', 'C^7']);
    expect(util_1.parseChordSnippet('D-7 G7 | C^7')).toEqual([['D-7', 'G7'], 'C^7']);
    expect(util_1.parseChordSnippet("\n    C7  | F7 | C7 | C7\n    F7  | F7 | C7 | A7\n    D-7 | G7 | C7 | G7"))
        .toEqual([
        'C7', 'F7', 'C7', 'C7',
        'F7', 'F7', 'C7', 'A7',
        'D-7', 'G7', 'C7', 'G7'
    ]);
    expect(util_1.parseChordSnippet("\n            | C7  | F7 | C7 | C7 |\n            | F7  | F7 | C7 | A7 |\n            | D-7 | G7 | C7 | G7 |"))
        .toEqual([
        'C7', 'F7', 'C7', 'C7',
        'F7', 'F7', 'C7', 'A7',
        'D-7', 'G7', 'C7', 'G7'
    ]);
});
test('parseChords: houses', function () {
    expect(util_1.parseChordSnippet("\n            |: C7  | F7 |1 C7 | C7 :|\n                        |2 C7 | C7  |\n            | F7   | F7 |  C7 | A7  |\n            | D-7  | G7 |  C7 | G7  |"))
        .toEqual([
        { chords: ['C7'], signs: ['{'] }, 'F7',
        { house: 1, chords: ['C7'] }, { chords: ['C7'], signs: ['}'] },
        { house: 2, chords: ['C7'] }, 'C7',
        'F7', 'F7', 'C7', 'A7',
        'D-7', 'G7', 'C7', 'G7'
    ]);
});
test('parseChordSnippet: houses', function () {
    expect(util_1.parseChordSnippet("\n            |:C7:|"))
        .toEqual([
        { chords: ['C7'], signs: ['{', '}'] }
    ]);
});
test('minifyChordSnippet', function () {
    expect(util_1.minifyChordSnippet("|C7|F7|")).toEqual('C7|F7');
    expect(util_1.minifyChordSnippet("   C7    |  F7")).toEqual('C7|F7');
    expect(util_1.minifyChordSnippet("RCIFSM7IX")).toEqual(':C|F#^7|%');
    expect(util_1.minifyChordSnippet(':C|F#^7|%', true)).toEqual('RCIFSM7IX');
    expect(util_1.minifyChordSnippet("C7\n                                F7")).toEqual('C7|F7');
    expect(util_1.minifyChordSnippet("C7|||||F7")).toEqual('C7|F7');
    var urlSafe = util_1.minifyChordSnippet("\n    |: E-7b5    | A7b9      | D-     | x          |\n    |  G-7      | C7        | F^7    | E-7b5 A7b9 |\n    \n    |1 D-       | G-7       | Bb7    | A7b9       |\n    |  D-       | G7#11     | E-7b5  | A7b9      :|\n    \n    |2 D-       | G-7       | Bb7    | A7b9       |\n    |  D- B7    | Bb7#11 A7 | D-     | x          |\n    ", true);
    expect(urlSafe).toBe("RE-7b5IA7b9ID-IxIG-7IC7IFM7IE-7b5_A7b9I1_D-IG-7IBb7IA7b9ID-IG7S11IE-7b5IA7b9RI2_D-IG-7IBb7IA7b9ID-_B7IBb7S11_A7ID-Ix");
    expect(new RegExp(/^[a-zA-Z0-9_-]*$/).test(urlSafe)).toBe(true);
});
test('minifyChordSnippet', function () {
    var urlsafe = 'RE-7b5IA7b9ID-IxIG-7IC7IFM7IE-7b5_A7b9I1_D-IG-7IBb7IA7b9ID-IG7S11IE-7b5IA7b9RI2_D-IG-7IBb7IA7b9ID-_B7IBb7S11_A7ID-Ix';
    var formatted = util_1.formatChordSnippet(urlsafe);
    expect(formatted).toBe("|:E-7b5|A7b9|D-|x|\n|G-7|C7|F^7|E-7b5 A7b9|\n|1 D-|G-7|Bb7|A7b9|\n|D-|G7#11|E-7b5|A7b9:|\n|2 D-|G-7|Bb7|A7b9|\n|D- B7|Bb7#11 A7|D-|x|");
    expect(util_1.minifyChordSnippet(formatted, true)).toBe(urlsafe);
});