import React, {useState, createContext} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
  // variable, constant
  const [logs, setLogs] = useState(
    Array.from({length: 10}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Log ${index}`,
      date: new Date().toISOString(),
    })),
  );

  function onRemove(id) {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  }

  function onModify(modified) {
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  }

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

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
