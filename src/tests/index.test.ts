import { describe, it } from "mocha";
import { expect } from "chai";
import { generateMap, reduceData, verifyMap } from "../app";
import parse from "../app/parse";

describe("index.js - public methods", () => {
    describe("verify map", () => {
        describe("valid restmap", () => {
            const map = "{hello,{world{is},great{as{fck}}}}";
            const result = verifyMap(map);

            it("should be true", function () {
                expect(result).to.be.true;
            });
        });

        describe("invalid restmap", () => {
            const map = "{hello";
            const result = verifyMap(map);

            it("should be false", function () {
                expect(result).to.be.false;
            });
        });
    });

    describe("generate map", () => {
        describe("valid data", () => {
            const data = { hello: [{ world: true }], great: 1 };
            const result = generateMap(data);

            it("expect to be string", function () {
                expect("result").to.be.a("string");
            });

            it("expect to be parseable", function () {
                expect(parse(result)).to.be.ok;
            });
        });

        describe("invalid data", () => {
            const data = "some string";

            it("expect to throw error 'invalid JSON object' ", function () {
                const fn = () => {
                    generateMap(data);
                };
                expect(fn).to.throw("invalid JSON object");
            });
        });
    });

    describe("reduce data", () => {
        describe("valid data & restmap", () => {
            const restmap = "{hello,world}";
            const data = { hello: true, world: false, great: true };
            const result = reduceData(restmap, data);

            it("expect to be object", function () {
                expect(result).to.be.an("object");
            });
            it("expect to contain 2 keys", function () {
                expect(Object.keys(result)).to.have.lengthOf(2);
            });
            it("expect to 'world' value to be false", function () {
                expect(result).to.own.include({ world: false });
            });
        });

        describe("invalid restmap", () => {
            const restmap: any = { hello: true };
            const data = {};

            it("expect to throw error", function () {
                const fn = () => {
                    reduceData(restmap, data);
                };
                expect(fn).to.throw("restmap must be a string");
            });
        });

        describe("escape keys", () => {
            const data = {
                hello: true,
                hey: { world: true, is: true, great: true },
            };
            const restmap = "{-hello,hey{-world}}";
            const result = reduceData(restmap, data);

            it("expect to be object", function () {
                expect(result).to.be.an("object");
            });

            it("expect to contain 1 key", function () {
                expect(Object.keys(result)).to.have.lengthOf(1);
            });

            it("expect 'hello' value to not exist", function () {
                expect(result).to.not.have.all.keys("hello");
            });

            it("expect 'hey' to contain 2 keys", function () {
                expect(Object.keys(result["hey"])).to.have.lengthOf(2);
            });
        });

        describe("custom escape key", () => {
            const data = {
                hello: true,
                hey: { world: true, is: true, great: true },
            };
            const restmap = "{#hello,hey{#world,#is}}";
            const result = reduceData(restmap, data, "#");

            it("expect to be object", function () {
                expect(result).to.be.an("object");
            });

            it("expect to contain 1 key", function () {
                expect(Object.keys(result)).to.have.lengthOf(1);
            });

            it("expect 'hello' value to not exist", function () {
                expect(result).to.not.have.all.keys("hello");
            });

            it("expect 'hey' to contain 1 key", function () {
                expect(Object.keys(result["hey"])).to.have.lengthOf(1);
            });
        });

        describe("custom escape key (invalid)", () => {
            const data = {
                hello: true,
                hey: { world: true, is: true, great: true },
            };
            const restmap = "{#hello,hey{-world}}";
            const result = reduceData(restmap, data, "#", 0);

            it("expect to be object", function () {
                expect(result).to.be.an("object");
            });

            it("expect to contain 1 key", function () {
                expect(Object.keys(result)).to.have.lengthOf(1);
            });

            it("expect 'hello' value to not exist", function () {
                expect(result).to.not.have.all.keys("hello");
            });

            it("expect 'hey' to contain only 1 key", function () {
                expect(Object.keys(result["hey"])).to.have.lengthOf(1);
            });

            it("expect 'hey.-world' to exist with custom unavailable value", function () {
                expect(result["hey"]).to.eql({ "-world": 0 });
            });
        });

        describe("custom unavailable key value", () => {
            const data = { hello: true, hey: false };
            const restmap = "{world}";
            const result = reduceData(restmap, data, "-", null);

            it("expect to be object", function () {
                expect(result).to.be.an("object");
            });

            it("expect to contain 1 key", function () {
                expect(Object.keys(result)).to.have.lengthOf(1);
            });

            it("expect 'world' value to be null", function () {
                expect(result).to.own.include({ world: null });
            });
        });
    });
});
