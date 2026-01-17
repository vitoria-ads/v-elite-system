import { SavedProfile, SensitivityResult } from '../types';

const STORAGE_KEY = 'VELITE_PROFILES_V1';

export const saveProfile = (name: string, result: SensitivityResult): SavedProfile => {
  const profile: SavedProfile = {
    id: crypto.randomUUID(),
    name: name || `Config ${new Date().toLocaleDateString()}`,
    date: new Date().toLocaleDateString(),
    result
  };

  const existing = getProfiles();
  const updated = [profile, ...existing];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return profile;
};

export const getProfiles = (): SavedProfile[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const deleteProfile = (id: string): void => {
  const existing = getProfiles();
  const updated = existing.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
