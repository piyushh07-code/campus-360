import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  badgeText?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'error';
  progress?: number;
  progressColor?: string;
  footerLeft?: string;
  footerRight?: string;
  footerHighlight?: string;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  badgeText,
  badgeType = 'secondary',
  progress,
  progressColor = 'bg-[#2F6FED]',
  footerLeft,
  footerRight,
  footerHighlight,
  icon,
  onClick,
  className = '',
}) => {
  const badgeStyles = {
    primary: 'bg-primary-fixed text-on-primary-fixed',
    secondary: 'bg-secondary-fixed text-on-secondary-fixed',
    tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-error-container text-on-error-container',
  }[badgeType];

  return (
    <div
      onClick={onClick}
      className={`bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-border-neutral/60 flex flex-col justify-between hover:shadow-md transition-all ${
        onClick ? 'cursor-pointer hover:border-primary/40' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-1.5">
          {icon && <span className="material-symbols-outlined text-[18px] text-secondary">{icon}</span>}
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">{label}</span>
        </div>
        {badgeText && (
          <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] font-semibold ${badgeStyles}`}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-space-xs my-space-xs">
        <span className="font-metric-val text-metric-val text-on-surface tracking-tight">{value}</span>
        {unit && <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">{unit}</span>}
      </div>

      {(progress !== undefined || footerLeft || footerRight) && (
        <div className="space-y-1.5 mt-space-sm pt-space-xs">
          {progress !== undefined && (
            <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          )}
          <div className="flex justify-between items-center font-label-sm text-label-sm text-outline">
            <span>{footerLeft}</span>
            {footerHighlight ? (
              <span className="text-[#138A72] font-semibold">{footerHighlight}</span>
            ) : (
              <span>{footerRight}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
