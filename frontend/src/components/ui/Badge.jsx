const Badge = ({ count, className }) => {
    if (!count || count <= 0) return null;
    
    const displayCount = count > 9 ? '9+' : count;
    
    return (
      <div className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ${className}`}>
        {displayCount}
      </div>
    );
  };
  
  export default Badge;