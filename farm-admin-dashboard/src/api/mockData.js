export const mockData = {
  overview: {
    live_counts: { cow: 45, sheep: 120, goat: 30, chicken: 500 },
    births_this_month: 12,
    deaths_total: 3,
    mortality_rate: 1.5,
    milk_this_month: 4500,
    approved_listings: 8,
    feed_cost_this_month: 12500,
    revenue: 45000,
    sold_listings: 15
  },
  sectionStats: {
    total: 120,
    males: 20,
    females: 100,
    age_groups: { '0-1y': 40, '1-3y': 60, '>3y': 20 },
    revenue: 15000,
    expenses: 5000
  },
  salesStats: {
    data: [
      { date: '2023-01', revenue: 1000 },
      { date: '2023-02', revenue: 1500 },
      { date: '2023-03', revenue: 2000 }
    ],
    total_revenue: 4500
  },
  animals: {
    data: [
      { id: 1, tag_number: 'COW-001', species: 'cow', gender: 'female', breed: 'Holstein', birth_date: '2020-05-15', status: 'healthy', weight: 450 },
      { id: 2, tag_number: 'COW-002', species: 'cow', gender: 'male', breed: 'Angus', birth_date: '2021-02-10', status: 'sick', weight: 520 },
      { id: 3, tag_number: 'SHP-001', species: 'sheep', gender: 'female', breed: 'Merino', birth_date: '2022-01-20', status: 'healthy', weight: 65 },
      { id: 4, tag_number: 'SHP-002', species: 'sheep', gender: 'male', breed: 'Dorper', birth_date: '2022-03-15', status: 'sold', weight: 80 }
    ],
    total: 4
  },
  user: {
    id: 1,
    name: 'Admin User',
    email: 'admin@farm.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  deathRecords: {
    data: [
      { id: 1, animal_id: 1, animal_tag: 'COW-009', date: '2023-10-01', cause: 'Illness', notes: 'Veterinarian confirmed.' }
    ],
    total: 1
  },
  feedRecords: {
    data: [
      { id: 1, date: '2023-10-15', feed_type: 'Hay', quantity: 500, cost: 250, notes: 'Winter stock' },
      { id: 2, date: '2023-10-20', feed_type: 'Grain', quantity: 200, cost: 300, notes: 'Premium grain' }
    ],
    total: 2
  },
  medications: {
    data: [
      { id: 1, animal_id: 2, animal_tag: 'COW-002', date: '2023-10-10', medication_name: 'Antibiotic X', dosage: '50ml', cost: 120, notes: 'Treatment for infection' }
    ],
    total: 1
  },
  milkRecords: {
    data: [
      { id: 1, date: '2023-10-25', quantity: 150, quality: 'High', notes: 'Morning milking' },
      { id: 2, date: '2023-10-25', quantity: 140, quality: 'Medium', notes: 'Evening milking' }
    ],
    total: 2
  },
  orders: {
    data: [
      { id: 1, customer_name: 'John Doe', total_amount: 1500, status: 'completed', date: '2023-10-05' },
      { id: 2, customer_name: 'Jane Smith', total_amount: 800, status: 'pending', date: '2023-10-26' }
    ],
    total: 2
  },
  pendingListings: [
    { id: 1, animal_id: 3, title: 'Premium Merino Sheep', price: 300, status: 'pending', created_at: '2023-10-20' },
    { id: 2, animal_id: 4, title: 'Strong Dorper Ram', price: 450, status: 'pending', created_at: '2023-10-22' }
  ],
  saleListings: {
    data: [
      { id: 1, animal_id: 3, title: 'Premium Merino Sheep', price: 300, status: 'pending', created_at: '2023-10-20' },
      { id: 2, animal_id: 4, title: 'Strong Dorper Ram', price: 450, status: 'approved', created_at: '2023-10-22' },
      { id: 3, animal_id: 5, title: 'Healthy Cow', price: 1200, status: 'sold', created_at: '2023-09-15' }
    ],
    total: 3
  },
  settings: {
    farm_name: 'My Awesome Farm',
    currency: 'MAD',
    language: 'ar',
    notifications_enabled: true
  },
  users: {
    data: [
      { id: 1, name: 'Admin User', email: 'admin@farm.com', role: 'admin' },
      { id: 2, name: 'Worker One', email: 'worker1@farm.com', role: 'worker' },
      { id: 3, name: 'Worker Two', email: 'worker2@farm.com', role: 'worker' }
    ],
    total: 3
  }
};
