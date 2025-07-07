import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Plus, Clock, MapPin, X, Check } from 'lucide-react-native';

interface ScheduledWorkout {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  location?: string;
  instructor?: string;
  completed: boolean;
}

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    time: '',
    duration: '',
    type: '',
    location: '',
    instructor: '',
  });

  const [scheduledWorkouts, setScheduledWorkouts] = useState<ScheduledWorkout[]>([
    {
      id: '1',
      title: 'Morning HIIT',
      date: '2024-01-15',
      time: '07:00',
      duration: '30 min',
      type: 'HIIT',
      location: 'Home Gym',
      instructor: 'Sarah Johnson',
      completed: true,
    },
    {
      id: '2',
      title: 'Yoga Flow',
      date: '2024-01-15',
      time: '18:00',
      duration: '45 min',
      type: 'Yoga',
      location: 'Living Room',
      instructor: 'Emma Wilson',
      completed: false,
    },
    {
      id: '3',
      title: 'Strength Training',
      date: '2024-01-16',
      time: '09:00',
      duration: '60 min',
      type: 'Strength',
      location: 'Home Gym',
      instructor: 'Mike Chen',
      completed: false,
    },
    {
      id: '4',
      title: 'Cardio Dance',
      date: '2024-01-16',
      time: '19:30',
      duration: '40 min',
      type: 'Cardio',
      location: 'Living Room',
      instructor: 'Lisa Rodriguez',
      completed: false,
    },
  ]);

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getWorkoutsForDate = (date: string) => {
    return scheduledWorkouts.filter(workout => workout.date === date);
  };

  const toggleWorkoutCompletion = (workoutId: string) => {
    setScheduledWorkouts(prev =>
      prev.map(workout =>
        workout.id === workoutId
          ? { ...workout, completed: !workout.completed }
          : workout
      )
    );
  };

  const addWorkout = () => {
    if (!newWorkout.title || !newWorkout.time || !newWorkout.duration || !newWorkout.type) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const workout: ScheduledWorkout = {
      id: Date.now().toString(),
      title: newWorkout.title,
      date: selectedDate,
      time: newWorkout.time,
      duration: newWorkout.duration,
      type: newWorkout.type,
      location: newWorkout.location || undefined,
      instructor: newWorkout.instructor || undefined,
      completed: false,
    };

    setScheduledWorkouts(prev => [...prev, workout]);
    setNewWorkout({
      title: '',
      time: '',
      duration: '',
      type: '',
      location: '',
      instructor: '',
    });
    setShowAddModal(false);
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hiit': return '#ef4444';
      case 'strength': return '#10b981';
      case 'yoga': return '#8b5cf6';
      case 'cardio': return '#f59e0b';
      default: return '#6366f1';
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const selectedWorkouts = getWorkoutsForDate(selectedDate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Week Calendar */}
      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
          {weekDates.map((date, index) => {
            const dateString = formatDate(date);
            const workoutsCount = getWorkoutsForDate(dateString).length;
            const isSelected = dateString === selectedDate;
            const isTodayDate = isToday(date);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayButton,
                  isSelected && styles.dayButtonSelected,
                  isTodayDate && !isSelected && styles.dayButtonToday,
                ]}
                onPress={() => setSelectedDate(dateString)}
              >
                <Text style={[
                  styles.dayName,
                  isSelected && styles.dayNameSelected,
                  isTodayDate && !isSelected && styles.dayNameToday,
                ]}>
                  {dayNames[index]}
                </Text>
                <Text style={[
                  styles.dayNumber,
                  isSelected && styles.dayNumberSelected,
                  isTodayDate && !isSelected && styles.dayNumberToday,
                ]}>
                  {date.getDate()}
                </Text>
                {workoutsCount > 0 && (
                  <View style={[
                    styles.workoutIndicator,
                    isSelected && styles.workoutIndicatorSelected,
                  ]}>
                    <Text style={styles.workoutCount}>{workoutsCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Workouts List */}
      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        <Text style={styles.dateTitle}>
          {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        {selectedWorkouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#6b7280" />
            <Text style={styles.emptyTitle}>No workouts scheduled</Text>
            <Text style={styles.emptyDescription}>
              Tap the + button to add a workout to your schedule
            </Text>
          </View>
        ) : (
          <View style={styles.workoutsContainer}>
            {selectedWorkouts.map((workout) => (
              <View key={workout.id} style={[styles.workoutCard, workout.completed && styles.workoutCardCompleted]}>
                <View style={styles.workoutHeader}>
                  <View style={[styles.typeIndicator, { backgroundColor: getTypeColor(workout.type) }]} />
                  <View style={styles.workoutInfo}>
                    <Text style={[styles.workoutTitle, workout.completed && styles.workoutTitleCompleted]}>
                      {workout.title}
                    </Text>
                    <Text style={styles.workoutType}>{workout.type}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.completionButton, workout.completed && styles.completionButtonCompleted]}
                    onPress={() => toggleWorkoutCompletion(workout.id)}
                  >
                    {workout.completed && <Check size={16} color="#ffffff" />}
                  </TouchableOpacity>
                </View>

                <View style={styles.workoutDetails}>
                  <View style={styles.detailItem}>
                    <Clock size={16} color="#9ca3af" />
                    <Text style={styles.detailText}>{workout.time} • {workout.duration}</Text>
                  </View>
                  {workout.location && (
                    <View style={styles.detailItem}>
                      <MapPin size={16} color="#9ca3af" />
                      <Text style={styles.detailText}>{workout.location}</Text>
                    </View>
                  )}
                  {workout.instructor && (
                    <Text style={styles.instructorText}>with {workout.instructor}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Workout Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Workout</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Workout Title *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Morning HIIT"
                  placeholderTextColor="#6b7280"
                  value={newWorkout.title}
                  onChangeText={(text) => setNewWorkout(prev => ({ ...prev, title: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Time *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 07:00"
                  placeholderTextColor="#6b7280"
                  value={newWorkout.time}
                  onChangeText={(text) => setNewWorkout(prev => ({ ...prev, time: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Duration *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 30 min"
                  placeholderTextColor="#6b7280"
                  value={newWorkout.duration}
                  onChangeText={(text) => setNewWorkout(prev => ({ ...prev, duration: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Type *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., HIIT, Strength, Yoga"
                  placeholderTextColor="#6b7280"
                  value={newWorkout.type}
                  onChangeText={(text) => setNewWorkout(prev => ({ ...prev, type: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Home Gym"
                  placeholderTextColor="#6b7280"
                  value={newWorkout.location}
                  onChangeText={(text) => setNewWorkout(prev => ({ ...prev, location: text }))}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Instructor</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Sarah Johnson"
                  placeholderTextColor="#6b7280"
                  value={newWorkout.instructor}
                  onChangeText={(text) => setNewWorkout(prev => ({ ...prev, instructor: text }))}
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addWorkout}
              >
                <Text style={styles.saveButtonText}>Add Workout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  weekScroll: {
    paddingLeft: 20,
  },
  dayButton: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    minWidth: 60,
  },
  dayButtonSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  dayButtonToday: {
    borderColor: '#6366f1',
  },
  dayName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
    marginBottom: 4,
  },
  dayNameSelected: {
    color: '#ffffff',
  },
  dayNameToday: {
    color: '#6366f1',
  },
  dayNumber: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  dayNumberSelected: {
    color: '#ffffff',
  },
  dayNumberToday: {
    color: '#6366f1',
  },
  workoutIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutIndicatorSelected: {
    backgroundColor: '#ffffff',
  },
  workoutCount: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  workoutsContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  workoutCardCompleted: {
    opacity: 0.7,
    backgroundColor: '#0f1f0f',
    borderColor: '#10b981',
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  workoutTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  workoutType: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  completionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6b7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionButtonCompleted: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  workoutDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  instructorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  modalForm: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});