export const TRAINING_GOALS = [
  { value: 'muscle-building', label: 'Muscle building' },
  { value: 'weight-loss', label: 'Weight loss' },
  { value: 'general-fitness', label: 'General fitness' },
  { value: 'strength-training', label: 'Strength training' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

/** Preset trial slots. Edit to match VANTA's real opening hours. */
export const TIME_SLOTS = [
  { value: '06:00', label: '6:00 AM' },
  { value: '07:00', label: '7:00 AM' },
  { value: '08:00', label: '8:00 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '20:00', label: '8:00 PM' },
] as const;