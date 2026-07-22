export const KPISkeleton = () => (
  <div className="page-card p-5 space-y-3">
    <div className="flex items-start gap-3">
      <div className="skeleton w-10 h-10 rounded-xl" />
      <div className="space-y-2 flex-1">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-6 w-16" />
      </div>
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="page-card overflow-hidden">
    <div className="p-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="skeleton h-4 flex-1 rounded" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const CardSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="page-card p-5 space-y-3">
        <div className="skeleton h-10 w-10 rounded-xl" />
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-6 w-14" />
      </div>
    ))}
  </div>
);

export const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="page-card p-16 text-center">
    {Icon && <Icon size={48} className="mx-auto text-ink-muted/30 mb-3" />}
    <p className="font-display text-lg font-bold text-ink">{title}</p>
    {description && <p className="text-ink-soft text-sm mt-1">{description}</p>}
  </div>
);

export const ErrorState = ({ message, onRetry }) => (
  <div className="page-card p-12 text-center">
    <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-3">
      <span className="text-danger text-lg">!</span>
    </div>
    <p className="font-display font-bold text-ink mb-1">Something went wrong</p>
    <p className="text-ink-soft text-sm mb-4">{message || 'Failed to load data.'}</p>
    {onRetry && <button onClick={onRetry} className="btn-primary text-sm">Try Again</button>}
  </div>
);
