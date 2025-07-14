import HeaderComponent from '@/components/HeaderComponent'
import StatisticsView from '@/components/statistics/StatisticsView'
import colors from '@/constants/Colors'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function index() {
  return (
    <View style={styles.root}>
      <HeaderComponent />
      {/* Statistics komponenti */}
      <StatisticsView />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
})