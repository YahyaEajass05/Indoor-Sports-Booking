import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

/**
 * ChartCard - Animated chart container with data visualization
 * Features:
 * - Animated bar charts
 * - Line charts with gradient fills
 * - Pie/Donut charts
 * - Area charts
 * - Trend indicators
 * - Custom tooltips
 */
const ChartCard = ({
  type = 'bar',
  title,
  data = [],
  color = 'from-blue-500 to-cyan-500',
  height = 200,
  showLegend = true,
  showGrid = true,
  animated = true,
  className = '',
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  const BarChart = () => (
    <div className="flex items-end justify-around h-full gap-2 px-4">
      {data.map((item, index) => {
        const heightPercentage = (item.value / maxValue) * 100;
        return (
          <div key={index} className="flex flex-col items-center flex-1 group">
            <motion.div
              className="relative w-full"
              initial={animated ? { height: 0 } : false}
              animate={{ height: `${heightPercentage}%` }}
              transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
            >
              <div
                className={`w-full h-full bg-gradient-to-t ${color} rounded-t-lg shadow-lg group-hover:shadow-xl transition-shadow relative overflow-hidden`}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
                />
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            </motion.div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 truncate w-full text-center">
              {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );

  const LineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 80;
      return { x, y, value: item.value, label: item.label };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L 100 100 L 0 100 Z`;

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid Lines */}
        {showGrid && (
          <g className="opacity-20">
            {[0, 25, 50, 75, 100].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="0.5" />
            ))}
          </g>
        )}

        {/* Area Fill */}
        <motion.path
          d={areaD}
          fill="url(#gradient)"
          initial={animated ? { opacity: 0 } : false}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.8 }}
        />

        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Data Points */}
        {points.map((point, index) => (
          <motion.g key={index}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="white"
              stroke="url(#gradient)"
              strokeWidth="2"
              initial={animated ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
              className="cursor-pointer"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </motion.circle>
          </motion.g>
        ))}

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  const DonutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    const radius = 40;
    const centerX = 50;
    const centerY = 50;
    const strokeWidth = 10;

    const segments = data.map((item, index) => {
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

      const colors = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-yellow-500 to-orange-500',
      ];

      return {
        path: pathData,
        color: colors[index % colors.length],
        percentage: percentage.toFixed(1),
        label: item.label,
        value: item.value,
      };
    });

    return (
      <div className="flex items-center justify-center h-full gap-8">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          {segments.map((segment, index) => (
            <motion.g key={index}>
              <motion.path
                d={segment.path}
                fill="none"
                stroke={`url(#donut-gradient-${index})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                initial={animated ? { pathLength: 0, opacity: 0 } : false}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <title>{`${segment.label}: ${segment.value} (${segment.percentage}%)`}</title>
              </motion.path>
              <defs>
                <linearGradient id={`donut-gradient-${index}`}>
                  <stop offset="0%" stopColor={segment.color.includes('blue') ? '#3b82f6' : segment.color.includes('purple') ? '#a855f7' : segment.color.includes('green') ? '#10b981' : segment.color.includes('orange') ? '#f97316' : '#eab308'} />
                  <stop offset="100%" stopColor={segment.color.includes('cyan') ? '#06b6d4' : segment.color.includes('pink') ? '#ec4899' : segment.color.includes('emerald') ? '#059669' : segment.color.includes('red') ? '#ef4444' : '#f97316'} />
                </linearGradient>
              </defs>
            </motion.g>
          ))}
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-900 dark:fill-gray-100">
            {total}
          </text>
        </svg>

        {showLegend && (
          <div className="space-y-2">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                initial={animated ? { opacity: 0, x: -10 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${segment.color}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {segment.label} ({segment.percentage}%)
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const AreaChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 70 - 10;
      return { x, y, value: item.value, label: item.label };
    });

    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${pathD} L 100 90 L 0 90 Z`;

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid */}
        {showGrid && (
          <g className="opacity-10 stroke-current text-gray-500">
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} strokeWidth="0.5" />
            ))}
          </g>
        )}

        {/* Area with Gradient */}
        <motion.path
          d={areaD}
          fill="url(#area-gradient)"
          initial={animated ? { opacity: 0, scaleY: 0 } : false}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: 'bottom' }}
        />

        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Points */}
        {points.map((point, index) => (
          <g key={index}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="white"
              stroke="url(#line-gradient)"
              strokeWidth="2"
              initial={animated ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </motion.circle>
          </g>
        ))}

        <defs>
          <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <BarChart />;
      case 'line':
        return <LineChart />;
      case 'donut':
        return <DonutChart />;
      case 'area':
        return <AreaChart />;
      default:
        return <BarChart />;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      {title && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        </div>
      )}

      {/* Chart */}
      <div className="p-6" style={{ height }}>
        {data.length > 0 ? (
          renderChart()
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
