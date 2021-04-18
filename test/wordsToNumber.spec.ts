import { WordsToNumber } from "../src";

describe("WordsToNumber", () => {
	it("Should works as well", () => {
		expect(WordsToNumber.convert<number>("منفی سه هزار")).toEqual(-3000);
		expect(WordsToNumber.convert<number>("سه هزار دویست و دوازده")).toEqual(3212);
		expect(WordsToNumber.convert<number>("دوازده هزار بیست دو")).toEqual(12022);
		expect(WordsToNumber.convert<string>("دوازده هزار بیست دو", { addCommas: true })).toEqual("12,022");
		expect(WordsToNumber.convert<string>("دوازده هزار و بیست و دو", { addCommas: true })).toEqual("12,022");
	});

	it("Ordinal words", () => {
		expect(WordsToNumber.convert<string>("منفی ۳ هزار", { convertToFaDigits: true, addCommas: true })).toEqual("-۳,۰۰۰");
		expect(WordsToNumber.convert<string>("منفی 3 هزار و 200", { convertToFaDigits: true, addCommas: true })).toEqual("-۳,۲۰۰");
		expect(WordsToNumber.convert<string>("منفی سه هزارمین", { convertToFaDigits: true, addCommas: true })).toEqual("-۳,۰۰۰");
		expect(WordsToNumber.convert<string>("منفی سه هزارمین", { convertToFaDigits: true })).toEqual("-۳۰۰۰");
		expect(WordsToNumber.convert<number>("منفی سه هزارمین")).toEqual(-3000);
		expect(WordsToNumber.convert<number>("منفی سه هزارم")).toEqual(-3000);
		expect(WordsToNumber.convert<string>("منفی سه هزارمین")).not.toEqual("-3000");
		expect(String(WordsToNumber.convert<number>("منفی سه هزارمین"))).toHaveLength(5);
		expect(WordsToNumber.convert<number>("منفی سی اُم")).toEqual(-30);
		expect(WordsToNumber.convert<number>("سی و سوم", { fuzzy: true })).toEqual(33);
	});

	it("Should return undefined", () => {
		expect(WordsToNumber.convert<string>("", { convertToFaDigits: true, addCommas: true })).toEqual("");
		// @ts-ignore
		expect(WordsToNumber.convert()).toEqual("");
	});

	it("Should works with fuzzy model", () => {
		expect(WordsToNumber.convert<number>("ضد و بنچاه و دو", { fuzzy: true })).toEqual(152);
	});
});
