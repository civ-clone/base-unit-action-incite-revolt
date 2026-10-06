"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InciteRevolt = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("@civ-clone/core-unit/Action");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const RevoltIncited_1 = require("./Rules/RevoltIncited");
/** A Diplomat pays `cost()` for `city()` to rebel and join its civilization. Whether it can, and what happens to the city, is up to the `RevoltIncited` rules. The Diplomat is used up when the city changes hands. */
class InciteRevolt extends Action_1.default {
    constructor(from, to, unit, city, cost, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        this._city = city;
        this._cost = cost;
        this.addKey('cost');
    }
    cost() {
        return this._cost;
    }
    // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
    // the `City` goes.
    // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
    forUnit(unit) {
        return new InciteRevolt(this.from(), this.to(), unit, this._city, this._cost, this.ruleRegistry());
    }
    perform() {
        const results = this.ruleRegistry().process(RevoltIncited_1.default, this.unit(), this._city, this);
        // Refused, say for want of gold: the Diplomat stays where it is.
        if (!results.includes(true)) {
            return;
        }
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
        this.unit().destroy();
    }
}
exports.InciteRevolt = InciteRevolt;
exports.default = InciteRevolt;
//# sourceMappingURL=InciteRevolt.js.map