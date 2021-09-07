import { before, describe, it } from "mocha";
import { expect } from "chai";
import { typeOf } from "../../app/utils/extra";
import { STRING } from "../../app/utils/constant";

describe("extra utility functions", () => {
    describe("typeOf data be string", () => {
        const data = "hello";
        const result = typeOf(data);

        it("expect result to be string", function () {
            expect(result).to.be.a("string");
        });

        it("expect result to equal 'string' ", function () {
            expect(result).to.equal(STRING);
        });
    });
});
