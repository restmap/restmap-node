import {before, describe, it} from "mocha";
import {expect} from "chai";
import parse from "../app/parse";
import {typeOf} from "../app/utils/extra";
import {OBJECT} from "../app/utils/constant";

describe("parse", () => {
    describe("+ve tests", () => {
        describe("given object with 5 keys", ()=>{

            describe("no nesting", () => {
                const data = "{a,b,c,d,e}";
                let result;

                before(() => {
                    result = parse(data);
                });

                it("should have 5 keys", function () {
                    expect(Object.keys(result)).to.have.lengthOf(5);
                });

                it("should have all key value to be 'true' only", function () {
                    Object.keys(result).forEach((key) => {
                        expect(result[key]).to.be.true;
                    });
                });
            });

            describe("nesting in 2 keys both containing 2 keys respectively", () => {
                const data = "{a,b,c{s,t},d,e{y,z}}";
                let result;

                before(() => {
                    result = parse(data);
                });

                it("should have 5 keys", function () {
                    expect(Object.keys(result)).to.have.lengthOf(5);
                });

                it("should have nesting in 'c' key", function () {
                    expect(typeOf(result["c"])).to.equal(OBJECT);
                });

                it("should have nesting in 'e' key", function () {
                    expect(typeOf(result["e"])).to.equal(OBJECT);
                });

                it("should have 2 keys inside 'c' key", function () {
                    const keys = Object.keys(result["c"]);
                    expect(keys).to.have.lengthOf(2);
                });

                it("should have 2 keys inside 'e' key", function () {
                    const keys = Object.keys(result["e"]);
                    expect(keys).to.have.lengthOf(2);
                });

                it("should have 2 'true' keys inside 'c' key", function () {
                    Object.keys(result["c"]).forEach((key) => {
                        expect(result["c"][key]).to.be.true;
                    });
                });

                it("should have 2 'true' keys inside 'e' key", function () {
                    Object.keys(result["e"]).forEach((key) => {
                        expect(result["e"][key]).to.be.true;
                    });
                });
            });
        })
    });
});
