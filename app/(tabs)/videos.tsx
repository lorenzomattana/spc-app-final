import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CirclePlay as PlayCircle, ExternalLink } from 'lucide-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width } = Dimensions.get('window');

interface Video {
  id: string;
  title: string;
  videoId: string;
  duration: string;
  description: string;
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  // Playlist di esempio - In produzione, questi dati verrebbero da un'API
  const videos: Video[] = [
    {
      id: '1',
      title: 'Allenamento Completo Upper Body',
      videoId: 'dQw4w9WgXcQ', // Video ID di YouTube
      duration: '15:30',
      description: 'Allenamento completo per la parte superiore del corpo, perfetto per tonificare e rafforzare.',
    },
    {
      id: '2',
      title: 'Workout Legs & Glutes',
      videoId: 'dQw4w9WgXcQ',
      duration: '20:45',
      description: 'Esercizi mirati per gambe e glutei, ideale per modellare la parte inferiore del corpo.',
    },
    {
      id: '3',
      title: 'Cardio HIIT 12 Minuti',
      videoId: 'dQw4w9WgXcQ',
      duration: '12:00',
      description: 'Allenamento cardio ad alta intensità per bruciare calorie e migliorare la resistenza.',
    },
    {
      id: '4',
      title: 'Stretching e Recovery',
      videoId: 'dQw4w9WgXcQ',
      duration: '18:20',
      description: 'Sessione di stretching per il recupero muscolare e il miglioramento della flessibilità.',
    },
    {
      id: '5',
      title: 'Core Strength Training',
      videoId: 'dQw4w9WgXcQ',
      duration: '14:15',
      description: 'Allenamento specifico per rinforzare il core e migliorare la stabilità.',
    },
  ];

  const handleVideoPress = (videoId: string) => {
    setSelectedVideo(selectedVideo === videoId ? null : videoId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Allenamenti</Text>
        <Text style={styles.subtitle}>by Simone Pagnottoni</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistTitle}>Playlist Esclusiva</Text>
          <Text style={styles.playlistDescription}>
            Accedi ai miei video allenamenti personalizzati, pensati appositamente per te.
          </Text>
        </View>

        {videos.map((video) => (
          <View key={video.id} style={styles.videoCard}>
            <TouchableOpacity
              style={styles.videoHeader}
              onPress={() => handleVideoPress(video.videoId)}
            >
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoDuration}>{video.duration}</Text>
              </View>
              <View style={styles.playButton}>
                <PlayCircle size={32} color="#ff6b35" />
              </View>
            </TouchableOpacity>

            <Text style={styles.videoDescription}>{video.description}</Text>

            {selectedVideo === video.videoId && (
              <View style={styles.playerContainer}>
                <YoutubePlayer
                  height={200}
                  play={false}
                  videoId={video.videoId}
                  onChangeState={(state) => console.log('Video state:', state)}
                />
              </View>
            )}

            <View style={styles.videoActions}>
              <TouchableOpacity style={styles.actionButton}>
                <ExternalLink size={18} color="#888" />
                <Text style={styles.actionText}>Guarda su YouTube</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Nuovi video ogni settimana! Resta aggiornato per non perdere i contenuti esclusivi.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ff6b35',
  },
  scrollView: {
    flex: 1,
  },
  playlistInfo: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 15,
  },
  playlistTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 10,
  },
  playlistDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 20,
  },
  videoCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 5,
  },
  videoDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  playButton: {
    marginLeft: 15,
  },
  videoDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 15,
  },
  playerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});