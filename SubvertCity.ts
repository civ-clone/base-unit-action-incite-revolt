import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import InciteRevolt from './InciteRevolt';
import Unit from '@civ-clone/core-unit/Unit';

/** Buying a city of a civilization the Diplomat's is at peace with, keeping the peace. What it costs is the ruleset's. */
export class SubvertCity extends InciteRevolt {
  // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
  forUnit(unit: Unit): Action {
    return new SubvertCity(
      this.from(),
      this.to(),
      unit,
      this._city,
      this._cost,
      this.ruleRegistry()
    ) as unknown as Action;
  }
}

export default SubvertCity;
