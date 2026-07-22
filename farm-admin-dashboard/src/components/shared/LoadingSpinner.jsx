const LoadingSpinner = ({ size = 'md' }) => {
  const s = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' }[size];
  return (
    <div className="flex items-center justify-center py-16">
      <div className={`${s} relative`}>
        <div className="absolute inset-0 rounded-full border-[3px] border-border" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary animate-spin" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
