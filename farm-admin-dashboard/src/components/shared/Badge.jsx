const Badge = ({ children, variant = 'default', className = '' }) => {
  const map = {
    default: 'badge-default',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  };
  return <span className={`${map[variant] || 'badge-default'} ${className}`}>{children}</span>;
};

export default Badge;
