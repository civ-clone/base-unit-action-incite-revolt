"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InciteRevolt = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const escape_1 = require("@civ-clone/base-unit-agent/lib/escape");
const Action_1 = require("@civ-clone/core-unit/Action");
const mission_1 = require("@civ-clone/base-unit-agent/lib/mission");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const RevoltIncited_1 = require("./Rules/RevoltIncited");
/**
 * A Diplomat pays `cost()` for `city()` to rebel and join its civilization. Whether it can, and what happens to the
 * city, is up to the `RevoltIncited` rules.
 *
 * Before the mission, the Diplomat must survive a caught check (base-unit-agent's `AgentSurvives` with
 * `CAUGHT_CHECK`); one that doesn't is destroyed. Once the city changes hands, the Diplomat is used up unless it
 * survives an `ORDINARY` check. With no `AgentSurvives` rules, the check passes and it is used up.
 */
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
    city() {
        return this._city;
    }
    perform() {
        const unit = this.unit(), mission = this;
        if (!(0, mission_1.agentSurvives)(unit, mission, escape_1.CAUGHT_CHECK, this.ruleRegistry())) {
            this.ruleRegistry().process(Moved_1.default, unit, mission);
            unit.destroy();
            return;
        }
        const results = this.ruleRegistry().process(RevoltIncited_1.default, unit, this._city, this);
        // Refused, say for want of gold: the Diplomat stays where it is.
        if (!results.includes(true)) {
            return;
        }
        this.ruleRegistry().process(Moved_1.default, unit, mission);
        if (!(0, mission_1.agentSurvives)(unit, mission, escape_1.ORDINARY, this.ruleRegistry())) {
            unit.destroy();
        }
    }
}
exports.InciteRevolt = InciteRevolt;
exports.default = InciteRevolt;
//# sourceMappingURL=InciteRevolt.js.map