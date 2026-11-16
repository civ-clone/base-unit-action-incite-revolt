import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { CAUGHT_CHECK, ORDINARY } from '@civ-clone/base-unit-agent/lib/escape';
import Action from '@civ-clone/core-unit/Action';
import { agentSurvives } from '@civ-clone/base-unit-agent/lib/mission';
import City from '@civ-clone/core-city/City';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import RevoltIncited from './Rules/RevoltIncited';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

/**
 * A Diplomat pays `cost()` for `city()` to rebel and join its civilization. Whether it can, and what happens to the
 * city, is up to the `RevoltIncited` rules.
 *
 * Before the mission, the Diplomat must survive a caught check (base-unit-agent's `AgentSurvives` with
 * `CAUGHT_CHECK`); one that doesn't is destroyed. Once the city changes hands, the Diplomat is used up unless it
 * survives an `ORDINARY` check. With no `AgentSurvives` rules, the check passes and it is used up.
 */
export class InciteRevolt extends Action {
  protected _city: City;
  protected _cost: number;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    city: City,
    cost: number,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);

    this._city = city;
    this._cost = cost;

    this.addKey('cost');
  }

  cost(): number {
    return this._cost;
  }

  // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
  // the `City` goes.
  // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
  forUnit(unit: Unit): Action {
    return new InciteRevolt(
      this.from(),
      this.to(),
      unit,
      this._city,
      this._cost,
      this.ruleRegistry()
    ) as unknown as Action;
  }

  city(): City {
    return this._city;
  }

  perform(): void {
    const unit = this.unit(),
      mission = this as unknown as Action;

    if (!agentSurvives(unit, mission, CAUGHT_CHECK, this.ruleRegistry())) {
      this.ruleRegistry().process(Moved, unit, mission);

      unit.destroy();

      return;
    }

    const results = this.ruleRegistry().process(
      RevoltIncited,
      unit,
      this._city,
      this
    );

    // Refused, say for want of gold: the Diplomat stays where it is.
    if (!results.includes(true)) {
      return;
    }

    this.ruleRegistry().process(Moved, unit, mission);

    if (!agentSurvives(unit, mission, ORDINARY, this.ruleRegistry())) {
      unit.destroy();
    }
  }
}

export default InciteRevolt;
