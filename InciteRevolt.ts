import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import City from '@civ-clone/core-city/City';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import RevoltIncited from './Rules/RevoltIncited';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

/** A Diplomat pays `cost()` for `city()` to rebel and join its civilization. Whether it can, and what happens to the city, is up to the `RevoltIncited` rules. The Diplomat is used up when the city changes hands. */
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

  perform(): void {
    const results = this.ruleRegistry().process(
      RevoltIncited,
      this.unit(),
      this._city,
      this
    );

    // Refused, say for want of gold: the Diplomat stays where it is.
    if (!results.includes(true)) {
      return;
    }

    this.ruleRegistry().process(Moved, this.unit(), this as unknown as Action);

    this.unit().destroy();
  }
}

export default InciteRevolt;
