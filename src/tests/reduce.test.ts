import { before, describe, it } from "mocha";
import { expect } from "chai";
import parse from "../app/parse";
import reduce from "../app/reduce";

describe("reduce", () => {
    describe("basic tests", function () {
        let data = {
            hello: 1,
            world: {
                today: "yes",
                tomorrow: {
                    nice: 0,
                    yeah: [],
                },
            },
            great: {
                never: 2,
                now: [
                    {
                        will: false,
                    },
                    {
                        will: true,
                    },
                ],
            },
        };

        describe("3 keys, all data", () => {
            let map = "{hello,world,great}";
            let result;

            before(() => {
                const imap = parse(map);
                result = reduce(imap, data);
            });

            it("expect to have 3 keys", function () {
                expect(Object.keys(result)).to.have.a.lengthOf(3);
            });

            it("expect key 'world' to be object ", function () {
                expect(result["world"]).to.be.an("object");
            });

            it("expect key 'world' to have match given value", function () {
                expect(result["world"]).to.have.all.keys({
                    today: "yes",
                    tomorrow: false,
                });
            });

            it("expect key 'great' to be object", function () {
                expect(result["great"]).to.be.an("object");
            });

            it("expect key 'great' to contain key 'now'", function () {
                expect(result["great"]).to.have.all.keys("now", "never");
            });

            it("expect key 'great.now' to be array", function () {
                expect(result["great"]["now"]).to.be.an("array");
            });

            it("expect key 'great.now' to have lengthOf 2", function () {
                expect(Object.keys(result["great"]["now"])).to.have.lengthOf(2);
            });

            it("expect key 'great.now' to have object", function () {
                expect(result["great"]["now"][0]).to.be.an("object");
            });

            it("expect key 'great.now'[0] value to match given", function () {
                expect(result["great"]["now"][0]).to.have.all.keys({
                    will: true,
                });
            });
        });

        describe("2 keys, 1 nesting, 1 sub nesting", () => {
            let map = "{hello,world{tomorrow{yeah}}}";
            let result;

            before(() => {
                const imap = parse(map);
                result = reduce(imap, data);
            });

            it("expect to have 2 keys", function () {
                expect(Object.keys(result)).to.have.a.lengthOf(2);
            });

            it("expect key 'world' to be object ", function () {
                expect(result["world"]).to.be.an("object");
            });

            it("expect key 'world' to have 1 key", function () {
                expect(Object.keys(result["world"])).to.have.lengthOf(1);
            });

            it("expect key 'world.tomorrow' to be object", function () {
                expect(result["world"]["tomorrow"]).to.be.an("object");
            });

            it("expect key 'world.tomorrow' to contain 1 key", function () {
                expect(
                    Object.keys(result["world"]["tomorrow"]),
                ).to.have.lengthOf(1);
            });

            it("expect key 'world.tomorrow.yeah' to be an empty array", function () {
                expect(
                    Object.keys(result["world"]["tomorrow"]["yeah"]),
                ).to.be.an("array").that.is.empty;
            });
        });
    });

    describe("coverage tests", function () {
        describe("data is array of objects", () => {
            const data = [
                { hello: { world: true } },
                { hello: { world: false } },
            ];
            let map = "{hello}";
            let result;

            before(() => {
                const imap = parse(map);
                result = reduce(imap, data);
            });

            it("expect to be an array", function () {
                expect(result).to.be.an("array");
            });

            it("expect array of length 2", function () {
                expect(result).to.have.lengthOf(2);
            });

            it("expect items to be an object", function () {
                expect(result[0]).to.be.an("object");
            });

            it("expect [1] to have 1 key", function () {
                expect(result[1]).to.have.all.keys("hello");
            });
        });

        describe("unavailable key test", function () {
            const data = { hello: [{ world: false }] };
            let map = "{hello{today,world{is}},now}";
            let result;

            before(() => {
                const imap = parse(map);
                result = reduce(imap, data, null);
            });

            it("expect to have 2 keys", function () {
                expect(Object.keys(result)).to.have.lengthOf(2);
            });

            it("expect now to be null (unavailable)", function () {
                expect(result.now).to.be.null;
            });

            it("expect hello to be an array", function () {
                expect(result.hello).to.be.an("array");
            });

            it("expect hello to have length 1", function () {
                expect(result.hello).to.have.lengthOf(1);
            });

            it("expect hello[0].today to be null (unavailable)", function () {
                expect(result.hello[0].today).to.be.null;
            });

            it("expect hello[0].world to be null (unavailable)", function () {
                expect(result.hello[0].world).to.be.null;
            });
        });
    });
});
