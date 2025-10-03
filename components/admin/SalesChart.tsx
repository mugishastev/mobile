import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const chartWidth = width - 40;

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const SimpleBarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 120;
          
          return (
            <View key={index} style={styles.barContainer}>
              <Text style={styles.barValue}>{item.value}k</Text>
              <View style={styles.barWrapper}>
                <LinearGradient
                  colors={[item.color, `${item.color}80`]}
                  style={[styles.bar, { height: Math.max(barHeight, 10) }]}
                />
              </View>
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export function SalesChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const salesData = {
    week: [
      { label: 'Mon', value: 12, color: '#FFD700' },
      { label: 'Tue', value: 19, color: '#FFC107' },
      { label: 'Wed', value: 15, color: '#FFEB3B' },
      { label: 'Thu', value: 25, color: '#FFD700' },
      { label: 'Fri', value: 22, color: '#FFC107' },
      { label: 'Sat', value: 30, color: '#FFEB3B' },
      { label: 'Sun', value: 18, color: '#FFD700' },
    ],
    month: [
      { label: 'Week 1', value: 85, color: '#FFD700' },
      { label: 'Week 2', value: 120, color: '#FFC107' },
      { label: 'Week 3', value: 95, color: '#FFEB3B' },
      { label: 'Week 4', value: 140, color: '#FFD700' },
    ],
    year: [
      { label: 'Q1', value: 280, color: '#FFD700' },
      { label: 'Q2', value: 350, color: '#FFC107' },
      { label: 'Q3', value: 420, color: '#FFEB3B' },
      { label: 'Q4', value: 380, color: '#FFD700' },
    ],
  };

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
  ];

  const currentData = salesData[selectedPeriod as keyof typeof salesData];
  const totalSales = currentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.sectionTitle}>Sales Analytics</Text>
          <Text style={styles.totalSales}>${totalSales}k total sales</Text>
        </View>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period.key && styles.periodTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <LinearGradient
        colors={['#FFFDE7', '#FFF9C4']}
        style={styles.chartCard}
      >
        <SimpleBarChart data={currentData} />
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={16} color="#4CAF50" />
            <Text style={styles.statLabel}>Growth</Text>
            <Text style={styles.statValue}>+12.5%</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="calendar-outline" size={16} color="#FF9800" />
            <Text style={styles.statLabel}>Period</Text>
            <Text style={styles.statValue}>This {selectedPeriod}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="trophy-outline" size={16} color="#FFD700" />
            <Text style={styles.statLabel}>Best Day</Text>
            <Text style={styles.statValue}>
              {currentData.reduce((max, item) => item.value > max.value ? item : max).label}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalSales: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },
  periodButtonActive: {
    backgroundColor: '#FFD700',
  },
  periodText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  periodTextActive: {
    color: '#333',
    fontWeight: 'bold',
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barValue: {
    fontSize: 10,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barWrapper: {
    width: 20,
    justifyContent: 'flex-end',
    height: 120,
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.2)',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
  },
  statValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
});