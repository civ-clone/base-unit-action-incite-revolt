import City from '@civ-clone/core-city/City';
import type InciteRevolt from '../InciteRevolt';
import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';
/**
 * Processed when a Diplomat (`Unit`) incites `City` to revolt, by the `InciteRevolt` action (or `SubvertCity`, which
 * extends it). `true` when the city changed hands, which uses the Diplomat up.
 */
export declare class RevoltIncited extends Rule<
  [Unit, City, InciteRevolt],
  boolean
> {}
export default RevoltIncited;
