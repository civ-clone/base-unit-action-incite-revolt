import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import City from '@civ-clone/core-city/City';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
/** A Diplomat pays `cost()` for `city()` to rebel and join its civilization. Whether it can, and what happens to the city, is up to the `RevoltIncited` rules. The Diplomat is used up when the city changes hands. */
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
  perform(): void;
}
export default InciteRevolt;
