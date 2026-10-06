import Action from '@civ-clone/core-unit/Action';
import InciteRevolt from './InciteRevolt';
import Unit from '@civ-clone/core-unit/Unit';
/** Buying a city of a civilization the Diplomat's is at peace with, keeping the peace. What it costs is the ruleset's. */
export declare class SubvertCity extends InciteRevolt {
  forUnit(unit: Unit): Action;
}
export default SubvertCity;
