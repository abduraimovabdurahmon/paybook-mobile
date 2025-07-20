import colors from '@/constants/Colors';
import api from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Category {
  id: string;
  bgColor: string;
  icon: string;
  keyword: string;
  title: string;
  type: 'INCOME' | 'EXPENSE' | 'DEBT';
}

export default function AddTransactionScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactionType, setTransactionType] = useState<'Income' | 'Expense' | 'Loan'>('Income');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');

  const fetchData = async () => {
    try {
      const response = await api.get('/api/categories/list');
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error('Invalid data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    if (!selectedCategory || !amount || (transactionType === 'Loan' && !selectedFriend)) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    if (transactionType !== 'Loan' && !description) {
      alert("Iltimos, tavsifni kiriting!");
      return;
    }
    console.log({
      transactionType,
      category: selectedCategory,
      description: transactionType !== 'Loan' ? description : undefined,
      amount: parseFloat(amount),
      friend: transactionType === 'Loan' ? selectedFriend : undefined,
    });
    setSelectedCategory('');
    setDescription('');
    setAmount('');
    setSelectedFriend('');
    alert("Tranzaksiya qo'shildi!");
  };

  // Kategoriyalarni tranzaksiya turi bo'yicha filtrlash
  const filteredCategories = categories.filter(
    (cat) =>
      (transactionType === 'Income' && cat.type === 'INCOME') ||
      (transactionType === 'Expense' && cat.type === 'EXPENSE') ||
      (transactionType === 'Loan' && cat.type === 'DEBT')
  );

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === 'Income' && styles.typeButtonActive,
            ]}
            onPress={() => {
              setTransactionType('Income');
              setSelectedCategory('');
              setSelectedFriend('');
            }}
          >
            <Text
              style={[
                styles.typeButtonText,
                transactionType === 'Income' && styles.typeButtonTextActive,
              ]}
            >
              Daromad
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === 'Expense' && styles.typeButtonActive,
            ]}
            onPress={() => {
              setTransactionType('Expense');
              setSelectedCategory('');
              setSelectedFriend('');
            }}
          >
            <Text
              style={[
                styles.typeButtonText,
                transactionType === 'Expense' && styles.typeButtonTextActive,
              ]}
            >
              Xarajat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              transactionType === 'Loan' && styles.typeButtonActive,
            ]}
            onPress={() => {
              setTransactionType('Loan');
              setSelectedCategory('');
              setSelectedFriend('');
            }}
          >
            <Text
              style={[
                styles.typeButtonText,
                transactionType === 'Loan' && styles.typeButtonTextActive,
              ]}
            >
              Qarz
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Kategoriyani tanlang</Text>
          <View style={styles.categoryGrid}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryItem,
                    selectedCategory === cat.id && styles.categoryItemActive,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: cat.bgColor },
                    ]}
                  >
                    <Ionicons
                      name={cat.icon as keyof typeof Ionicons.glyphMap} // Ikona nomini API’dan kelgan ma’lumot sifatida ishlatamiz
                      size={24}
                      color={colors.white}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat.id && styles.categoryTextActive,
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noCategoryText}>
                Ushbu turdagi kategoriyalar topilmadi
              </Text>
            )}
          </View>
        </View>

        <View style={styles.formContainer}>
          {transactionType === 'Loan' ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Do'st ismi</Text>
                <TextInput
                  style={styles.textInput}
                  value={selectedFriend}
                  onChangeText={setSelectedFriend}
                  placeholder="Do'st ismini kiriting"
                  placeholderTextColor={colors.gray}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Summa (so'm)</Text>
                <TextInput
                  style={styles.textInput}
                  value={amount}
                  onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
                  placeholder="Summani kiriting (masalan, 500000)"
                  placeholderTextColor={colors.gray}
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Tavsif</Text>
                <TextInput
                  style={styles.textInput}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Tavsif kiriting (masalan, Oziq-ovqat xarajatlari)"
                  placeholderTextColor={colors.gray}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Summa (so'm)</Text>
                <TextInput
                  style={styles.textInput}
                  value={amount}
                  onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ''))}
                  placeholder="Summani kiriting (masalan, 100000)"
                  placeholderTextColor={colors.gray}
                  keyboardType="numeric"
                />
              </View>
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Tranzaksiya qo'shish</Text>
            <Ionicons name="add-circle-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Medium',
  },
  typeButtonTextActive: {
    color: colors.white,
  },
  categoryContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryItemActive: {
    backgroundColor: colors.primary + '20',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Medium',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  noCategoryText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Regular',
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Medium',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.gray + '50',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Regular',
  },
  submitButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 15,
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: 'JetBrainsMono-Bold',
    marginRight: 8,
  },
});