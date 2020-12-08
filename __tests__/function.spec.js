import { syncGeo, syncWeather, syncPic, updateUI } from '../src/client/js/api.js'

test('syncGeo shoud be a function', () => {
        expect(typeof syncGeo).toBe('function');
});

test('syncWeather shoud be a function', () => {
        expect(typeof syncWeather).toBe('function');
});

test('syncPic shoud be a function', () => {
        expect(typeof syncPic).toBe('function');
});

test('updateUI shoud be a function', () => {
        expect(typeof updateUI).toBe('function');
});