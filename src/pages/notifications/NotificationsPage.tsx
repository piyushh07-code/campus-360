import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const navigate = useNavigate();

  const handleAction = (id: string, url?: string) => {
    markNotificationRead(id);
    if (url) navigate(url);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-neutral">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-semibold">
              Live Campus Broadcasts
            </span>
            <span>•</span>
            <span className="font-label-sm text-[11px] text-primary font-semibold">
              {unreadCount} Unread
            </span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-semibold text-main-text">
            Notifications Center
          </h1>
          <p className="font-body-md text-sm text-secondary-text mt-0.5">
            Real-time advisories regarding academic deadlines, exam locations, and facilities leak triage dispatches.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-colors self-start sm:self-auto"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-border-neutral divide-y divide-border-neutral overflow-hidden">
        {notifications.map((item) => {
          const icon =
            item.type === 'academic'
              ? 'school'
              : item.type === 'sustainability'
              ? 'water_drop'
              : 'info';

          const iconColor =
            item.type === 'academic'
              ? 'text-primary bg-primary-fixed'
              : item.type === 'sustainability'
              ? 'text-[#138A72] bg-tertiary-fixed'
              : 'text-secondary bg-surface-container';

          return (
            <div
              key={item.id}
              onClick={() => handleAction(item.id, item.actionUrl)}
              className={`p-4 flex items-start gap-3.5 transition-colors cursor-pointer ${
                item.read
                  ? 'bg-white hover:bg-surface-container-low/40'
                  : 'bg-blue-50/40 hover:bg-blue-50/70 border-l-4 border-l-primary'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconColor}`}>
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h2
                    className={`font-label-lg text-sm truncate ${
                      item.read ? 'font-medium text-main-text' : 'font-bold text-main-text'
                    }`}
                  >
                    {item.title}
                  </h2>
                  <span className="text-[11px] text-outline shrink-0">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="font-body-sm text-xs text-secondary-text mt-1 leading-relaxed">
                  {item.message}
                </p>

                {item.actionUrl && (
                  <span className="text-[11px] font-semibold text-primary mt-2 inline-flex items-center gap-1">
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="text-center py-12 text-secondary-text">
            <span className="material-symbols-outlined text-[42px] text-outline mb-1">notifications_off</span>
            <p className="text-xs font-semibold">No notifications currently available.</p>
          </div>
        )}
      </div>
    </div>
  );
};
