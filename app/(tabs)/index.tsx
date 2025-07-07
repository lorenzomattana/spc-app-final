import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Clock, Flame, Target, ChevronRight, Award } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface WorkoutStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface QuickWorkout {
  id: string;
  title: string;
  duration: string;
  calories: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
}

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const stats: WorkoutStat[] = [
    {
      label: 'Calories Burned',
      value: '2,847',
      icon: <Flame size={24} color="#ef4444" />,
      color: '#ef4444',
    },
    {
      label: 'Workouts',
      value: '12',
      icon: <Target size={24} color="#10b981" />,
      color: '#10b981',
    },
    {
      label: 'Minutes',
      value: '340',
      icon: <Clock size={24} color="#f59e0b" />,
      color: '#f59e0b',
    },
    {
      label: 'Streak',
      value: '7 days',
      icon: <Award size={24} color="#8b5cf6" />,
      color: '#8b5cf6',
    },
  ];

  const quickWorkouts: QuickWorkout[] = [
    {
      id: '1',
      title: 'Morning HIIT',
      duration: '15 min',
      calories: '180 cal',
      difficulty: 'Intermediate',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'HIIT',
    },
    {
      id: '2',
      title: 'Full Body Strength',
      duration: '45 min',
      calories: '320 cal',
      difficulty: 'Advanced',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Strength',
    },
    {
      id: '3',
      title: 'Yoga Flow',
      duration: '30 min',
      calories: '120 cal',
      difficulty: 'Beginner',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Yoga',
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.userName}>Alex</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Today's Goal */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Today's Goal</Text>
            <Text style={styles.goalProgress}>75%</Text>
          </View>
          <Text style={styles.goalDescription}>Burn 400 calories</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.goalRemaining}>100 calories remaining</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statIcon}>
                  {stat.icon}
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Workouts */}
        <View style={styles.workoutsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Workouts</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workoutsList}>
            {quickWorkouts.map((workout) => (
              <TouchableOpacity key={workout.id} style={styles.workoutCard}>
                <Image source={{ uri: workout.image }} style={styles.workoutImage} />
                <View style={styles.workoutOverlay}>
                  <TouchableOpacity style={styles.playButton}>
                    <Play size={20} color="#ffffff" fill="#ffffff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.workoutInfo}>
                  <View style={styles.workoutCategory}>
                    <Text style={styles.categoryText}>{workout.category}</Text>
                  </View>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <View style={styles.workoutMeta}>
                    <Text style={styles.workoutDuration}>{workout.duration}</Text>
                    <Text style={styles.workoutCalories}>{workout.calories}</Text>
                  </View>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(workout.difficulty) + '20' }]}>
                    <Text style={[styles.difficultyText, { color: getDifficultyColor(workout.difficulty) }]}>
                      {workout.difficulty}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Dumbbell size={20} color="#6366f1" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Upper Body Strength</Text>
                <Text style={styles.activityTime}>2 hours ago • 45 min</Text>
              </View>
              <Text style={styles.activityCalories}>285 cal</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Target size={20} color="#10b981" />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Morning Run</Text>
                <Text style={styles.activityTime}>Yesterday • 30 min</Text>
              </View>
              <Text style={styles.activityCalories}>220 cal</Text>
            </View>
          </View>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  goalCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  goalProgress: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
  },
  goalDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  goalRemaining: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
    textAlign: 'center',
  },
  workoutsContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6366f1',
  },
  workoutsList: {
    paddingLeft: 20,
  },
  workoutCard: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  workoutImage: {
    width: '100%',
    height: 160,
  },
  workoutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(99, 102, 241, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutInfo: {
    padding: 20,
  },
  workoutCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#6366f1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  workoutTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  workoutDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  workoutCalories: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  activityCalories: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
  },
});