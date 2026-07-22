import {
  LayoutDashboard, Heart, Stethoscope, Syringe, FileText, Weight,
  TrendingUp, DollarSign, Receipt, Users, CheckCircle, BarChart3, Settings,
  Baby, Skull, Banknote, ArrowRightLeft, Wheat,
} from 'lucide-react';

/**
 * Each item now carries a `labelKey` (dot-path into translations.nav)
 * in addition to the English `label` used as fallback.
 * The Sidebar reads `labelKey` via the language store's t() function.
 */
const NAVIGATION = {
  super_admin: [
    {
      id: 'dashboard',
      label: 'Main Dashboard',
      labelKey: 'nav.dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },

    {
      id: 'sheep',
      label: 'Sheep Management',
      labelKey: 'nav.sheepManagement',
      icon: Heart,
      section: 'sheep',
      children: [
        { id: 'sheep-overview',      label: 'Overview',               labelKey: 'nav.overview',       path: '/dashboard/sheep/overview' },
        { id: 'sheep-all',           label: 'All Sheep',              labelKey: 'nav.allSheep',       path: '/dashboard/sheep/all' },
        { id: 'sheep-males',         label: 'Males',                  labelKey: 'nav.males',          path: '/dashboard/sheep/males' },
        { id: 'sheep-females',       label: 'Females',                labelKey: 'nav.females',        path: '/dashboard/sheep/females' },
        { id: 'sheep-young',         label: 'Young (Lambs)',          labelKey: 'nav.youngLambs',     path: '/dashboard/sheep/young', icon: Baby },
        { id: 'sheep-pregnant',      label: 'Pregnant',               labelKey: 'nav.pregnant',       path: '/dashboard/sheep/pregnant' },
        { id: 'sheep-deaths',        label: 'Deaths (This Year)',     labelKey: 'nav.deaths',         path: '/dashboard/sheep/deaths',        icon: Skull },
        { id: 'sheep-sick',          label: 'Sick Animals & Diagnosis', labelKey: 'nav.sick',         path: '/dashboard/sheep/sick',          icon: Stethoscope },
        { id: 'sheep-vaccinations',  label: 'Vaccinations',           labelKey: 'nav.vaccinations',   path: '/dashboard/sheep/vaccinations',  icon: Syringe },
        { id: 'sheep-certificates',  label: 'Medical Certificates',   labelKey: 'nav.certificates',   path: '/dashboard/sheep/certificates',  icon: FileText },
        { id: 'sheep-weight',        label: 'Weight Tracking',        labelKey: 'nav.weightTracking', path: '/dashboard/sheep/weight',        icon: Weight },
      ],
    },

    {
      id: 'cattle',
      label: 'Cattle Management',
      labelKey: 'nav.cattleManagement',
      icon: Wheat,
      section: 'cattle',
      children: [
        { id: 'cattle-overview',     label: 'Overview',               labelKey: 'nav.overview',       path: '/dashboard/cattle/overview' },
        { id: 'cattle-all',          label: 'All Cattle',             labelKey: 'nav.allCattle',      path: '/dashboard/cattle/all' },
        { id: 'cattle-males',        label: 'Males',                  labelKey: 'nav.males',          path: '/dashboard/cattle/males' },
        { id: 'cattle-females',      label: 'Females',                labelKey: 'nav.females',        path: '/dashboard/cattle/females' },
        { id: 'cattle-calves',       label: 'Calves',                 labelKey: 'nav.calves',         path: '/dashboard/cattle/calves', icon: Baby },
        { id: 'cattle-pregnant',     label: 'Pregnant',               labelKey: 'nav.pregnant',       path: '/dashboard/cattle/pregnant' },
        { id: 'cattle-deaths',       label: 'Deaths (This Year)',     labelKey: 'nav.deaths',         path: '/dashboard/cattle/deaths',       icon: Skull },
        { id: 'cattle-sick',         label: 'Sick Animals & Diagnosis', labelKey: 'nav.sick',         path: '/dashboard/cattle/sick',         icon: Stethoscope },
        { id: 'cattle-vaccinations', label: 'Vaccinations',           labelKey: 'nav.vaccinations',   path: '/dashboard/cattle/vaccinations', icon: Syringe },
        { id: 'cattle-certificates', label: 'Medical Certificates',   labelKey: 'nav.certificates',   path: '/dashboard/cattle/certificates', icon: FileText },
        { id: 'cattle-weight',       label: 'Weight Tracking',        labelKey: 'nav.weightTracking', path: '/dashboard/cattle/weight',       icon: Weight },
      ],
    },

    {
      id: 'goat',
      label: 'Goat Management',
      labelKey: 'nav.goatManagement',
      icon: Heart,
      section: 'goat',
      children: [
        { id: 'goat-overview',       label: 'Overview',               labelKey: 'nav.overview',       path: '/dashboard/goat/overview' },
        { id: 'goat-all',            label: 'All Goats',              labelKey: 'nav.allGoats',       path: '/dashboard/goat/all' },
        { id: 'goat-males',          label: 'Males',                  labelKey: 'nav.males',          path: '/dashboard/goat/males' },
        { id: 'goat-females',        label: 'Females',                labelKey: 'nav.females',        path: '/dashboard/goat/females' },
        { id: 'goat-young',          label: 'Young (Kids)',           labelKey: 'nav.youngKids',      path: '/dashboard/goat/young', icon: Baby },
        { id: 'goat-pregnant',       label: 'Pregnant',               labelKey: 'nav.pregnant',       path: '/dashboard/goat/pregnant' },
        { id: 'goat-deaths',         label: 'Deaths (This Year)',     labelKey: 'nav.deaths',         path: '/dashboard/goat/deaths',         icon: Skull },
        { id: 'goat-sick',           label: 'Sick Animals & Diagnosis', labelKey: 'nav.sick',         path: '/dashboard/goat/sick',           icon: Stethoscope },
        { id: 'goat-vaccinations',   label: 'Vaccinations',           labelKey: 'nav.vaccinations',   path: '/dashboard/goat/vaccinations',   icon: Syringe },
        { id: 'goat-certificates',   label: 'Medical Certificates',   labelKey: 'nav.certificates',   path: '/dashboard/goat/certificates',   icon: FileText },
        { id: 'goat-weight',         label: 'Weight Tracking',        labelKey: 'nav.weightTracking', path: '/dashboard/goat/weight',         icon: Weight },
      ],
    },

    {
      id: 'financial',
      label: 'Financial Management',
      labelKey: 'nav.financialManagement',
      icon: DollarSign,
      children: [
        { id: 'fin-store-revenue',   label: 'Store Revenue',                   labelKey: 'nav.storeRevenue',   path: '/dashboard/financial/store-revenue', icon: TrendingUp },
        { id: 'fin-offline-sales',   label: 'Offline Sales',                   labelKey: 'nav.offlineSales',   path: '/dashboard/financial/offline-sales', icon: Banknote },
        { id: 'fin-bank',            label: 'Bank Transfers / Exports',        labelKey: 'nav.bankTransfers',  path: '/dashboard/financial/bank',          icon: ArrowRightLeft },
        { id: 'fin-expenses',        label: 'Expenses',                        labelKey: 'nav.expenses',       path: '/dashboard/financial/expenses',      icon: Receipt },
        { id: 'fin-report',          label: 'Full Financial Report (P&L)',     labelKey: 'nav.financialReport', path: '/dashboard/financial/report',       icon: BarChart3 },
      ],
    },

    { id: 'supervisors', label: 'Supervisor Management', labelKey: 'nav.supervisorManagement', icon: Users,        path: '/dashboard/supervisors' },
    { id: 'approvals',   label: 'Sale Listing Approvals', labelKey: 'nav.saleApprovals',       icon: CheckCircle,  path: '/dashboard/approvals' },
    { id: 'analytics',   label: 'Full Analytics',          labelKey: 'nav.analytics',           icon: BarChart3,    path: '/dashboard/analytics' },
    { id: 'settings',    label: 'Settings',                labelKey: 'nav.settings',            icon: Settings,     path: '/dashboard/settings' },
  ],

  sheep: [
    { id: 'sheep-overview',      label: 'Overview',           labelKey: 'nav.overview',       icon: LayoutDashboard, path: '/dashboard/sheep/overview' },
    { id: 'sheep-all',           label: 'All Sheep',          labelKey: 'nav.allSheep',       icon: Heart,           path: '/dashboard/sheep/all' },
    { id: 'sheep-males',         label: 'Males',              labelKey: 'nav.males',                                 path: '/dashboard/sheep/males' },
    { id: 'sheep-females',       label: 'Females',            labelKey: 'nav.females',                               path: '/dashboard/sheep/females' },
    { id: 'sheep-young',         label: 'Young (Lambs)',      labelKey: 'nav.youngLambs',     icon: Baby,            path: '/dashboard/sheep/young' },
    { id: 'sheep-pregnant',      label: 'Pregnant',           labelKey: 'nav.pregnant',                              path: '/dashboard/sheep/pregnant' },
    { id: 'sheep-deaths',        label: 'Deaths (This Year)', labelKey: 'nav.deaths',         icon: Skull,           path: '/dashboard/sheep/deaths' },
    { id: 'sheep-sick',          label: 'Sick Animals',       labelKey: 'nav.sick',           icon: Stethoscope,     path: '/dashboard/sheep/sick' },
    { id: 'sheep-vaccinations',  label: 'Vaccinations',       labelKey: 'nav.vaccinations',   icon: Syringe,         path: '/dashboard/sheep/vaccinations' },
    { id: 'sheep-certificates',  label: 'Medical Certs',      labelKey: 'nav.certificates',   icon: FileText,        path: '/dashboard/sheep/certificates' },
    { id: 'sheep-weight',        label: 'Weight Tracking',    labelKey: 'nav.weightTracking', icon: Weight,          path: '/dashboard/sheep/weight' },
  ],

  cattle: [
    { id: 'cattle-overview',     label: 'Overview',           labelKey: 'nav.overview',       icon: LayoutDashboard, path: '/dashboard/cattle/overview' },
    { id: 'cattle-all',          label: 'All Cattle',         labelKey: 'nav.allCattle',      icon: Wheat,           path: '/dashboard/cattle/all' },
    { id: 'cattle-males',        label: 'Males',              labelKey: 'nav.males',                                 path: '/dashboard/cattle/males' },
    { id: 'cattle-females',      label: 'Females',            labelKey: 'nav.females',                               path: '/dashboard/cattle/females' },
    { id: 'cattle-calves',       label: 'Calves',             labelKey: 'nav.calves',         icon: Baby,            path: '/dashboard/cattle/calves' },
    { id: 'cattle-pregnant',     label: 'Pregnant',           labelKey: 'nav.pregnant',                              path: '/dashboard/cattle/pregnant' },
    { id: 'cattle-deaths',       label: 'Deaths',             labelKey: 'nav.deaths',         icon: Skull,           path: '/dashboard/cattle/deaths' },
    { id: 'cattle-sick',         label: 'Sick Animals',       labelKey: 'nav.sick',           icon: Stethoscope,     path: '/dashboard/cattle/sick' },
    { id: 'cattle-vaccinations', label: 'Vaccinations',       labelKey: 'nav.vaccinations',   icon: Syringe,         path: '/dashboard/cattle/vaccinations' },
    { id: 'cattle-certificates', label: 'Medical Certs',      labelKey: 'nav.certificates',   icon: FileText,        path: '/dashboard/cattle/certificates' },
    { id: 'cattle-weight',       label: 'Weight Tracking',    labelKey: 'nav.weightTracking', icon: Weight,          path: '/dashboard/cattle/weight' },
  ],

  goat: [
    { id: 'goat-overview',       label: 'Overview',           labelKey: 'nav.overview',       icon: LayoutDashboard, path: '/dashboard/goat/overview' },
    { id: 'goat-all',            label: 'All Goats',          labelKey: 'nav.allGoats',       icon: Heart,           path: '/dashboard/goat/all' },
    { id: 'goat-males',          label: 'Males',              labelKey: 'nav.males',                                 path: '/dashboard/goat/males' },
    { id: 'goat-females',        label: 'Females',            labelKey: 'nav.females',                               path: '/dashboard/goat/females' },
    { id: 'goat-young',          label: 'Young (Kids)',       labelKey: 'nav.youngKids',      icon: Baby,            path: '/dashboard/goat/young' },
    { id: 'goat-pregnant',       label: 'Pregnant',           labelKey: 'nav.pregnant',                              path: '/dashboard/goat/pregnant' },
    { id: 'goat-deaths',         label: 'Deaths',             labelKey: 'nav.deaths',         icon: Skull,           path: '/dashboard/goat/deaths' },
    { id: 'goat-sick',           label: 'Sick Animals',       labelKey: 'nav.sick',           icon: Stethoscope,     path: '/dashboard/goat/sick' },
    { id: 'goat-vaccinations',   label: 'Vaccinations',       labelKey: 'nav.vaccinations',   icon: Syringe,         path: '/dashboard/goat/vaccinations' },
    { id: 'goat-certificates',   label: 'Medical Certs',      labelKey: 'nav.certificates',   icon: FileText,        path: '/dashboard/goat/certificates' },
    { id: 'goat-weight',         label: 'Weight Tracking',    labelKey: 'nav.weightTracking', icon: Weight,          path: '/dashboard/goat/weight' },
  ],
};

export default NAVIGATION;
