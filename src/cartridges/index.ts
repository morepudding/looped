import type { Cartridge, Profile, Scenario } from '../types';
import { leaCartridge } from './lea';
import { kineCartridge } from './kine';

export const CARTRIDGES: Cartridge[] = [
  leaCartridge,
  kineCartridge,
];

export const PROFILES: Profile[] = CARTRIDGES.map(c => c.profile);
export const SCENARIOS: Record<string, Scenario> = Object.fromEntries(
  CARTRIDGES.map(c => [c.scenario.id, c.scenario])
);

export function getCartridgeByProfileId(profileId: string): Cartridge | undefined {
  return CARTRIDGES.find(c => c.profile.id === profileId);
}
