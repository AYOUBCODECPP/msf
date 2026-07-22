export const formatDate = (d) => {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (d) => {
  if (!d) return '-';
  return new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return '-';
  const ms = Date.now() - new Date(birthDate).getTime();
  const days = Math.floor(ms / 86400000);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m ? `${y}y ${m}mo` : `${y}y`;
};

export const formatCurrency = (v) => {
  if (v === null || v === undefined) return '-';
  return new Intl.NumberFormat('fr-MA', { minimumFractionDigits: 2 }).format(v) + ' DH';
};

export const formatNumber = (n) => {
  if (n === null || n === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(n);
};
