import React, {useState, createContext, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../stroages/logsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
  // variable, constant
  const initialLogsRef = useRef(null);

  const [logs, setLogs] = useState([]);

  // functions
  function onCreate({title, body, date}) {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  }

  function onRemove(id) {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  }

  function onModify(modified) {
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  }

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs);
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
