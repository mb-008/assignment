const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'md',
    disabled = false,
    className = '',
    ...props 
  }) => {
    const variantClasses = {
      primary: 'text-white bg-blue-600 hover:bg-blue-700',
      secondary: 'text-blue-600 bg-white hover:bg-blue-50 border border-blue-300',
      text: 'text-blue-600 hover:bg-blue-50',
    };
  
    const sizeClasses = {
      sm: 'text-xs px-2 py-1',
      md: 'text-sm px-3 py-1.5',
      lg: 'text-base px-4 py-2',
    };
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          rounded font-medium
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;