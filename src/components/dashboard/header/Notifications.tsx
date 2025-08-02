/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiBell } from "react-icons/hi";

interface NotificationsProps {
  notificationsRef: any;
  isNotificationsOpen: any;
  setIsNotificationsOpen: any;
  unreadCount: any;
  notifications: any;
  markAsRead: any;
  navigate: any;
}

const Notifications = ({
  notificationsRef,
  isNotificationsOpen,
  setIsNotificationsOpen,
  unreadCount,
  notifications,
  markAsRead,
  navigate,
}: NotificationsProps) => {
  return (
    <div className="relative" ref={notificationsRef}>
      <button
        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        className="p-1 text-gray-500 hover:text-gray-700 relative rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isNotificationsOpen}
        aria-label={`Notificaciones, ${unreadCount} sin leer`}
        type="button"
      >
        <HiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        )}
      </button>

      {isNotificationsOpen && (
        <div
          className="absolute right-0 mt-2 sm:w-80 bg-white rounded-md shadow-lg py-1 z-50 max-h-80 overflow-y-auto ring-1 ring-black ring-opacity-5"
          style={{
            maxWidth: "90vw",
            maxHeight: "60vh",
            top: "calc(100% + 0.5rem)",
            right: 0,
            left: "auto",
          }}
        >
          <div className="px-4 py-2 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Notificaciones
            </h3>
          </div>

          {notifications.length === 0 ? (
            <p className="px-4 py-2 text-sm text-gray-500">
              No hay notificaciones
            </p>
          ) : (
            notifications.map((notification: any) => (
              <div
                key={notification.id}
                className={`px-4 py-2 text-sm ${
                  notification.read
                    ? "text-gray-600"
                    : "text-gray-900 bg-blue-50"
                }`}
              >
                <p>{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-indigo-600 mt-1 hover:underline"
                    type="button"
                  >
                    Marcar como leído
                  </button>
                )}
              </div>
            ))
          )}

          <div className="border-t px-4 py-2 text-center">
            <button
              onClick={() => {
                navigate("/notifications");
                setIsNotificationsOpen(false);
              }}
              className="text-indigo-600 text-sm hover:underline"
              type="button"
            >
              Ver todas las notificaciones
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
