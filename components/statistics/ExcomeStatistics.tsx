import colors from '@/constants/Colors';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

export default function ExpenseStatistics() {
  // Chart data adapted for react-native-gifted-charts
  const chartData = [
    {
      value: 1200000,
      text: "Oziq-ovqat",
      color: colors.orange,
    },
    {
      value: 500000,
      text: "Transport",
      color: colors.blue,
    },
    {
      value: 750000,
      text: "Kommunal",
      color: colors.teal,
    },
    {
      value: 600000,
      text: "Kiyim-kechak",
      color: colors.pink,
    },
    {
      value: 450000,
      text: "Boshqa",
      color: colors.gray,
    },
  ];

  const totalExpenses = chartData.reduce((sum, item) => sum + item.value, 0);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Xarajatlar taqsimoti</Text>
          <View style={styles.chartWrapper}>
            <PieChart
              data={chartData}
              donut
              radius={100}
              innerRadius={60}
              showValuesAsLabels={false}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerLabelText}>
                    Jami: {totalExpenses.toLocaleString()} so'm
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                <Text style={styles.legendText}>
                  {item.text}: {((item.value / totalExpenses) * 100).toFixed(0)}%
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totalExpenseContainer}>
            <Text style={styles.totalExpenseText}>Jami xarajat:</Text>
            <Text style={styles.totalExpenseAmount}>{totalExpenses.toLocaleString()} so'm</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <View style={styles.expenseCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.orange }]}>
              <MaterialCommunityIcons name="food" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.expenseTitle}>Oziq-ovqat</Text>
              <Text style={styles.expenseDescription}>Oylik oziq-ovqat xarajatlari</Text>
            </View>
            <Text style={[styles.expenseAmount, { color: colors.red }]}>
              -1,200,000 so'm
            </Text>
          </View>

          <View style={styles.expenseCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.blue }]}>
              <MaterialIcons name="directions-car" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.expenseTitle}>Transport</Text>
              <Text style={styles.expenseDescription}>Yo'l kira va yoqilg'i</Text>
            </View>
            <Text style={[styles.expenseAmount, { color: colors.red }]}>
              -500,000 so'm
            </Text>
          </View>

          <View style={styles.expenseCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.teal }]}>
              <MaterialIcons name="home" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.expenseTitle}>Kommunal</Text>
              <Text style={styles.expenseDescription}>Elektr, suv va gaz to'lovlari</Text>
            </View>
            <Text style={[styles.expenseAmount, { color: colors.red }]}>
              -750,000 so'm
            </Text>
          </View>

          <View style={styles.expenseCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.pink }]}>
              <FontAwesome name="shopping-bag" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.expenseTitle}>Kiyim-kechak</Text>
              <Text style={styles.expenseDescription}>Kiyim va aksessuarlar</Text>
            </View>
            <Text style={[styles.expenseAmount, { color: colors.red }]}>
              -600,000 so'm
            </Text>
          </View>

          <View style={styles.expenseCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.gray }]}>
              <MaterialIcons name="category" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.expenseTitle}>Boshqa</Text>
              <Text style={styles.expenseDescription}>Turli xil xarajatlar</Text>
            </View>
            <Text style={[styles.expenseAmount, { color: colors.red }]}>
              -450,000 so'm
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 10,
    fontFamily: "JetBrainsMono-Bold",
  },
  chartWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: colors.dark,
    fontFamily: "JetBrainsMono-Regular",
  },
  totalExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
    width: "100%",
  },
  totalExpenseText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
    fontFamily: "JetBrainsMono-Medium",
  },
  totalExpenseAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.red,
    fontFamily: "JetBrainsMono-Bold",
  },
  categoriesContainer: {
    width: "100%",
  },
  expenseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 4,
  },
  expenseDescription: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "JetBrainsMono-Bold",
  },
  centerLabel: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerLabelText: {
    fontSize: 12,
    color: colors.dark,
    fontFamily: "JetBrainsMono-Regular",
    textAlign: "center",
  },
});