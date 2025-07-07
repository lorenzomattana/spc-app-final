import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChartBar as BarChart3, Plus, TrendingUp, Heart, Weight, Activity } from 'lucide-react-native';

interface TrackingEntry {
  id: string;
  date: string;
  type: 'pre' | 'post';
  weight?: string;
  bloodPressure?: string;
  heartRate?: string;
  mood: number;
  energy: number;
  notes?: string;
}

export default function Tracking() {
  const [entries, setEntries] = useState<TrackingEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'pre',
      weight: '75.5',
      bloodPressure: '120/80',
      heartRate: '72',
      mood: 8,
      energy: 7,
      notes: 'Mi sento pronto per allenarmi',
    },
    {
      id: '2',
      date: '2024-01-15',
      type: 'post',
      weight: '75.2',
      bloodPressure: '140/90',
      heartRate: '95',
      mood: 9,
      energy: 6,
      notes: 'Ottimo allenamento, molto soddisfatto',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [entryType, setEntryType] = useState<'pre' | 'post'>('pre');
  const [newEntry, setNewEntry] = useState({
    weight: '',
    bloodPressure: '',
    heartRate: '',
    mood: 5,
    energy: 5,
    notes: '',
  });

  const addEntry = () => {
    const entry: TrackingEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: entryType,
      weight: newEntry.weight || undefined,
      bloodPressure: newEntry.bloodPressure || undefined,
      heartRate: newEntry.heartRate || undefined,
      mood: newEntry.mood,
      energy: newEntry.energy,
      notes: newEntry.notes || undefined,
    };
    
    setEntries(prev => [entry, ...prev]);
    setNewEntry({
      weight: '',
      bloodPressure: '',
      heartRate: '',
      mood: 5,
      energy: 5,
      notes: '',
    });
    setShowModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '😐';
    if (mood >= 4) return '😕';
    return '😞';
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 8) return '#4ade80';
    if (energy >= 6) return '#fbbf24';
    if (energy >= 4) return '#fb923c';
    return '#ef4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tracking</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[styles.typeButton, styles.preButton]} 
            onPress={() => {
              setEntryType('pre');
              setShowModal(true);
            }}
          >
            <Text style={styles.typeButtonText}>Pre</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeButton, styles.postButton]} 
            onPress={() => {
              setEntryType('post');
              setShowModal(true);
            }}
          >
            <Text style={styles.typeButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {entries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.entryInfo}>
                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
                <View style={[
                  styles.entryType,
                  entry.type === 'pre' ? styles.preType : styles.postType
                ]}>
                  <Text style={styles.entryTypeText}>
                    {entry.type === 'pre' ? 'Pre-Allenamento' : 'Post-Allenamento'}
                  </Text>
                </View>
              </View>
              <View style={styles.moodIndicator}>
                <Text style={styles.moodEmoji}>{getMoodEmoji(entry.mood)}</Text>
                <Text style={styles.moodText}>{entry.mood}/10</Text>
              </View>
            </View>

            <View style={styles.metricsGrid}>
              {entry.weight && (
                <View style={styles.metric}>
                  <Weight size={20} color="#ff6b35" />
                  <Text style={styles.metricValue}>{entry.weight} kg</Text>
                  <Text style={styles.metricLabel}>Peso</Text>
                </View>
              )}
              {entry.bloodPressure && (
                <View style={styles.metric}>
                  <Heart size={20} color="#ef4444" />
                  <Text style={styles.metricValue}>{entry.bloodPressure}</Text>
                  <Text style={styles.metricLabel}>Pressione</Text>
                </View>
              )}
              {entry.heartRate && (
                <View style={styles.metric}>
                  <Activity size={20} color="#10b981" />
                  <Text style={styles.metricValue}>{entry.heartRate} bpm</Text>
                  <Text style={styles.metricLabel}>Frequenza</Text>
                </View>
              )}
            </View>

            <View style={styles.energyContainer}>
              <Text style={styles.energyLabel}>Energia</Text>
              <View style={styles.energyBar}>
                <View 
                  style={[
                    styles.energyFill,
                    {
                      width: `${(entry.energy / 10) * 100}%`,
                      backgroundColor: getEnergyColor(entry.energy),
                    }
                  ]}
                />
              </View>
              <Text style={styles.energyValue}>{entry.energy}/10</Text>
            </View>

            {entry.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Note</Text>
                <Text style={styles.notesText}>{entry.notes}</Text>
              </View>
            )}
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
            <Text style={styles.modalTitle}>
              {entryType === 'pre' ? 'Dati Pre-Allenamento' : 'Dati Post-Allenamento'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Peso (kg)"
              placeholderTextColor="#888"
              value={newEntry.weight}
              onChangeText={(text) => setNewEntry(prev => ({ ...prev, weight: text }))}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Pressione sanguigna (es. 120/80)"
              placeholderTextColor="#888"
              value={newEntry.bloodPressure}
              onChangeText={(text) => setNewEntry(prev => ({ ...prev, bloodPressure: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Frequenza cardiaca (bpm)"
              placeholderTextColor="#888"
              value={newEntry.heartRate}
              onChangeText={(text) => setNewEntry(prev => ({ ...prev, heartRate: text }))}
              keyboardType="numeric"
            />

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Umore: {newEntry.mood}/10</Text>
              <View style={styles.sliderButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.sliderButton,
                      newEntry.mood === value && styles.sliderButtonActive
                    ]}
                    onPress={() => setNewEntry(prev => ({ ...prev, mood: value }))}
                  >
                    <Text style={[
                      styles.sliderButtonText,
                      newEntry.mood === value && styles.sliderButtonTextActive
                    ]}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Energia: {newEntry.energy}/10</Text>
              <View style={styles.sliderButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.sliderButton,
                      newEntry.energy === value && styles.sliderButtonActive
                    ]}
                    onPress={() => setNewEntry(prev => ({ ...prev, energy: value }))}
                  >
                    <Text style={[
                      styles.sliderButtonText,
                      newEntry.energy === value && styles.sliderButtonTextActive
                    ]}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Note aggiuntive (opzionale)"
              placeholderTextColor="#888"
              value={newEntry.notes}
              onChangeText={(text) => setNewEntry(prev => ({ ...prev, notes: text }))}
              multiline
              numberOfLines={3}
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
                onPress={addEntry}
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
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  preButton: {
    backgroundColor: '#3b82f6',
  },
  postButton: {
    backgroundColor: '#10b981',
  },
  typeButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  entryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  entryInfo: {
    flex: 1,
  },
  entryDate: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 5,
  },
  entryType: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  preType: {
    backgroundColor: '#3b82f6',
  },
  postType: {
    backgroundColor: '#10b981',
  },
  entryTypeText: {
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  moodIndicator: {
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  moodText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 15,
  },
  metric: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginVertical: 5,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
    textAlign: 'center',
  },
  energyContainer: {
    marginBottom: 15,
  },
  energyLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 8,
  },
  energyBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  energyFill: {
    height: '100%',
    borderRadius: 4,
  },
  energyValue: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
    textAlign: 'right',
    marginTop: 5,
  },
  notesContainer: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
  },
  notesLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 20,
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
    maxHeight: '80%',
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
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 10,
  },
  sliderButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sliderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonActive: {
    backgroundColor: '#ff6b35',
  },
  sliderButtonText: {
    color: '#888',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  sliderButtonTextActive: {
    color: '#fff',
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