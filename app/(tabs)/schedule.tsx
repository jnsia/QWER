import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface task {
  time: string
  task: string
}

interface schedule {
  [date: string] : task[]
}

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

const getDatesForWeek = (currentDate: Date) => {
  let week = [];
  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.setDate(firstDayOfWeek + i));
    week.push({
      day: daysOfWeek[i],
      date: date.getDate(),
      fullDate: date.toISOString().split('T')[0],
    });
  }
  return week;
};

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export default function schedule() {
  const [currentDate] = useState(new Date());
  const [schedule, setSchedule] = useState<schedule>({
    '2024-10-21': [{ time: '10:00', task: '회의' }],
    '2024-10-22': [{ time: '11:00', task: '회의' }],
    '2024-10-23': [{ time: '24:00', task: '회의' }],
  });

  const weekDates = getDatesForWeek(new Date(currentDate));

  const renderTasksForHour = (date: string, hour: string) => {
    const tasks = schedule[date]?.filter((task) => task.time === hour) || [];
    return tasks.map((task, index) => (
      <Text key={index} style={styles.taskText}>
        {task.task}
      </Text>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {/* 요일 헤더 */}
      <View style={styles.header}>
        <View style={styles.timeColumn} />
        {weekDates.map((day, index) => (
          <View style={styles.dayColumn} key={index}>
            <Text style={styles.dayText}>{day.day}</Text>
            <Text style={styles.dateText}>{day.date}</Text>
          </View>
        ))}
      </View>

      {/* 시간별 그리드 */}
      {hours.map((hour, index) => (
        <View style={styles.row} key={index}>
          {/* 시간 열 */}
          <View style={styles.timeColumn}>
            <Text style={styles.hourText}>{hour}</Text>
          </View>

          {/* 요일별 시간대 일정 */}
          {weekDates.map((day, dayIndex) => (
            <View style={styles.dayColumn} key={dayIndex}>
              {renderTasksForHour(day.fullDate, hour)}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', height: 40 },
  timeColumn: { width: 60, alignItems: 'center', justifyContent: 'center' },
  hourText: { fontSize: 16, color: '#333' },
  dayColumn: { flex: 1, borderWidth: 0.5, borderColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  dayText: { fontSize: 16, fontWeight: 'bold' },
  dateText: { fontSize: 14, color: '#666' },
  taskText: { color: 'blue', fontSize: 12 },
});