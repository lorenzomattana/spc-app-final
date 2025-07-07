import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Play, Clock, Flame, Users } from 'lucide-react-native';

interface Workout {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  calories: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
  participants: number;
  rating: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function WorkoutsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories: Category[] = [
    { id: '1', name: 'All', icon: '🏃', color: '#6366f1' },
    { id: '2', name: 'HIIT', icon: '⚡', color: '#ef4444' },
    { id: '3', name: 'Strength', icon: '💪', color: '#10b981' },
    { id: '4', name: 'Yoga', icon: '🧘', color: '#8b5cf6' },
    { id: '5', name: 'Cardio', icon: '❤️', color: '#f59e0b' },
    { id: '6', name: 'Pilates', icon: '🤸', color: '#ec4899' },
  ];

  const workouts: Workout[] = [
    {
      id: '1',
      title: 'Full Body HIIT Blast',
      instructor: 'Sarah Johnson',
      duration: '25 min',
      calories: '300 cal',
      difficulty: 'Intermediate',
      category: 'HIIT',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 1247,
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Upper Body Strength',
      instructor: 'Mike Chen',
      duration: '45 min',
      calories: '280 cal',
      difficulty: 'Advanced',
      category: 'Strength',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 892,
      rating: 4.9,
    },
    {
      id: '3',
      title: 'Morning Yoga Flow',
      instructor: 'Emma Wilson',
      duration: '30 min',
      calories: '150 cal',
      difficulty: 'Beginner',
      category: 'Yoga',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 2156,
      rating: 4.7,
    },
    {
      id: '4',
      title: 'Cardio Dance Party',
      instructor: 'Lisa Rodriguez',
      duration: '35 min',
      calories: '320 cal',
      difficulty: 'Intermediate',
      category: 'Cardio',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 1543,
      rating: 4.6,
    },
    {
      id: '5',
      title: 'Core Pilates Power',
      instructor: 'Anna Thompson',
      duration: '20 min',
      calories: '180 cal',
      difficulty: 'Intermediate',
      category: 'Pilates',
      image: 'https://images.pexels.com/photos/3984340/pexels-photo-3984340.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 756,
      rating: 4.8,
    },
    {
      id: '6',
      title: 'Leg Day Destroyer',
      instructor: 'David Kim',
      duration: '40 min',
      calories: '350 cal',
      difficulty: 'Advanced',
      category: 'Strength',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800',
      participants: 634,
      rating: 4.9,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workouts..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.categoryTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workouts List */}
      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        {filteredWorkouts.map((workout) => (
          <TouchableOpacity key={workout.id} style={styles.workoutCard}>
            <Image source={{ uri: workout.image }} style={styles.workoutImage} />
            <View style={styles.workoutOverlay}>
              <TouchableOpacity style={styles.playButton}>
                <Play size={16} color="#ffffff" fill="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.workoutContent}>
              <View style={styles.workoutHeader}>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <Text style={styles.workoutInstructor}>by {workout.instructor}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {workout.rating}</Text>
                </View>
              </View>

              <View style={styles.workoutMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#9ca3af" />
                  <Text style={styles.metaText}>{workout.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Flame size={16} color="#9ca3af" />
                  <Text style={styles.metaText}>{workout.calories}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Users size={16} color="#9ca3af" />
                  <Text style={styles.metaText}>{workout.participants.toLocaleString()}</Text>
                </View>
              </View>

              <View style={styles.workoutFooter}>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }]}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}>
                    {workout.difficulty}
                  </Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{workout.category}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  categoryButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  workoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  workoutImage: {
    width: '100%',
    height: 200,
  },
  workoutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutContent: {
    padding: 20,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
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
  workoutInstructor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  ratingContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  categoryBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});