import colors from '@/constants/Colors';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
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

export default function AddTransactionScreen() {
  const [transactionType, setTransactionType] = useState<'Income' | 'Expense' | 'Loan'>('Income');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');

  const categories = {
    Income: [
      {
        label: 'Oylik ish haqqi',
        value: 'Oylik ish haqqi',
        icon: <MaterialIcons name="work" size={24} color={colors.white} />,
        iconBgColor: colors.primary,
      },
      {
        label: 'Freelance',
        value: 'Freelance',
        icon: <FontAwesome name="laptop" size={24} color={colors.white} />,
        iconBgColor: colors.green,
      },
      {
        label: 'Investitsiya',
        value: 'Investitsiya',
        icon: <MaterialIcons name="trending-up" size={24} color={colors.white} />,
        iconBgColor: colors.blue,
      },
      {
        label: 'Sovg\'a',
        value: 'Sovg\'a',
        icon: <Ionicons name="gift" size={24} color={colors.white} />,
        iconBgColor: colors.purple,
      },
      {
        label: 'Boshqa',
        value: 'Boshqa',
        icon: <MaterialIcons name="attach-money" size={24} color={colors.white} />,
        iconBgColor: colors.orange,
      },
    ],
    Expense: [
      {
        label: 'Oziq-ovqat',
        value: 'Oziq-ovqat',
        icon: <MaterialCommunityIcons name="food" size={24} color={colors.white} />,
        iconBgColor: colors.orange,
      },
      {
        label: 'Transport',
        value: 'Transport',
        icon: <MaterialIcons name="directions-car" size={24} color={colors.white} />,
        iconBgColor: colors.blue,
      },
      {
        label: 'Kommunal',
        value: 'Kommunal',
        icon: <MaterialIcons name="home" size={24} color={colors.white} />,
        iconBgColor: colors.teal,
      },
      {
        label: 'Kiyim-kechak',
        value: 'Kiyim-kechak',
        icon: <FontAwesome name="shopping-bag" size={24} color={colors.white} />,
        iconBgColor: colors.pink,
      },
      {
        label: 'Boshqa',
        value: 'Boshqa',
        icon: <MaterialIcons name="category" size={24} color={colors.white} />,
        iconBgColor: colors.gray,
      },
    ],
    Loan: [
      {
        label: 'Qarz oldim',
        value: 'Qarz oldim',
        icon: <Ionicons name="arrow-down-circle" size={24} color={colors.white} />,
        iconBgColor: colors.red,
      },
      {
        label: 'Qarz berdim',
        value: 'Qarz berdim',
        icon: <Ionicons name="arrow-up-circle" size={24} color={colors.white} />,
        iconBgColor: colors.green,
      },
    ],
  };

  const friends = [
    { label: 'Azizov Sardor', value: 'Azizov Sardor' },
    { label: 'Karimova Dilfuza', value: 'Karimova Dilfuza' },
    { label: 'Jamolov Sherzod', value: 'Jamolov Sherzod' },
    { label: 'Opaqulov Jasur', value: 'Opaqulov Jasur' },
    { label: 'Nosirova Malika', value: 'Nosirova Malika' },
    { label: 'Toshmatov Bahodir', value: 'Toshmatov Bahodir' },
  ];

  const handleSubmit = () => {
    if (!selectedCategory || !amount || (transactionType === 'Loan' && !selectedFriend)) {
      alert('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
      return;
    }
    if (transactionType !== 'Loan' && !description) {
      alert('Iltimos, tavsifni kiriting!');
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
    alert('Tranzaksiya qo\'shildi!');
  };

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
            {categories[transactionType].map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.categoryItem,
                  selectedCategory === cat.value && styles.categoryItemActive,
                ]}
                onPress={() => setSelectedCategory(cat.value)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: cat.iconBgColor }]}>
                  {cat.icon}
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat.value && styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formContainer}>
          {transactionType === 'Loan' ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Do'stni tanlang</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedFriend}
                    onValueChange={(itemValue) => setSelectedFriend(itemValue)}
                    style={styles.picker}
                    dropdownIconColor={colors.primary}
                    prompt="Do'stni tanlang"
                    mode="dropdown"
                    itemStyle={{ fontFamily: 'JetBrainsMono-Medium' }}
                    
                  >
                    {friends.map((friend) => (
                      <Picker.Item
                        key={friend.value}
                        label={friend.label}
                        value={friend.value}
                        style={{ fontFamily: 'JetBrainsMono-Medium' }}
                      />
                    ))}
                  </Picker>
                </View>
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
    justifyContent: 'flex-start',
    gap: 8,
  },
  categoryItem: {
    width: '30%', // Adjust for 3 columns; use '45%' for 2 columns
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryItemActive: {
    backgroundColor: colors.primary + '20',
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
    fontSize: 10, // Smaller font size for app-like labels
    fontWeight: '500',
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Medium',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: colors.primary,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray + '50',
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    minHeight: 50,
    color: colors.dark,
    fontFamily: 'JetBrainsMono-Regular',
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