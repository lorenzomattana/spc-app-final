import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, Loader as Loader2, Info } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface NutritionData {
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export default function CalAI() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permessi richiesti', 'Abbiamo bisogno dei permessi per accedere alla galleria');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      analyzeFood(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permessi richiesti', 'Abbiamo bisogno dei permessi per accedere alla fotocamera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      analyzeFood(result.assets[0].uri);
    }
  };

  const analyzeFood = async (imageUri: string) => {
    setLoading(true);
    try {
      // Simulazione dell'analisi AI - In produzione, collegare a un servizio reale
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dati nutrizionali simulati
      const mockData: NutritionData = {
        food: 'Petto di pollo grigliato',
        calories: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        sodium: 74,
      };
      
      setNutritionData(mockData);
    } catch (error) {
      Alert.alert('Errore', 'Impossibile analizzare l\'immagine');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Cal AI</Text>
          <Text style={styles.subtitle}>Scatta una foto e scopri i valori nutrizionali</Text>
        </View>

        <View style={styles.imageSection}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <ImageIcon size={60} color="#666" />
              <Text style={styles.placeholderText}>Nessuna immagine selezionata</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Camera size={24} color="#fff" />
            <Text style={styles.buttonText}>Scatta Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={pickImage}>
            <ImageIcon size={24} color="#ff6b35" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Galleria</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <Loader2 size={40} color="#ff6b35" />
            <Text style={styles.loadingText}>Analizzando l'immagine...</Text>
          </View>
        )}

        {nutritionData && !loading && (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>Risultati Analisi</Text>
              <Info size={20} color="#ff6b35" />
            </View>

            <View style={styles.foodCard}>
              <Text style={styles.foodName}>{nutritionData.food}</Text>
              <Text style={styles.portion}>Porzione: 100g</Text>
            </View>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutritionData.calories}</Text>
                <Text style={styles.nutritionLabel}>Calorie</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutritionData.protein}g</Text>
                <Text style={styles.nutritionLabel}>Proteine</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutritionData.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carboidrati</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutritionData.fat}g</Text>
                <Text style={styles.nutritionLabel}>Grassi</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutritionData.fiber}g</Text>
                <Text style={styles.nutritionLabel}>Fibre</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutritionData.sugar}g</Text>
                <Text style={styles.nutritionLabel}>Zuccheri</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#888',
    textAlign: 'center',
  },
  imageSection: {
    margin: 20,
    alignItems: 'center',
  },
  selectedImage: {
    width: 300,
    height: 300,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 300,
    height: 300,
    borderRadius: 15,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#666',
    fontFamily: 'Inter-Regular',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#ff6b35',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  secondaryButtonText: {
    color: '#ff6b35',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    color: '#888',
    fontFamily: 'Inter-Regular',
    marginTop: 15,
  },
  resultContainer: {
    margin: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  foodCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  foodName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 5,
  },
  portion: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ff6b35',
    marginBottom: 5,
  },
  nutritionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#888',
    textAlign: 'center',
  },
});