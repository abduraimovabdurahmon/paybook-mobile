import { Ionicons } from '@expo/vector-icons';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { useEffect, useRef, useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function AddTransactionModal({ visible, onClose }: {
  visible: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'income' | 'expense' | 'loan'>('income');
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>

      <Animated.View 
        style={[
          styles.modalContent,
          { transform: [{ translateY }] }
        ]}
      >
        <View style={styles.modalHeader}>
          <Ionicons 
            name="close" 
            size={24} 
            color={Colors.gray} 
            onPress={onClose}
            style={styles.closeButton}
          />
          <View style={styles.tabSelector}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'income' && styles.activeTab]}
              onPress={() => setActiveTab('income')}
            >
              <Text style={[styles.tabText, activeTab === 'income' && styles.activeTabText]}>Kirim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'expense' && styles.activeTab]}
              onPress={() => setActiveTab('expense')}
            >
              <Text style={[styles.tabText, activeTab === 'expense' && styles.activeTabText]}>Chiqim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'loan' && styles.activeTab]}
              onPress={() => setActiveTab('loan')}
            >
              <Text style={[styles.tabText, activeTab === 'loan' && styles.activeTabText]}>Qarz</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modalBody}>
          {activeTab === 'income' && (
            <View>
              <Text style={styles.sectionTitle}>Kirim qo'shish</Text>
              {/* Add income form components here */}
            </View>
          )}
          
          {activeTab === 'expense' && (
            <View>
              <Text style={styles.sectionTitle}>Chiqim qo'shish</Text>
              {/* Add expense form components here */}
            </View>
          )}
          
          {activeTab === 'loan' && (
            <View>
              <Text style={styles.sectionTitle}>Qarz operatsiyasi</Text>
              {/* Add loan form components here */}
            </View>
          )}
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 4,
    flex: 1,
    marginLeft: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    color: Colors.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
  },
  modalBody: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: Colors.dark,
  },
});