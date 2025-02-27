export function PlayerUI({ className, children }) {
  return (
    <div className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
  }
  