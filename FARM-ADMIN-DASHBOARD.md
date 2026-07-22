# Farm Admin Dashboard — نظام تسيير المزرعة

> Dashboard web متكامل متصل بالباك اند (Laravel API) — كيغطي التسيير الكامل ديال الحيوانات (بقر، خراف، معز)، المشرفين، المبيعات، والإحصائيات.

---

## 0. الفهرس

| # | القسم | الوصف |
|---|-------|-------|
| 1 | [نظرة عامة](#1-نظرة-عامة) | الهيكل العام والـ Stack التقني |
| 2 | [البنية التقنية](#2-البنية-التقنية) | المجلدات، الاعتماديات، البنية |
| 3 | [صفحات الداشبورد](#3-صفحات-الداشبورد) | كل صفحة بالتفاصيل |
| 4 | [الاتصال بالباك اند](#4-الاتصال-بالباك-اند) | كل API endpoint + الأدوات |
| 5 | [نماذج البيانات](#5-نماذج-البيانات) | Models + العلاقات |
| 6 | [قاعدة البيانات](#6-قاعدة-البيانات) | الجداول + العلاقات |
| 7 | [المصادقة والصلاحيات](#7-المصادقة-والصلاحيات) | Auth + Roles + Middleware |
| 8 | [خطة التنفيذ](#8-خطة-الت�行ذ) | المراحل بالترتيب |
| 9 | [الأوامر المفيدة](#9-الأوامر-المفيدة) | تشغيل + تطوير + اختبار |

---

## 1. نظرة عامة

الداشبورد هو تطبيق **React + Tailwind CSS** مستقل في مجلد `farm-admin-dashboard/`، كيتصل بشكل مباشر مع نفس الباك اند (Laravel 8 API) ديال المتجر وتطبيق الهاتف.

**الأقسام المغطاة:** بقر (Cattle) — خراف (Sheep) — معز (Goat) — **ماعندناش دجاج**.

### الـ Stack التقني

| المكون | التقنية |
|--------|---------|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS |
| Animations | GSAP (transitions, count-up, stagger) |
| Charts | Recharts (LineChart, BarChart, PieChart) |
| Icons | Lucide React Icons |
| State | Zustand (auth + UI state) |
| HTTP Client | Axios (عبر `src/api/` layer) |
| Backend | Laravel 8 + PostgreSQL + Sanctum |
| Auth | Laravel Sanctum (Bearer Token) |

### الألوان — "Warm Earth" Palette

| الاستخدام | اللون |
|-----------|-------|
| Primary | `#8B5E3C` (بني دافئ) |
| Secondary | `#D4A574` (ذهبي فاتح) |
| Accent | `#4A7C59` (أخضر طبيعي) |
| Danger | `#C0392B` (أحمر تحذيري) |
| Warning | `#E67E22` (برتقالي) |
| Background | `#FAF6F1` (كريمي فاتح) |
| Card | `#FFFFFF` |
| Text Primary | `#2C1810` |
| Text Secondary | `#7A6B5D` |

---

## 2. البنية التقنية

### هيكل المجلدات

```
systeme-gestion/
├── FARM-ADMIN-DASHBOARD.md          # هاد الملف
├── farm-admin-dashboard/            # التطبيق ديالنا (React)
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js             # Axios instance + interceptor (Sanctum token)
│   │   │   ├── auth.js              # login, logout, me, forgotPassword
│   │   │   ├── animals.js           # CRUD + images, death, medication, milk
│   │   │   ├── feedRecords.js       # CRUD feed records
│   │   │   ├── medications.js       # CRUD medications
│   │   │   ├── milkRecords.js       # CRUD milk records
│   │   │   ├── deathRecords.js      # death records
│   │   │   ├── saleListings.js      # CRUD + approve + pending
│   │   │   ├── orders.js            # CRUD orders
│   │   │   ├── analytics.js         # overview, section, sales
│   │   │   ├── settings.js          # get/set settings
│   │   │   └── users.js             # supervisor management (admin only)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx      # الشريط الجانبي
│   │   │   │   ├── Topbar.jsx       # الشريط العلوي
│   │   │   │   └── AppShell.jsx     # الهيكل العام بعد الدخول
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.jsx    # صفحة تسجيل الدخول
│   │   │   ├── dashboard/
│   │   │   │   ├── OverviewPage.jsx # الداشبورد الرئيسي
│   │   │   │   ├── KPICard.jsx      # كرت مؤشر مع count-up
│   │   │   │   └── RecentActivity.jsx
│   │   │   ├── animals/
│   │   │   │   ├── AnimalListPage.jsx
│   │   │   │   ├── AnimalCard.jsx
│   │   │   │   ├── AnimalDetailPage.jsx
│   │   │   │   ├── AnimalForm.jsx        # إضافة/تعديل
│   │   │   │   ├── DeathRecordForm.jsx
│   │   │   │   ├── SaleListingForm.jsx
│   │   │   │   ├── MedicationForm.jsx
│   │   │   │   ├── MilkRecordForm.jsx
│   │   │   │   ├── FeedRecordForm.jsx
│   │   │   │   ├── PhotoGallery.jsx
│   │   │   │   └── PedigreeTree.jsx
│   │   │   ├── supervisors/
│   │   │   │   ├── SupervisorListPage.jsx
│   │   │   │   └── SupervisorForm.jsx
│   │   │   ├── approvals/
│   │   │   │   └── SaleApprovalsPage.jsx
│   │   │   ├── analytics/
│   │   │   │   └── AnalyticsPage.jsx
│   │   │   ├── settings/
│   │   │   │   └── SettingsPage.jsx
│   │   │   └── shared/
│   │   │       ├── Modal.jsx
│   │   │       ├── ConfirmDialog.jsx
│   │   │       ├── Badge.jsx
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── PhotoDropzone.jsx
│   │   │       └── SearchInput.jsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useAnimals.js
│   │   │   └── useAnalytics.js
│   │   ├── store/
│   │   │   ├── authStore.js         # Zustand — token, user, role
│   │   │   └── uiStore.js           # sidebar state, modals
│   │   ├── utils/
│   │   │   ├── formatters.js        # date, currency, age calculation
│   │   │   ├── validators.js        # form validation helpers
│   │   │   └── constants.js         # species, breeds, statuses enums
│   │   ├── App.jsx                  # Router + protected routes
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Tailwind imports
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
└── README.md
```

---

## 3. صفحات الداشبورد

### 3.1 صفحة تسجيل الدخول `/login`

**التخطيط:** شاشة مقسمة — نصفها صورة/أنيميشن ديال المزرعة، والنصف الثاني كرت تسجيل الدخول.

| العنصر | النوع | السلوك |
|--------|-------|--------|
| Email | Input | مطلوب + تحقق من الصيغة |
| Password | Input + عرض/إخفاء | مطلوب |
| زر Login | Primary Button | كيستدعي `POST /api/login` — نجاح → تخزين التوكن + تحويل حسب الدور |
| Forgot password? | Text Link | كيفتح فورم إدخال الإيميل → `POST /api/password/forgot` |
| Loading | Spinner داخل الزر | كيظهر وقت الانتظار |

**حالات الاستخدام:**
- `super_admin` ناجح → تحويل لـ `/dashboard`
- `cattle/sheep/goat` ناجح → تحويل لـ `/dashboard/cattle` أو `/sheep` أو `/goat`
- كلمة مرور خاطئة → "Email or password is incorrect."
- حساب معلّق → "This account has been suspended."

---

### 3.2 الهيكل العام (App Shell)

**مكونات ثابتة:**

- **Sidebar (شريط جانبي):** لوقو المزرعة + روابط تنقل (مختلفة حسب الدور):
  - `super_admin`: Dashboard, Cattle, Sheep, Goat, Supervisors, Sale Approvals, Analytics, Settings
  - مشرف قسم: Dashboard + قسمه فقط + النماذج الخاصة بالقسم

- **Topbar (شريط علوي):** اسم المستخدم + صورة + زر Logout + جرس الإشعارات

- **Content Area:** تتغير مع الصفحة مع انتقال GSAP سلس

---

### 3.3 الداشبورد الرئيسي `/dashboard` (super_admin فقط)

**المحتوى:**

1. **صفحة KPI Cards** (4 كروت مع count-up animation):
   - العدد الإجمالي للحيوانات الحية (مع donut chart: بقر/خراف/معز)
   - المواليد هذا الشهر
   - الوفيات هذا الشهر + مؤشر (يتحول للأحمر إذا فوق المتوسط)
   - الإعلانات المعلقة للموافقة (مع زر "Review Now")

2. **Line Chart:** المواليد مقابل الوفيات (Recharts LineChart)

3. **Bar Chart:** إنتاج الحليب الأسبوعي لكل قسم

4. **جدول "Recent Activity":** آخر 10 أفعال مسجلة (ولادة/وفاة/علاج) مع أيقونة ملونة

5. **بطاقة Alerts:** أدوية غير فعالة بشكل متكرر، معدل وفيات عالي

**الاتصال بالباك اند:**
```
GET /api/admin/analytics/overview
→ يرجع كل الإحصائيات في استدعاء واحد
```

---

### 3.4 صفحة القسم (Cattle/Sheep/Goat) — `/dashboard/cattle`

> **ملاحظة مهمة:** صفحة الخراف والمعز كتتبع نفس الهيكل بالضبط، غير كاتختلف في: أسماء الفصائل، الأسماء الفرعية، وأي حقل خاص بالقسم.

**أعلى الصفحة:**

| العنصر | الوظيفة |
|--------|---------|
| عنوان القسم + العدد الإجمالي | نص |
| تبويبات فرعية: All / Calves / Heifers / Dairy Cows / Bulls | فلترة سريعة |
| زر "+ Register New Birth" | يفتح الفورم (3.5) |
| حقل بحث (Tag ID) | فلترة لحظية |
| فلاتر إضافية | الحالة (alive/for sale/sold/deceased)، الجنس، الفصيلة |

**المحتوى:** شبكة كروت أو جدول (قابل للتبديل)، كل كرت فيه: صورة مصغرة، Tag ID، الجنس، العمر، الحالة (badge ملون)، زر "View Details".

**الاتصال:**
```
GET /api/animals?species=cattle&sub_category=&status=&search=
```

---

### 3.5 نموذج تسجيل مولود جديد `/dashboard/cattle/new`

| الحقل | النوع | ملاحظات |
|-------|-------|---------|
| Tag ID | Text (مقترح تلقائي، قابل للتعديل) | فريد |
| Sex | زر تبديل (Male/Female) | أنيق |
| Birth date | Date picker | |
| Sire (الأب) | بحث حي من الذكور الموجودة | اختياري |
| Dam (الأم) | بحث حي من الإناث الموجودة | اختياري |
| Breed | Dropdown (Holstein, local breed, Jersey...) | |
| Description | Textarea | |
| Photos | منطقة سحب وإفلات + كاميرا + معاينة | صور متعددة |
| Birth weight | Number (kg) | اختياري |
| Initial health status | Dropdown (Healthy / Needs monitoring) | |
| زر "Save" | Primary + loading state | `POST /api/animals` |
| زر "Cancel" | Secondary | يغلق الفورم |

**بعد الحفظ الناجح:** أنيميشن ✓ + إغلاق الفورم + إضافة الكارت للأعلى مع slide-in animation.

---

### 3.6 بروفايل الحيوان `/dashboard/cattle/{id}`

**التخطيط:** عمود يسار ل�عرض الصور (zoom on-hover + angle switcher)، عمود يمين للمعلومات، تبويبات تحت.

**التبويبات:**

| التبويب | المحتوى | الاتصال |
|---------|---------|---------|
| General Info | Tag ID + QR Code، الفصيلة، تاريخ الميلاد/العمر التلقائي، الأب/الأم (روابط)، الحالة | `GET /api/animals/{id}` |
| Veterinary Certificate | عرض/تحميل PDF أو صورة، زر "Upload" | `POST /api/animals/{id}/images` |
| Feed History | جدول تاريخي (نوع العلف، الكمية، التاريخ) | `GET /api/feed-records?animal_id={id}` |
| Medication History | جدول (الدواء، الجرعة، التاريخ، الفعالية) + زر "+ Add" | `GET /api/medications?animal_id={id}` |
| Milk Record | رسم بياني يومي + زر "+ Log Milk" (للإباكورات فقط) | `GET /api/milk-records?animal_id={id}` |
| Pedigree | شجرة بصرية (أب/أم + أبناء إن وجدوا) | جزء من `GET /api/animals/{id}` |

**أزرار ثابتة في البروفايل:**

| الزر | الوظيفة | الاتصال |
|------|---------|---------|
| "Edit Details" | يفتح الفورم (3.5) مع بيانات مملوءة مسبقاً | `PUT /api/animals/{id}` |
| "Update Photos" | منطقة رفع صور جديدة | `POST /api/animals/{id}/images` |
| "Record Death" | نموذج تسجيل الوفاة | `POST /api/animals/{id}/death` |
| "Mark For Sale" | نموذج وضع للبيع (فقط إذا alive) | `POST /api/animals/{id}/sale-listing` |

---

### 3.7 نموذج تسجيل الوفاة

| الحقل | النوع |
|-------|-------|
| Death date | Date picker |
| Probable cause | Dropdown (disease/accident/unknown/other) |
| Vet notes | Textarea |
| Documentation photo | اختياري |
| زر "Confirm Death Record" | أحمر + تأكيد إضافي "Are you sure?" |

**الاتصال:** `POST /api/animals/{id}/death`

**بعد التأكيد:** الحالة تتغير تلقائياً لـ "deceased" → البروفايل يتشال من القوائم الحية والمتجر.

---

### 3.8 نموذج وضع للبيع

| الحقل | النوع |
|-------|-------|
| Price | Number |
| Marketing description | Textarea |
| اختيار الصور للعرض | معرض من صور الحيوان الموجودة (checkbox) |
| زر "Submit For Approval" | `POST /api/animals/{id}/sale-listing` |

**بعد الإرسال:** badge "Pending Super Admin approval" يظهر على البروفايل.

---

### 3.9 إدارة المشرفين `/dashboard/supervisors` (super_admin فقط)

| العنصر | الوظيفة |
|--------|---------|
| جدول | الاسم، الإيميل، القسم المُعيّن، الحالة (active/suspended)، تاريخ الإنشاء |
| زر "+ Add New Supervisor" | فورم: اسم، إيميل، كلمة مرور مؤقتة، اختيار القسم |
| أزرار الصف | "Edit" (فورم مع بيانات مملوءة)، "Suspend/Activate" (toggle)، "Delete" (مع تأكيد) |

**الاتصال:**
```
GET  /api/admin/users
POST /api/admin/users
PUT  /api/admin/users/{id}
DELETE /api/admin/users/{id}
```

---

### 3.10 موافقة الإعلانات `/dashboard/sale-approvals` (super_admin فقط)

| العنصر | الوظيفة |
|--------|---------|
| كروت الإعلانات المعلقة | صورة الحيوان، Tag ID، القسم، السعر، اسم المشرف |
| زر "Approve" (أخضر) | `PUT /api/admin/sale-listings/{id}/approve` مع `status=approved` → يظهر في المتجر فوراً |
| زر "Red Reject" (أحمر) | حقل اختياري لسبب الرفض → `PUT /api/admin/sale-listings/{id}/approve` مع `status=rejected` |
| الأنيميشن | الكارت كيتنزل بعد القرار |

**الاتصال:**
```
GET /api/admin/sale-listings/pending
PUT /api/admin/sale-listings/{id}/approve
```

---

### 3.11 الإحصائيات `/dashboard/analytics` (super_admin فقط)

توسيع لأورفيوز Phase 2:

- **فلتر Date range** في الأعلى (week/month/year/custom)
- **مقارنة شاملة** بين الأقسام الثلاثة لكل مؤشر (مواليد، وفوات، إنتاج الحليب، تكلفة العلف)
- **جدول فعالية الأدوية** (حسب اسم الدواء + نسبة فعال/غير فعال) لتحديد المشاكل المتكررة
- **إحصائيات المبيعات:** عدد الإعلانات المعروضة/المباعة، الإيرادات (Revenue line chart)، أكثر الأقسام مبيعاً
- **زر "Export Report"** (PDF/Excel) لكل قسم أو تقرير كامل

**الاتصال:**
```
GET /api/admin/analytics/overview
GET /api/admin/analytics/section/{species}
GET /api/admin/analytics/sales
```

---

### 3.12 الإعدادات `/dashboard/settings` (super_admin فقط)

| الإعداد | الوصف | الاتصال |
|---------|-------|---------|
| اسم المزرعة | حقل نصي | `PUT /api/admin/settings` |
| لوقو المزرعة | رفع صورة | `PUT /api/admin/settings` |
| معلومات الاتصال | حقول نصية | `PUT /api/admin/settings` |
| روابط التواصل الاجتماعي | حقول نصية | `PUT /api/admin/settings` |
| إعدادات الإشعارات | toggle (mortality alerts, medication alerts) | `PUT /api/admin/settings` |

**الاتصال:**
```
GET  /api/admin/settings
GET  /api/admin/settings/{group}
PUT  /api/admin/settings
```

---

## 4. الاتصال بالباك اند

### 4.1 إعداد Axios

```javascript
// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor: إضافة Sanctum Token لكل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sanctum_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: معالجة أخطاء 401 (token منتهي)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sanctum_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4.2 خريطة API Endpoints كاملة

#### Auth (عامة — بدون مصادقة)

| Method | Endpoint | الوصف | Request Body |
|--------|----------|-------|-------------|
| POST | `/api/login` | تسجيل الدخول | `{ email, password }` |
| POST | `/api/register` | إنشاء حساب | `{ name, email, password, password_confirmation }` |
| POST | `/api/logout` | تسجيل الخروج | — (يحتاج token) |
| GET | `/api/me` | معلومات المستخدم الحالي | — (يحتاج token) |

#### Animals (أي موظف مصادق عليه)

| Method | Endpoint | الوصف | Request Body / Query |
|--------|----------|-------|---------------------|
| GET | `/api/animals` | قائمة الحيوانات | `?species=&status=&search=&sub_category=` |
| POST | `/api/animals` | تسجيل حيوان جديد | `{ tag_id, species, sex, birth_date, breed, ... }` |
| GET | `/api/animals/{id}` | تفاصيل حيوان | — |
| PUT | `/api/animals/{id}` | تعديل حيوان | `{ ... }` |
| DELETE | `/api/animals/{id}` | حذف حيوان | — |
| POST | `/api/animals/{id}/images` | رفع صور | `FormData (images[])` |
| POST | `/api/animals/{id}/death` | تسجيل وفاة | `{ death_date, cause, vet_notes }` |
| POST | `/api/animals/{id}/medications` | إضافة علاج | `{ drug_name, dosage, given_at, note, effectiveness }` |
| POST | `/api/animals/{id}/milk` | تسجيل إنتاج حليب | `{ liters, recorded_at, session }` |

#### Feed Records

| Method | Endpoint | الوصف | Request Body / Query |
|--------|----------|-------|---------------------|
| GET | `/api/feed-records` | قائمة سجلات العلف | `?section=&animal_id=` |
| POST | `/api/feed-records` | تسجيل علف جديد | `{ section, feed_type, quantity, unit, imported_at, supplier, cost }` |
| PUT | `/api/feed-records/{id}` | تعديل | `{ ... }` |
| DELETE | `/api/feed-records/{id}` | حذف | — |

#### Medications

| Method | Endpoint | الوصف | Request Body / Query |
|--------|----------|-------|---------------------|
| GET | `/api/medications` | قائمة الأدوية | `?animal_id=` |
| POST | `/api/medications` | تسجيل دواء | `{ animal_id, drug_name, dosage, given_at, note, effectiveness }` |
| PUT | `/api/medications/{id}` | تعديل | `{ ... }` |
| DELETE | `/api/medications/{id}` | حذف | — |

#### Milk Records

| Method | Endpoint | الوصف | Request Body / Query |
|--------|----------|-------|---------------------|
| GET | `/api/milk-records` | قائمة سجلات الحليب | `?animal_id=` |
| POST | `/api/milk-records` | تسجيل إنتاج | `{ animal_id, liters, recorded_at, session }` |
| PUT | `/api/milk-records/{id}` | تعديل | `{ ... }` |
| DELETE | `/api/milk-records/{id}` | حذف | — |

#### Death Records

| Method | Endpoint | الوصف | Request Body / Query |
|--------|----------|-------|---------------------|
| GET | `/api/death-records` | قائمة الوفيات | `?animal_id=` |
| POST | `/api/death-records` | تسجيل وفاة | `{ animal_id, death_date, cause, vet_notes }` |

#### Admin Only (super_admin)

| Method | Endpoint | الوصف | Request Body / Query |
|--------|----------|-------|---------------------|
| GET | `/api/admin/users` | قائمة المشرفين | — |
| POST | `/api/admin/users` | إضافة مشرف | `{ name, email, password, role }` |
| PUT | `/api/admin/users/{id}` | تعديل مشرف | `{ ... }` |
| DELETE | `/api/admin/users/{id}` | حذف مشرف | — |
| GET | `/api/admin/sale-listings/pending` | إعلانات معلقة | — |
| PUT | `/api/admin/sale-listings/{id}/approve` | موافقة/رفض | `{ status: 'approved'|'rejected', rejection_reason? }` |
| GET | `/api/admin/analytics/overview` | إحصائيات شاملة | — |
| GET | `/api/admin/analytics/section/{species}` | إحصائيات قسم | `?date_from=&date_to=` |
| GET | `/api/admin/analytics/sales` | إحصائيات مبيعات | `?date_from=&date_to=` |
| GET | `/api/admin/settings` | جميع الإعدادات | — |
| PUT | `/api/admin/settings` | تحديث الإعدادات | `{ settings: { key: value, ... } }` |

---

## 5. نماذج البيانات

### 5.1 User

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'cattle' | 'sheep' | 'goat' | 'chicken' | 'buyer';
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
}
```

### 5.2 Animal

```typescript
interface Animal {
  id: number;
  tag_id: string;              // فريد
  species: 'cattle' | 'sheep' | 'goat' | 'chicken';
  sex: 'male' | 'female';
  birth_date: string;          // YYYY-MM-DD
  sire_id: number | null;      // FK → animals.id (الأب)
  dam_id: number | null;       // FK → animals.id (الأم)
  breed: string;
  description: string;
  status: 'alive' | 'for_sale' | 'sold' | 'deceased';
  health_status: string;
  qr_code: string;
  created_by: number;          // FK → users.id
  created_at: string;
  updated_at: string;

  // Relations
  sire?: Animal;               // belongsTo
  dam?: Animal;                // belongsTo
  creator?: User;              // belongsTo
  images?: AnimalImage[];      // hasMany
  medications?: Medication[];  // hasMany
  milkRecords?: MilkRecord[];  // hasMany
  deathRecord?: DeathRecord;   // hasOne
  saleListing?: SaleListing;   // hasOne
}
```

### 5.3 AnimalImage

```typescript
interface AnimalImage {
  id: number;
  animal_id: number;
  image_url: string;
  angle: 'front' | 'side' | 'back';
  is_ai_generated: boolean;
  is_primary: boolean;
}
```

### 5.4 Medication

```typescript
interface Medication {
  id: number;
  animal_id: number;
  drug_name: string;
  image_url: string | null;
  dosage: string;
  given_at: string;           // datetime
  note: string;
  effectiveness: 'effective' | 'ineffective' | 'partial' | 'unknown';
}
```

### 5.5 MilkRecord

```typescript
interface MilkRecord {
  id: number;
  animal_id: number;
  liters: number;             // decimal(8,2)
  recorded_at: string;        // datetime
  session: 'morning' | 'evening';
}
```

### 5.6 FeedRecord

```typescript
interface FeedRecord {
  id: number;
  section: 'cattle' | 'sheep' | 'goat';
  feed_type: string;
  quantity: number;           // decimal(10,2)
  unit: 'kg' | 'liters' | 'bales';
  imported_at: string;        // datetime
  supplier: string;
  cost: number;               // decimal(10,2)
}
```

### 5.7 DeathRecord

```typescript
interface DeathRecord {
  id: number;
  animal_id: number;
  death_date: string;
  cause: string;
  vet_notes: string;
}
```

### 5.8 SaleListing

```typescript
interface SaleListing {
  id: number;
  animal_id: number;
  price: number;              // decimal(12,2)
  marketing_description: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  approved_by: number | null; // FK → users.id
  approved_at: string | null;
  created_at: string;

  // Relations
  animal?: Animal;
  approver?: User;
}
```

### 5.9 Order & OrderItem

```typescript
interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  customer_notes: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  stripe_session_id: string | null;
  total: number;              // decimal(12,2)
  items?: OrderItem[];
}

interface OrderItem {
  id: number;
  order_id: number;
  sale_listing_id: number;
  price_at_purchase: number;
  quantity: number;
}
```

### 5.10 Setting

```typescript
interface Setting {
  id: number;
  group: string;              // مثلاً: 'general', 'notifications', 'store'
  key: string;                // فريد
  value: string;
}
```

### 5.11 Species

```typescript
interface Species {
  id: number;
  name: string;               // 'cattle', 'sheep', 'goat', 'chicken'
  category: string;
  label: string;
  icon: string;
  color: string;
}
```

---

## 6. قاعدة البيانات

### 6.1 مخطط العلاقات (ER Diagram)

```
users ──────────────────────┐
  │ (created_by)            │ (approved_by)
  │                         │
  ▼                         ▼
animals ──────────────── sale_listings ──────── orders
  │ │ │                        │                  │
  │ │ │                        │                  ▼
  │ │ │                        │             order_items
  │ │ │
  │ │ └─────► animal_images    │
  │ │
  │ └─────► medications        │
  │
  ├─────► milk_records         │
  │
  └─────► death_records        │

feed_records (مستقل — حسب القسم)
settings (مستقل — group/key/value)
species (مرجعية — م seeds مسبقة)
password_resets (للباسوورد المنسية)
```

### 6.2 الجداول

| الجدول | الوصف | ملاحظات |
|--------|-------|---------|
| `users` | المستخدمون + المشرفون | role enum + is_suspended |
| `animals` | الحيوانات | Central table — FKs للأب/الأم |
| `animal_images` | صور الحيوانات | angle enum + is_primary |
| `medications` | سجلات العلاج | effectiveness enum |
| `milk_records` | سجلات الحليب | session enum (morning/evening) |
| `feed_records` | سجلات العلف | section enum (مستقل عن الحيوان) |
| `death_records` | سجلات الوفيات | 1:1 مع Animal |
| `sale_listings` | إعلانات البيع | status enum + approval workflow |
| `orders` | الطلبات | من المتجر العام |
| `order_items` | بنود الطلبات | many:1 مع orders + sale_listings |
| `settings` | إعدادات المزرعة | group/key/value pattern |
| `species` | أنواع الحيوانات | seeds: cattle, sheep, goat, chicken |

---

## 7. المصادقة والصلاحيات

### 7.1 تدفق المصادقة

```
1. المستخدم كيدخل Email + Password
2. POST /api/login → Laravel Sanctum كي﷼ token
3. التوكن كيتخزن في localStorage
4. كل طلب API كيتحمّل مع Bearer Token في Authorization header
5. عند 401 → redirect لصفحة login
```

### 7.2 الأدوار والصلاحيات

| الدور | الوصول |
|-------|--------|
| `super_admin` | كل شيء: Dashboard شامل + إدارة المشرفين + موافقة الإعلانات + الإحصائيات + الإعدادات |
| `cattle` | قسم البقر فقط: عرض/إضافة/تعديل حيوانات البقر + النماذج المرتبطة |
| `sheep` | قسم الخراف فقط |
| `goat` | قسم المعز فقط |
| `chicken` | قسم الدجاج (غير مفعّل حالياً) |
| `buyer` | المتجر العام فقط (لا وصول للداشبورد) |

### 7.3 Middleware

```
auth:    التحقق من وجود Sanctum token صالح
role:    التحقق من دور المستخدم
  → super_admin: وصول كامل
  → cattle/sheep/goat: وصول للقسم المعيّن فقط
```

### 7.4 بيانات تسجيل الدخول التجريبية

| الإيميل | الباسوورد | الدور |
|---------|----------|-------|
| `admin@ferme-neon.fr` | `admin123` | super_admin |
| `client.ayoub@gmail.com` | `client123` | buyer |

---

## 8. خطة التنفيذ

### المرحلة 1: الأساس — Layout + Login
- [ ] صفحة Login متصلة بـ `POST /api/login`
- [ ] تخزين التوكن في localStorage
- [ ] تحويل حسب الدور (super_admin → /dashboard، section → /dashboard/{section})
- [ ] App Shell: Sidebar ديناميكي + Topbar + Content Area
- [ ] حماية المسارات (Protected Routes)

### المرحلة 2: الداشبورد الرئيسي
- [ ] KPI Cards مع count-up animation
- [ ] Line Chart: مواليد vs وفوات
- [ ] Bar Chart: إنتاج الحليب الأسبوعي
- [ ] جدول Recent Activity
- [ ] بطاقة Alerts
- [ ] الاتصال بـ `GET /api/admin/analytics/overview`

### المرحلة 3: وحدة البقر (Cattle) — النموذج الكامل
- [ ] صفحة القسم مع فلاتر وتبويبات فرعية
- [ ] نموذج تسجيل مولود جديد (`POST /api/animals`)
- [ ] بروفايل الحيوان مع كل التبويبات
- [ ] نموذج تسجيل الوفاة (`POST /api/animals/{id}/death`)
- [ ] نموذج وضع للبيع (`POST /api/animals/{id}/sale-listing`)
- [ ] نموذج إضافة علاج (`POST /api/animals/{id}/medications`)
- [ ] نموذج تسجيل حليب (`POST /api/animals/{id}/milk`)
- [ ] نموذج تسجيل علف (`POST /api/feed-records`)

### المرحلة 4: وحدة الخراف (Sheep)
- [ ] نفس هيكل المرحلة 3 بالضبط
- [ ] أسماء فرعية: Lambs, Ewes, Rams

### المرحلة 5: وحدة المعز (Goat)
- [ ] نفس هيكل المرحلة 3 بالضبط
- [ ] أسماء فرعية: Kids, Does, Bucks

### المرحلة 6: إدارة المشرفين
- [ ] جدول المشرفين + إضافة/تعديل/حذف
- [ ] الاتصال بـ CRUD `/api/admin/users`

### المرحلة 7: موافقة الإعلانات
- [ ] عرض الإعلانات المعلقة
- [ ] موافقة/رفض مع تأكيد
- [ ] الاتصال بـ `PUT /api/admin/sale-listings/{id}/approve`

### المرحلة 8: الإحصائيات الشاملة
- [ ] فلتر التاريخ
- [ ] مقارنة الأقسام
- [ ] فعالية الأدوية
- [ ] إحصائيات المبيعات
- [ ] Export Report

### المرحلة 9: الإعدادات
- [ ] تعديل اسم المزرعة + اللوقو
- [ ] إعدادات الإشعارات
- [ ] الاتصال بـ `PUT /api/admin/settings`

---

## 9. الأوامر المفيدة

### تشغيل الباك اند

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
# → http://localhost:8000
```

### تشغيل الداشبورد

```bash
cd systeme-gestion/farm-admin-dashboard
npm install
npm run dev
# → http://localhost:5173
```

### تشغيل المتجر (للمرجع)

```bash
cd store-frontend
npm install
npm run dev
# → http://localhost:5173
```

### أوامر مفيدة

```bash
# مسح الكاش
php artisan cache:clear

# مسح route cache
php artisan route:clear

# إعادة تشغيل DB
php artisan migrate:fresh --seed

# عرض جميع الـ routes
php artisan route:list
```

---

## ملاحظات تقنية مهمة

1. **CORS**: تأكد من إعداد `config/cors.php` في الباك اند للسماح بـ `localhost:5173`
2. ** Sanctum SPA**: تأكد من إعداد `SANCTUM_STATEFUL_DOMAINS` في `.env` يشمل `localhost:5173`
3. **RoleMiddleware**: كيتحقق إذا كان `super_admin` (وصول كامل) أو إذا الدور في القائمة المسموحة
4. **Animal.tag_id**: لازم يكون فريد — الباك اند كيتحقق من ذلك
5. **FeedRecord.section**: مستقل عن الـ animal_id — كيتسجل على مستوى القسم ماشي الحيوان
6. **SaleListing workflow**: `pending` → `approved`/`rejected` → `sold` — فقط `super_admin` كيapprove
7. **QR Code**: الباك اند كيولّد QR code لكل حيوان جديد — الداشبورد كيعرضه في البروفايل
