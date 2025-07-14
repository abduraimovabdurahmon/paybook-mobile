import colors from "@/constants/Colors";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function IncomeStatistics() {
  // Chart data adapted for react-native-gifted-charts
  const chartData = [
    {
      value: 7500000,
      text: "Oylik ish haqqi",
      color: colors.primary,
    },
    {
      value: 2500000,
      text: "Freelance",
      color: colors.green,
    },
    {
      value: 1200000,
      text: "Investitsiya",
      color: colors.blue,
    },
    {
      value: 800000,
      text: "Sovg'a",
      color: colors.purple,
    },
    {
      value: 500000,
      text: "Boshqa",
      color: colors.orange,
    },
  ];

  const totalIncome = chartData.reduce((sum, item) => sum + item.value, 0);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Daromadlar taqsimoti</Text>

          <View style={styles.chartWrapper}>
            <PieChart
              data={chartData}
              donut
              radius={100}
              innerRadius={40}
              showValuesAsLabels={false}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerLabelText}>
                    Jami: {totalIncome.toLocaleString()} so'm
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={styles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: item.color }]}
                />
                <Text style={styles.legendText}>
                  {item.text}: {((item.value /

 totalIncome) * 100).toFixed(0)}%
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totalIncomeContainer}>
            <Text style={styles.totalIncomeText}>Jami daromad:</Text>
            <Text style={styles.totalIncomeAmount}>
              {totalIncome.toLocaleString()} so'm
            </Text>
          </View>
        </View>

        {/* Income categories remain unchanged */}
        <View style={styles.categoriesContainer}>
          <View style={styles.incomeCard}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.primary }]}
            >
              <MaterialIcons name="work" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.incomeTitle}>Oylik ish haqqi</Text>
              <Text style={styles.incomeDescription}>
                Oylik va mukofot pullari
              </Text>
            </View>
            <Text style={[styles.incomeAmount, { color: colors.green }]}>
              +7,500,000 so'm
            </Text>
          </View>

          <View style={styles.incomeCard}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.green }]}
            >
              <FontAwesome name="laptop" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.incomeTitle}>Freelance ishlar</Text>
              <Text style={styles.incomeDescription}>
                Loyiha va konsultatsiyalar
              </Text>
            </View>
            <Text style={[styles.incomeAmount, { color: colors.green }]}>
              +2,500,000 so'm
            </Text>
          </View>

          <View style={styles.incomeCard}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.blue }]}
            >
              <MaterialIcons
                name="trending-up"
                size={24}
                color={colors.white}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.incomeTitle}>Investitsiya daromadi</Text>
              <Text style={styles.incomeDescription}>Dividend va foizlar</Text>
            </View>
            <Text style={[styles.incomeAmount, { color: colors.green }]}>
              +1,200,000 so'm
            </Text>
          </View>

          <View style={styles.incomeCard}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.purple }]}
            >
              <Ionicons name="gift" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.incomeTitle}>Sovg'alar</Text>
              <Text style={styles.incomeDescription}>
                Tug'ilgan kun va bayramlar
              </Text>
            </View>
            <Text style={[styles.incomeAmount, { color: colors.green }]}>
              +800,000 so'm
            </Text>
          </View>

          <View style={styles.incomeCard}>
            <View
              style={[styles.iconContainer, { backgroundColor: colors.orange }]}
            >
              <MaterialIcons
                name="attach-money"
                size={24}
                color={colors.white}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.incomeTitle}>Boshqa daromadlar</Text>
              <Text style={styles.incomeDescription}>
                Qaytarilgan qarz va boshqalar
              </Text>
            </View>
            <Text style={[styles.incomeAmount, { color: colors.green }]}>
              +500,000 so'm
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
  totalIncomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
    width: "100%",
  },
  totalIncomeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
    fontFamily: "JetBrainsMono-Medium",
  },
  totalIncomeAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.green,
    fontFamily: "JetBrainsMono-Bold",
  },
  categoriesContainer: {
    width: "100%",
  },
  incomeCard: {
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
  incomeTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 4,
  },
  incomeDescription: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
  },
  incomeAmount: {
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