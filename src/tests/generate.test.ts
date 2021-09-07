import { before, describe, it } from "mocha";
import { expect } from "chai";
import generate from "../app/generate";
import parse from "../app/parse";

describe("generate", () => {
    describe("+ve tests", function () {
        describe("given object", () => {
            describe("with 3 keys & no nesting", () => {
                const data = { hello: true, world: true, today: true };
                let result;

                before(() => {
                    result = generate(data);
                });

                it("should be a string", function () {
                    expect(result).to.be.a("string");
                });

                it("should be parsable", function () {
                    expect(parse(result)).to.be.ok;
                });

                it("should match given pattern", function () {
                    expect(result).equal("{hello,world,today}");
                });
            });

            describe("with 3 keys & 1 nesting", () => {
                const data = {
                    hello: true,
                    world: true,
                    today: { great: true },
                };

                let result;

                before(() => {
                    result = generate(data);
                });

                it("should be a string", function () {
                    expect(result).to.be.a("string");
                });

                it("should be parsable", function () {
                    expect(parse(result)).to.be.ok;
                });

                it("should match given pattern", function () {
                    expect(result).equal("{hello,world,today{great}}");
                });
            });

            describe("with 3 keys & 1 array nesting", () => {
                const data = {
                    hello: true,
                    world: true,
                    today: [{ great: true }],
                };

                let result;

                before(() => {
                    result = generate(data);
                });

                it("should be a string", function () {
                    expect(result).to.be.a("string");
                });

                it("should be parsable", function () {
                    expect(parse(result)).to.be.ok;
                });

                it("should match given pattern", function () {
                    expect(result).equal("{hello,world,today{great}}");
                });
            });

            describe("with 3 keys, 1 array nesting & 1 sub nesting", () => {
                const data = {
                    hello: true,
                    world: true,
                    today: [
                        {
                            great: true,
                            cool: {
                                tomorrow: true,
                            },
                        },
                    ],
                };

                let result;

                before(() => {
                    result = generate(data);
                });

                it("should be a string", function () {
                    expect(result).to.be.a("string");
                });

                it("should be parsable", function () {
                    expect(parse(result)).to.be.ok;
                });

                it("should match given pattern", function () {
                    expect(result).equal(
                        "{hello,world,today{great,cool{tomorrow}}}",
                    );
                });
            });

            describe("with 3 keys, 1 array nesting & 1 array sub nesting", () => {
                const data = {
                    hello: true,
                    world: true,
                    today: [
                        {
                            great: true,
                            cool: [
                                {
                                    tomorrow: true,
                                },
                            ],
                        },
                    ],
                };

                let result;

                before(() => {
                    result = generate(data);
                });

                it("should be a string", function () {
                    expect(result).to.be.a("string");
                });

                it("should be parsable", function () {
                    expect(parse(result)).to.be.ok;
                });

                it("should match given pattern", function () {
                    expect(result).equal(
                        "{hello,world,today{great,cool{tomorrow}}}",
                    );
                });
            });
        });
    });
});
