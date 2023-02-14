import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import format from 'date-fns/format';
import CalendarView from '../../components/CalendarView';
import LogContext from '../../contexts/LogContext';
import FeedList from '../../components/FeedList';

function CalendarScreen() {
  const {logs} = useContext(LogContext);

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );

  const markedDates = useMemo(
    () =>
      logs.reduce((acc, current) => {
        const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
        acc[formattedDate] = {marked: true};
        return acc;
      }, {}),
    [logs],
  );

  const filteredLogs = logs.filter(
    log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate,
  );

  return (
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      }
      style={styles.container}
    />
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
});
