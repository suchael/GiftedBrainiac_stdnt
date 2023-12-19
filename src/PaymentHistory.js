import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PaymentHistory = () => {
  const monthlyPaymentData = [
    { id: '1', month: 'January', status: 'Paid', date: '2023-01-15' },
    { id: '2', month: 'February', status: 'Pending', date: '2023-02-22' },
    { id: '3', month: 'March', status: 'Paid', date: '2023-02-22' },
    // Add more monthly data as needed
  ];

  const weeklyPaymentData = [
    { id: '4', week: '2023-01-15 \nto \n2023-01-22', status: 'Paid' },
    { id: '5', week: '2023-01-15 \nto \n2023-01-22', status: 'Pending' },
    // Add more weekly data as needed
  ];

  const renderMonthlyTableItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item.month}</Text>
      <Text style={styles.rowText}>{item.status}</Text>
      <Text style={styles.rowText}>{item.date}</Text>
    </View>
  );

  const renderWeeklyTableItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item.week}</Text>
      <Text style={styles.rowText}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.stdntCategory}>Hybrid session - ₦11,000 (Monthly)</Text>
      {/* Monthly Table */}
      <Text style={styles.headerTitle}>Monthly Payment</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Month</Text>
        <Text style={styles.headerText}>Status</Text>
        <Text style={styles.headerText}>Payment Date</Text>
      </View>
      <FlatList
        data={monthlyPaymentData}
        keyExtractor={(item) => item.id}
        renderItem={renderMonthlyTableItem}
      />

      {/* Weekly Table */}
      <Text style={styles.headerTitle}>Weekly Payment</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Week</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <FlatList
        data={weeklyPaymentData}
        keyExtractor={(item) => item.id}
        renderItem={renderWeeklyTableItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  stdntCategory: {
  	marginBottom: 10,
  	fontSize: 18,
  	fontWeight: "600",
  	color: "green",
  	textAlign: "center",
  },
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    
  },
  rowText: {
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
});

export default PaymentHistory;
