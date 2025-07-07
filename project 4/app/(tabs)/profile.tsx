import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, CreditCard as Edit3, Settings, LogOut, Bell, Shield } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  phone: string;
  goals: string;
  experience: string;
  notifications: boolean;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile>({
    phone: '',
    goals: 'Perdere peso e tonificare',
    experience: 'Intermedio',
    notifications: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    Alert.alert('Successo', 'Profilo aggiornato con successo!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', style: 'cancel' },
        { text: 'Esci', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const toggleNotifications = () => {
    setProfile(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profilo</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Edit3 size={20} color="#ff6b35" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {user?.picture ? (
              <Image source={{ uri: user.picture }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <User size={40} color="#ff6b35" />
              </View>
            )}
            <Text style={styles.userName}>{user?.name || 'Utente'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Informazioni Personali</Text>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>{user?.name || 'Non disponibile'}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email || 'Non disponibile'}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Telefono</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedProfile.phone}
                  onChangeText={(text) => setEditedProfile(prev => ({ ...prev, phone: text }))}
                  keyboardType="phone-pad"
                  placeholder="Inserisci numero di telefono"
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.infoValue}>{profile.phone || 'Non inserito'}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Obiettivi</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedProfile.goals}
                  onChangeText={(text) => setEditedProfile(prev => ({ ...prev, goals: text }))}
                  placeholder="I tuoi obiettivi fitness"
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.infoValue}>{profile.goals}</Text>
              )}
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Esperienza</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedProfile.experience}
                  onChangeText={(text) => setEditedProfile(prev => ({ ...prev, experience: text }))}
                  placeholder="Livello di esperienza"
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.infoValue}>{profile.experience}</Text>
              )}
            </View>

            {isEditing && (
              <View style={styles.editActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelButtonText}>Annulla</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Salva</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Impostazioni</Text>

          <TouchableOpacity style={styles.settingItem} onPress={toggleNotifications}>
            <View style={styles.settingLeft}>
              <Bell size={20} color="#ff6b35" />
              <Text style={styles.settingText}>Notifiche</Text>
            </View>
            <View style={[
              styles.toggle,
              profile.notifications && styles.toggleActive
            ]}>
              <View style={[
                styles.toggleButton,
                profile.notifications && styles.toggleButtonActive
              ]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={20} color="#ff6b35" />
              <Text style={styles.settingText}>Privacy</Text>
            </View>
            <Text style={styles.settingValue}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Settings size={20} color="#ff6b35" />
              <Text style={styles.settingText}>Preferenze</Text>
            </View>
            <Text style={styles.settingValue}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Esci</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Personal Trainer App v1.0.0
          </Text>
          <Text style={styles.footerText}>
            by Simone Pagnottoni
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
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    marginBottom: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#888',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  editActions: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#ff6b35',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
  settingsSection: {
    backgroundColor: '#1a1a1a',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  settingValue: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#888',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#333',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#ff6b35',
  },
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  toggleButtonActive: {
    alignSelf: 'flex-end',
  },
  actionSection: {
    padding: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
  },
});