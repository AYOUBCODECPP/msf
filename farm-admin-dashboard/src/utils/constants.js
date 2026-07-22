export const SPECIES = {
  cattle: { label: 'Cattle', icon: '🐄', color: '#C2703E' },
  sheep: { label: 'Sheep', icon: '🐑', color: '#6B7F3B' },
  goat: { label: 'Goat', icon: '🐐', color: '#D4A574' },
};

export const ANIMAL_STATUS = {
  alive: { label: 'Alive', badge: 'badge-success' },
  for_sale: { label: 'For Sale', badge: 'badge-warning' },
  sold: { label: 'Sold', badge: 'badge-default' },
  deceased: { label: 'Deceased', badge: 'badge-danger' },
};

export const SEX_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

export const EFFECTIVENESS = {
  effective: { label: 'Effective', badge: 'badge-success' },
  ineffective: { label: 'Ineffective', badge: 'badge-danger' },
  monitoring: { label: 'Monitoring', badge: 'badge-warning' },
};

export const SUB_CATEGORIES = {
  cattle: ['All', 'Calves', 'Heifers', 'Dairy Cows', 'Bulls'],
  sheep: ['All', 'Lambs', 'Ewes', 'Rams'],
  goat: ['All', 'Kids', 'Does', 'Bucks'],
};

export const GESTATION_DAYS = { sheep: 150, goat: 150, cattle: 283 };
