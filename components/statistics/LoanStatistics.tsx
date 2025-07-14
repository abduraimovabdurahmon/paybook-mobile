import colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

export default function LoanStatistics() {
  // Chart data adapted for react-native-gifted-charts
  const chartData = [
    {
      value: 2450000,
      text: "Qarz oldim",
      color: colors.red,
    },
    {
      value: 1750000,
      text: "Qarz berdim",
      color: colors.green,
    },
  ];

  const totalOwed = 2450000; // Qarz oldim
  const totalLent = 1750000; // Qarz berdim
  const netBalance = totalLent - totalOwed; // Net balance
  const totalAmount = totalOwed + totalLent; // For percentage calculations
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Qarzlar taqsimoti</Text>
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
                    Sof balans: {netBalance >= 0 ? '+' : ''}{netBalance.toLocaleString()} so'm
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
                  {item.text}: {((item.value / totalAmount) * 100).toFixed(0)}%
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totalBalanceContainer}>
            <Text style={styles.totalBalanceText}>Sof qarz balansi:</Text>
            <Text
              style={[
                styles.totalBalanceAmount,
                { color: netBalance >= 0 ? colors.green : colors.red },
              ]}
            >
              {netBalance >= 0 ? '+' : ''}{netBalance.toLocaleString()} so'm
            </Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <View style={styles.loanCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.red }]}>
              <Ionicons name="arrow-down-circle" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.loanTitle}>Qarz oldim</Text>
              <Text style={styles.loanDescription}>Boshqalardan olingan qarzlar</Text>
            </View>
            <Text style={[styles.loanAmount, { color: colors.red }]}>
              -{totalOwed.toLocaleString()} so'm
            </Text>
          </View>

          <View style={styles.loanCard}>
            <View style={[styles.iconContainer, { backgroundColor: colors.green }]}>
              <Ionicons name="arrow-up-circle" size={24} color={colors.white} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.loanTitle}>Qarz berdim</Text>
              <Text style={styles.loanDescription}>Boshqalarga berilgan qarzlar</Text>
            </View>
            <Text style={[styles.loanAmount, { color: colors.green }]}>
              +{totalLent.toLocaleString()} so'm
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
  totalBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.gray + "20",
    width: "100%",
  },
  totalBalanceText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
    fontFamily: "JetBrainsMono-Medium",
  },
  totalBalanceAmount: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "JetBrainsMono-Bold",
  },
  categoriesContainer: {
    width: "100%",
  },
  loanCard: {
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
  loanTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.dark,
    fontFamily: "JetBrainsMono-Medium",
    marginBottom: 4,
  },
  loanDescription: {
    fontSize: 10,
    color: colors.gray,
    fontFamily: "JetBrainsMono-Regular",
  },
  loanAmount: {
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