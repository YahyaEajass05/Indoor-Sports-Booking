import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md',
  initials,
  status,
  className = '',
  onClick,
  animated = true,
  ...props 
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600 text-white font-bold';
  
  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-20 h-20 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
    '3xl': 'w-32 h-32 text-3xl'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  const statusSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6',
    '3xl': 'w-7 h-7'
  };

  const avatarClasses = `
    ${baseStyles}
    ${sizes[size]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const AvatarContent = () => {
    if (src) {
      return <img src={src} alt={alt} className="w-full h-full object-cover" />;
    }
    if (initials) {
      return <span>{initials}</span>;
    }
    return <FiUser className="w-1/2 h-1/2" />;
  };

  const avatar = (
    <div className={avatarClasses} onClick={onClick} {...props}>
      <AvatarContent />
      {status && (
        <span 
          className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} border-2 border-white rounded-full`}
        />
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={onClick ? { scale: 1.1, rotate: 5 } : {}}
        whileTap={onClick ? { scale: 0.95 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {avatar}
      </motion.div>
    );
  }

  return avatar;
};

export { Avatar };
export default Avatar;
