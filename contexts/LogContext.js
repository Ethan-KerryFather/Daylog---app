import {Children, createContext} from 'react';
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const [logs, setLogs] = useState(
    Array.from({length: 10}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Log ${index}`,
      date: new Date().toISOString(),
    })),
  );
  // logs는 이 컴포넌트에서 관리하는 state 값이다.
  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
    // 이렇게 하면 새로운 log객체가 맨 앞에 추가된다.
    // 반대로  [...logs, log] 하면 뒤에 추가된다.
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;
