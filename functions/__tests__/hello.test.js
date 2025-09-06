const { sum } = require('../yourFunctionFile'); // replace with your actual function file

test('hello world!', () => {
	expect(sum(1, 2)).toBe(3);
});