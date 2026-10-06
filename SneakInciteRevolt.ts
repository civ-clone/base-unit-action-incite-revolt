import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import City from '@civ-clone/core-city/City';
import InciteRevolt from './InciteRevolt';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

/** Inciting a revolt in a city of a civilization the Diplomat's is at peace with, which ends the peace. */
export class SneakInciteRevolt extends InciteRevolt {
  private _enemy: Player;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    city: City,
    cost: number,
    enemy: Player,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, city, cost, ruleRegistry);

    this._enemy = enemy;

    this.addKey('enemy');
  }

  enemy(): Player {
    return this._enemy;
  }

  // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
  forUnit(unit: Unit): Action {
    return new SneakInciteRevolt(
      this.from(),
      this.to(),
      unit,
      this._city,
      this._cost,
      this._enemy,
      this.ruleRegistry()
    ) as unknown as Action;
  }
}

export default SneakInciteRevolt;
