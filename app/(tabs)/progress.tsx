import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Calendar, Target, Award, ChevronDown } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ProgressData {
  date: string;
  calories: number;
  workouts: number;
  duration: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  const periods = ['Week', 'Month', 'Year'];

  const weeklyData: ProgressData[] = [
    { date: 'Mon', calories: 320, workouts: 1, duration: 45 },
    { date: 'Tue', calories: 280, workouts: 1, duration: 30 },
    { date: 'Wed', calories: 0, workouts: 0, duration: 0 },
    { date: 'Thu', calories: 450, workouts: 2, duration: 75 },
    { date: 'Fri', calories: 380, workouts: 1, duration: 50 },
    { date: 'Sat', calories: 520, workouts: 2, duration: 90 },
    { date: 'Sun', calories: 290, workouts: 1, duration: 40 },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Workout',
      description: 'Complete your first workout',
      icon: '🎯',
      unlocked: true,
      progress: 1,
      target: 1,
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Complete 5 workouts in a week',
      icon: '🔥',
      unlocked: true,
      progress: 5,
      target: 5,
    },
    {
      id: '3',
      title: 'Calorie Crusher',
      description: 'Burn 1000 calories in a day',
      icon: '⚡',
      unlocked: false,
      progress: 750,
      target: 1000,
    },
    {
      id: '4',
      title: 'Consistency King',
      description: 'Workout for 30 days straight',
      icon: '👑',
      unlocked: false,
      progress: 12,
      target: 30,
    },
  ];

  const totalCalories = weeklyData.reduce((sum, day) => sum + day.calories, 0);
  const totalWorkouts = weeklyData.reduce((sum, day) => sum + day.workouts, 0);
  const totalDuration = weeklyData.reduce((sum, day) => sum + day.duration, 0);
  const avgCalories = Math.round(totalCalories / 7);

  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress</Text>
        <TouchableOpacity style={styles.periodSelector}>
          <Text style={styles.periodText}>{selectedPeriod}</Text>
          <ChevronDown size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalCalories.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Calories</Text>
            <Text style={styles.statChange}>+12% from last week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
            <Text style={styles.statChange}>+2 from last week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Math.round(totalDuration / 60)}h {totalDuration % 60}m</Text>
            <Text style={styles.statLabel}>Total Time</Text>
            <Text style={styles.statChange}>+45min from last week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{avgCalories}</Text>
            <Text style={styles.statLabel}>Avg/Day</Text>
            <Text style={styles.statChange}>+8% from last week</Text>
          </View>
        </View>

        {/* Calories Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Calories Burned</Text>
            <Text style={styles.chartSubtitle}>This Week</Text>
          </View>
          <View style={styles.chart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.chartBar}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: maxCalories > 0 ? (day.calories / maxCalories) * 120 : 0,
                      backgroundColor: day.calories > 0 ? '#6366f1' : '#2a2a2a',
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{day.date}</Text>
                <Text style={styles.barValue}>{day.calories}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Goals */}
        <View style={styles.goalsContainer}>
          <Text style={styles.sectionTitle}>Weekly Goals</Text>
          
          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Workout Frequency</Text>
                <Text style={styles.goalProgress}>{totalWorkouts}/5 workouts</Text>
              </View>
              <Text style={styles.goalPercentage}>{Math.round((totalWorkouts / 5) * 100)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((totalWorkouts / 5) * 100, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Calorie Target</Text>
                <Text style={styles.goalProgress}>{totalCalories}/2000 calories</Text>
              </View>
              <Text style={styles.goalPercentage}>{Math.round((totalCalories / 2000) * 100)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((totalCalories / 2000) * 100, 100)}%` }]} />
            </View>
          </View>

          <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={styles.goalInfo}>
                <Text style={styles.goalTitle}>Active Minutes</Text>
                <Text style={styles.goalProgress}>{totalDuration}/300 minutes</Text>
              </View>
              <Text style={styles.goalPercentage}>{Math.round((totalDuration / 300) * 100)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min((totalDuration / 300) * 100, 100)}%` }]} />
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={[styles.achievementCard, !achievement.unlocked && styles.achievementLocked]}>
                <View style={styles.achievementIcon}>
                  <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={[styles.achievementTitle, !achievement.unlocked && styles.achievementTitleLocked]}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  {!achievement.unlocked && (
                    <View style={styles.achievementProgress}>
                      <View style={styles.achievementProgressBar}>
                        <View
                          style={[
                            styles.achievementProgressFill,
                            { width: `${(achievement.progress / achievement.target) * 100}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.achievementProgressText}>
                        {achievement.progress}/{achievement.target}
                      </Text>
                    </View>
                  )}
                </View>
                {achievement.unlocked && (
                  <View style={styles.achievementBadge}>
                    <Award size={16} color="#10b981" />
                  </View>
                )}
              </View>
            ))}
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
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#10b981',
  },
  chartContainer: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  chartHeader: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    backgroundColor: '#6366f1',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  goalsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  goalPercentage: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#6366f1',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#9ca3af',
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 8,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  achievementProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#2a2a2a',
    borderRadius: 2,
    overflow: 'hidden',
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
});