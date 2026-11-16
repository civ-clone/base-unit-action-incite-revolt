import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import City from '@civ-clone/core-city/City';
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
export declare class InciteRevolt extends Action {
  protected _city: City;
  protected _cost: number;
  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    city: City,
    cost: number,
    ruleRegistry?: RuleRegistry
  );
  cost(): number;
  forUnit(unit: Unit): Action;
  city(): City;
  perform(): void;
}
export default InciteRevolt;
