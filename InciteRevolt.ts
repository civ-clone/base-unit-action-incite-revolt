import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { CAUGHT_CHECK, ORDINARY } from '@civ-clone/base-unit-agent/lib/escape';
import Action from '@civ-clone/core-unit/Action';
import {
  agentSurvives,
  loseAgent,
  missionMode,
} from '@civ-clone/base-unit-agent/lib/mission';
import City from '@civ-clone/core-city/City';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import RevoltIncited from './Rules/RevoltIncited';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

/**
 * A Diplomat pays `cost()` for `city()` to rebel and join its civilization. Whether it can, and what happens to the
 * city, is up to the `RevoltIncited` rules.
 *
 * The mission asks base-unit-agent's seams (its README): `MissionMode` (default `ORDINARY`), then the caught check
 * (`AgentSurvives` with `CAUGHT_CHECK`; a caught Diplomat goes to `AgentLost` and is destroyed by the city's owner,
 * with no `Moved`), then the mission, `Moved`, and `AgentSurvives` with the resolved mode (a Diplomat that doesn't
 * survive goes to `AgentLost` and is destroyed as before). With none of those rules, it is used up as before.
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

    const mode = missionMode(unit, mission, ORDINARY, this.ruleRegistry());

    if (
      !agentSurvives(
        unit,
        mission,
        CAUGHT_CHECK,
        this.ruleRegistry(),
        undefined,
        mode
      )
    ) {
      loseAgent(
        unit,
        this._city,
        mission,
        true,
        this.ruleRegistry(),
        this._city.player()
      );

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

    if (!agentSurvives(unit, mission, mode, this.ruleRegistry())) {
      loseAgent(unit, this._city, mission, false, this.ruleRegistry());
    }
  }
}

export default InciteRevolt;
