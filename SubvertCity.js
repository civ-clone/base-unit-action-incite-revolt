"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubvertCity = void 0;
const InciteRevolt_1 = require("./InciteRevolt");
/** Buying a city of a civilization the Diplomat's is at peace with, keeping the peace. What it costs is the ruleset's. */
class SubvertCity extends InciteRevolt_1.default {
    // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
    forUnit(unit) {
        return new SubvertCity(this.from(), this.to(), unit, this._city, this._cost, this.ruleRegistry());
    }
}
exports.SubvertCity = SubvertCity;
exports.default = SubvertCity;
//# sourceMappingURL=SubvertCity.js.map