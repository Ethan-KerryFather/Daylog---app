import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet, View, Text} from 'react-native';

function CalendarView({markedDates, selectedDate, onSelectDate}) {
  const markedDateds = {
    '2023-02-01': {
      selected: false,
    },
    '2023-02-02': {
      marked: true,
    },
  };

  const markedSelectedDate = {
    ...markedDateds,
    [selectedDate]: {
      selected: true,
      marked: markedDateds[selectedDate]?.marked,
    },
  };

  return (
    <Calendar
      style={StyleSheet.calendar}
      markedDates={markedSelectedDate}
      theme={{
        arrowColor: '#009588',
        dotColor: '#009588',
        todayTextColor: 'red',
        selectedDayBackgroundColor: 'blue',
      }}
      onDayPress={day => {
        onSelectDate(day.dateString);
      }}
    />
  );
}

export default CalendarView;

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
