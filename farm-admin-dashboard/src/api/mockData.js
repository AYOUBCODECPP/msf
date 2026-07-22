export const mockData = {
  overview: {
    live_counts: { cow: 145, sheep: 320, goat: 85, chicken: 1200 },
    births_this_month: 34,
    deaths_total: 7,
    mortality_rate: 0.4,
    milk_this_month: 12450,
    approved_listings: 24,
    feed_cost_this_month: 45000,
    revenue: 185000,
    sold_listings: 42
  },
  sectionStats: {
    total: 320,
    males: 80,
    females: 240,
    age_groups: { '0-1y': 80, '1-3y': 150, '>3y': 90 },
    revenue: 45000,
    expenses: 12000
  },
  salesStats: {
    data: [
      { date: '2023-01', revenue: 12000 },
      { date: '2023-02', revenue: 15500 },
      { date: '2023-03', revenue: 18000 },
      { date: '2023-04', revenue: 22000 },
      { date: '2023-05', revenue: 21000 },
      { date: '2023-06', revenue: 25000 },
      { date: '2023-07', revenue: 30000 },
    ],
    total_revenue: 143500
  },
  animals: {
    data: [
      { id: 1, tag_number: 'COW-001', species: 'cow', gender: 'female', breed: 'Holstein', birth_date: '2020-05-15', status: 'healthy', weight: 650 },
      { id: 2, tag_number: 'COW-002', species: 'cow', gender: 'male', breed: 'Angus', birth_date: '2021-02-10', status: 'sick', weight: 820 },
      { id: 3, tag_number: 'SHP-001', species: 'sheep', gender: 'female', breed: 'Merino', birth_date: '2022-01-20', status: 'healthy', weight: 65 },
      { id: 4, tag_number: 'SHP-002', species: 'sheep', gender: 'male', breed: 'Dorper', birth_date: '2022-03-15', status: 'sold', weight: 80 },
      { id: 5, tag_number: 'COW-003', species: 'cow', gender: 'female', breed: 'Charolais', birth_date: '2019-11-22', status: 'healthy', weight: 710 },
      { id: 6, tag_number: 'GOA-001', species: 'goat', gender: 'female', breed: 'Alpine', birth_date: '2023-01-10', status: 'healthy', weight: 45 },
      { id: 7, tag_number: 'GOA-002', species: 'goat', gender: 'male', breed: 'Saanen', birth_date: '2022-08-05', status: 'healthy', weight: 55 },
      { id: 8, tag_number: 'SHP-003', species: 'sheep', gender: 'female', breed: 'Lacaune', birth_date: '2021-06-18', status: 'pregnant', weight: 70 },
      { id: 9, tag_number: 'COW-004', species: 'cow', gender: 'female', breed: 'Holstein', birth_date: '2022-04-12', status: 'healthy', weight: 580 },
      { id: 10, tag_number: 'COW-005', species: 'cow', gender: 'male', breed: 'Limousin', birth_date: '2021-09-30', status: 'healthy', weight: 900 },
      { id: 11, tag_number: 'SHP-004', species: 'sheep', gender: 'male', breed: 'Merino', birth_date: '2023-02-14', status: 'healthy', weight: 75 },
      { id: 12, tag_number: 'GOA-003', species: 'goat', gender: 'female', breed: 'Alpine', birth_date: '2020-12-01', status: 'sick', weight: 42 },
      { id: 13, tag_number: 'COW-006', species: 'cow', gender: 'female', breed: 'Jersey', birth_date: '2018-07-25', status: 'healthy', weight: 480 },
      { id: 14, tag_number: 'SHP-005', species: 'sheep', gender: 'female', breed: 'Dorper', birth_date: '2022-11-11', status: 'healthy', weight: 68 },
      { id: 15, tag_number: 'GOA-004', species: 'goat', gender: 'male', breed: 'Boer', birth_date: '2021-05-20', status: 'healthy', weight: 85 }
    ],
    total: 15
  },
  user: {
    id: 1,
    name: 'Admin Principal',
    email: 'admin@farm.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  deathRecords: {
    data: [
      { id: 1, animal_id: 1, animal_tag: 'COW-009', date: '2023-10-01', cause: 'Illness', notes: 'Veterinarian confirmed severe pneumonia.' },
      { id: 2, animal_id: 5, animal_tag: 'SHP-012', date: '2023-09-15', cause: 'Predator', notes: 'Found near the south fence.' },
      { id: 3, animal_id: 8, animal_tag: 'GOA-005', date: '2023-08-22', cause: 'Old Age', notes: 'Natural causes.' },
      { id: 4, animal_id: 12, animal_tag: 'COW-015', date: '2023-07-10', cause: 'Accident', notes: 'Fell in the ditch.' }
    ],
    total: 4
  },
  feedRecords: {
    data: [
      { id: 1, date: '2023-10-15', feed_type: 'Alfalfa Hay', quantity: 5000, cost: 2500, notes: 'Winter stock delivery' },
      { id: 2, date: '2023-10-20', feed_type: 'Corn Grain', quantity: 2000, cost: 3000, notes: 'Premium grain for fattening' },
      { id: 3, date: '2023-10-22', feed_type: 'Soybean Meal', quantity: 1500, cost: 1800, notes: 'Protein supplement' },
      { id: 4, date: '2023-10-25', feed_type: 'Silage', quantity: 8000, cost: 1200, notes: 'Locally sourced' },
      { id: 5, date: '2023-10-28', feed_type: 'Mineral Block', quantity: 50, cost: 450, notes: 'Distributed to all pastures' }
    ],
    total: 5
  },
  medications: {
    data: [
      { id: 1, animal_id: 2, animal_tag: 'COW-002', date: '2023-10-10', medication_name: 'Penicillin', dosage: '50ml', cost: 120, notes: 'Treatment for infection' },
      { id: 2, animal_id: 6, animal_tag: 'GOA-001', date: '2023-10-12', medication_name: 'Ivermectin', dosage: '10ml', cost: 45, notes: 'Deworming routine' },
      { id: 3, animal_id: 12, animal_tag: 'GOA-003', date: '2023-10-15', medication_name: 'Anti-inflammatory', dosage: '15ml', cost: 60, notes: 'Joint pain relief' },
      { id: 4, animal_id: 3, animal_tag: 'SHP-001', date: '2023-10-18', medication_name: 'Vitamin B12', dosage: '5ml', cost: 25, notes: 'Energy boost post-birth' }
    ],
    total: 4
  },
  milkRecords: {
    data: [
      { id: 1, date: '2023-10-25', quantity: 1500, quality: 'High', notes: 'Morning milking - Group A' },
      { id: 2, date: '2023-10-25', quantity: 1420, quality: 'Medium', notes: 'Evening milking - Group A' },
      { id: 3, date: '2023-10-26', quantity: 1550, quality: 'High', notes: 'Morning milking - Group A' },
      { id: 4, date: '2023-10-26', quantity: 1480, quality: 'High', notes: 'Evening milking - Group A' },
      { id: 5, date: '2023-10-27', quantity: 1600, quality: 'High', notes: 'Morning milking - Group A' },
      { id: 6, date: '2023-10-27', quantity: 1510, quality: 'Medium', notes: 'Evening milking - Group A' }
    ],
    total: 6
  },
  orders: {
    data: [
      { id: 1, customer_name: 'Ahmed Restaurant', total_amount: 15000, status: 'completed', date: '2023-10-05' },
      { id: 2, customer_name: 'Boucherie Hassan', total_amount: 8500, status: 'pending', date: '2023-10-26' },
      { id: 3, customer_name: 'Supermarché Marjane', total_amount: 45000, status: 'completed', date: '2023-10-12' },
      { id: 4, customer_name: 'Client Particulier', total_amount: 3200, status: 'cancelled', date: '2023-10-15' },
      { id: 5, customer_name: 'Laiterie Centrale', total_amount: 28000, status: 'completed', date: '2023-10-20' },
      { id: 6, customer_name: 'Hôtel Atlas', total_amount: 12000, status: 'pending', date: '2023-10-27' }
    ],
    total: 6
  },
  pendingListings: [
    { id: 1, animal_id: 3, title: 'Premium Merino Sheep - Male', price: 3000, status: 'pending', created_at: '2023-10-20' },
    { id: 2, animal_id: 4, title: 'Strong Dorper Ram', price: 4500, status: 'pending', created_at: '2023-10-22' },
    { id: 3, animal_id: 7, title: 'Saanen Goat for Breeding', price: 2500, status: 'pending', created_at: '2023-10-25' },
    { id: 4, animal_id: 10, title: 'Limousin Bull', price: 18000, status: 'pending', created_at: '2023-10-26' }
  ],
  saleListings: {
    data: [
      { id: 1, animal_id: 3, title: 'Premium Merino Sheep', price: 3000, status: 'pending', created_at: '2023-10-20' },
      { id: 2, animal_id: 4, title: 'Strong Dorper Ram', price: 4500, status: 'approved', created_at: '2023-10-22' },
      { id: 3, animal_id: 5, title: 'Healthy Charolais Cow', price: 12000, status: 'sold', created_at: '2023-09-15' },
      { id: 4, animal_id: 6, title: 'Alpine Goat Milk Producer', price: 2200, status: 'approved', created_at: '2023-10-10' },
      { id: 5, animal_id: 11, title: 'Young Merino Ram', price: 2800, status: 'sold', created_at: '2023-10-01' },
      { id: 6, animal_id: 15, title: 'Boer Goat Male', price: 3500, status: 'approved', created_at: '2023-10-18' }
    ],
    total: 6
  },
  settings: {
    farm_name: 'Ferme Agricole Moderne',
    currency: 'MAD',
    language: 'ar',
    notifications_enabled: true
  },
  users: {
    data: [
      { id: 1, name: 'Admin Principal', email: 'admin@farm.com', role: 'admin' },
      { id: 2, name: 'Mohamed Responsable', email: 'mohamed@farm.com', role: 'supervisor' },
      { id: 3, name: 'Youssef Ouvrier', email: 'youssef@farm.com', role: 'worker' },
      { id: 4, name: 'Dr. Fatima', email: 'fatima@farm.com', role: 'veterinarian' },
      { id: 5, name: 'Karim Vendeur', email: 'karim@farm.com', role: 'sales' }
    ],
    total: 5
  }
};
