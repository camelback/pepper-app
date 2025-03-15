import { useState, useEffect, useRef } from "react";

export default function DebugConsole() {
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);

  // Function to add logs
  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // Auto-scroll to the latest log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  // Expose `window.debugLog` globally for testing
  useEffect(() => {
    window.debugLog = addLog;
    console.log("Debug Console initialized. Use `window.debugLog('Your message')` to log.");
  }, []);

  return (
    <div className="debug-console">
      <div className="debug-header">
        <span>Debug Console</span>
        <button onClick={() => setLogs([])}>Clear</button>
      </div>
      <div className="debug-content" ref={logRef}>
        {logs.length === 0 ? <p className="debug-placeholder">No logs yet...</p> : logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}
