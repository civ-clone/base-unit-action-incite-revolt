"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SneakInciteRevolt = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const InciteRevolt_1 = require("./InciteRevolt");
/** Inciting a revolt in a city of a civilization the Diplomat's is at peace with, which ends the peace. */
class SneakInciteRevolt extends InciteRevolt_1.default {
    constructor(from, to, unit, city, cost, enemy, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, city, cost, ruleRegistry);
        this._enemy = enemy;
        this.addKey('enemy');
    }
    enemy() {
        return this._enemy;
    }
    // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
    forUnit(unit) {
        return new SneakInciteRevolt(this.from(), this.to(), unit, this._city, this._cost, this._enemy, this.ruleRegistry());
    }
}
exports.SneakInciteRevolt = SneakInciteRevolt;
exports.default = SneakInciteRevolt;
//# sourceMappingURL=SneakInciteRevolt.js.map