import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'vsa-onboarding-complete';

const initialValue = browser
  ? localStorage.getItem(STORAGE_KEY) === 'true'
  : false;

export const hasCompletedOnboarding = writable(initialValue);

export function completeOnboarding() {
  hasCompletedOnboarding.set(true);
  if (browser) {
    localStorage.setItem(STORAGE_KEY, 'true');
  }
}
