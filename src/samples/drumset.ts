const k = require('./drummer/kick.wav')
const s = require('./drummer/snare.wav')
const h = require('./drummer/hihat.wav')
const r = require('./drummer/ride.wav')
const c = require('./drummer/crash.wav')
const rs = require('./drummer/rimshot.wav')

export const kick = k;
export const snare = s;
export const hihat = h;
export const ride = r;
export const crash = c;
export const rimshot = rs;
export const drumset = [kick, snare, hihat, ride, crash, rimshot];
export const drumSamples = { 'C1': kick, 'C2': snare, 'C3': hihat, 'C4': ride, 'C5': crash, 'C6': rimshot };