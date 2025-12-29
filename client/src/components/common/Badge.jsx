import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  icon: Icon,
  size = 'md',
  className = '',
  animated = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full';
  
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-purple-100 text-purple-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
    dark: 'bg-gray-800 text-white'
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-xs gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2'
  };

  const badgeClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  const content = (
    <>
      {Icon && <Icon className="flex-shrink-0" />}
      {children}
    </>
  );

  if (animated) {
    return (
      <motion.span
        className={badgeClasses}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        {...props}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <span className={badgeClasses} {...props}>
      {content}
    </span>
  );
};

export { Badge };
export default Badge;
