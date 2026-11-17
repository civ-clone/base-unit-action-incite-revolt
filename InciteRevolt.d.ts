import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import City from '@civ-clone/core-city/City';
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
