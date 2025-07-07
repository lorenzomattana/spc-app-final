import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, Plus, Calendar, Clock, Target, Image as ImageIcon } from 'lucide-react-native';

interface Exercise {
  id: string;
  name: string;
  muscle: string;
  sets: number;
  reps: string;
  weight?: string;
}

interface Workout {
  id: string;
  name: string;
  program: string;
  date: string;
  duration: string;
  exercises: Exercise[];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Push Day',
      program: 'Push Pull Legs',
      date: '2024-01-15',
      duration: '75 min',
      exercises: [
        { id: '1', name: 'Panca Piana', muscle: 'Petto', sets: 4, reps: '8-10', weight: '80kg' },
        { id: '2', name: 'Spinte Manubri', muscle: 'Petto', sets: 3, reps: '12-15', weight: '30kg' },
        { id: '3', name: 'Push-up', muscle: 'Petto', sets: 3, reps: '15-20' },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    program: '',
    duration: '',
  });

  const addWorkout = () => {
    if (newWorkout.name && newWorkout.program) {
      const workout: Workout = {
        id: Date.now().toString(),
        name: newWorkout.name,
        program: newWorkout.program,
        date: new Date().toISOString().split('T')[0],
        duration: newWorkout.duration || '0 min',
        exercises: [],
      };
      
      setWorkouts(prev => [workout, ...prev]);
      setNewWorkout({ name: '', program: '', duration: '' });
      setShowModal(false);
    } else {
      Alert.alert('Errore', 'Inserisci almeno nome e programma');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>I Miei Allenamenti</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {workouts.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutProgram}>{workout.program}</Text>
              </View>
              <View style={styles.workoutStats}>
                <View style={styles.statItem}>
                  <Calendar size={16} color="#ff6b35" />
                  <Text style={styles.statText}>{formatDate(workout.date)}</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color="#ff6b35" />
                  <Text style={styles.statText}>{workout.duration}</Text>
                </View>
                <View style={styles.statItem}>
                  <Target size={16} color="#ff6b35" />
                  <Text style={styles.statText}>{workout.exercises.length} esercizi</Text>
                </View>
              </View>
            </View>

            {workout.exercises.length > 0 && (
              <View style={styles.exercisesList}>
                {workout.exercises.map((exercise) => (
                  <View key={exercise.id} style={styles.exerciseItem}>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseMuscle}>{exercise.muscle}</Text>
                    </View>
                    <Text style={styles.exerciseDetails}>
                      {exercise.sets} x {exercise.reps}
                      {exercise.weight && ` - ${exercise.weight}`}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.workoutActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Dumbbell size={20} color="#ff6b35" />
                <Text style={styles.actionText}>Modifica</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ImageIcon size={20} color="#ff6b35" />
                <Text style={styles.actionText}>Aggiungi Media</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuovo Allenamento</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome allenamento"
              placeholderTextColor="#888"
              value={newWorkout.name}
              onChangeText={(text) => setNewWorkout(prev => ({ ...prev, name: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Programma"
              placeholderTextColor="#888"
              value={newWorkout.program}
              onChangeText={(text) => setNewWorkout(prev => ({ ...prev, program: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Durata (opzionale)"
              placeholderTextColor="#888"
              value={newWorkout.duration}
              onChangeText={(text) => setNewWorkout(prev => ({ ...prev, duration: text }))}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={addWorkout}
              >
                <Text style={styles.saveButtonText}>Salva</Text>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#ff6b35',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  workoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  workoutHeader: {
    marginBottom: 15,
  },
  workoutInfo: {
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  workoutProgram: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ff6b35',
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  exercisesList: {
    marginBottom: 15,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 3,
  },
  exerciseMuscle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  exerciseDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ff6b35',
  },
  workoutActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ff6b35',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  saveButton: {
    backgroundColor: '#ff6b35',
  },
  cancelButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
});