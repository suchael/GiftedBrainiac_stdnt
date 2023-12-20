import React, { useContext } from "react";
import ReactContext from "./Context/ReactContext.js";
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PaymentHistory = () => {
  const {stdntSession, stdntPayment} = useContext(ReactContext)

  const monthlyPaymentData = [
    { id: '1', month: 'January', status: 'Paid', date: '2023-01-15' },
    { id: '2', month: 'February', status: 'Pending', date: '2023-02-22' },
    { id: '3', month: 'March', status: 'Paid', date: '2023-02-22' },
  ];

  const weeklyPaymentData = [
    { id: '1', week: '2023-01-15 \nto \n2023-01-22', status: 'Paid' },
    { id: '2', week: '2023-01-15 \nto \n2023-01-22', status: 'Pending' },
  ];
  const dailyPaymentData = [
    { id: '1', day: 'Fri - 2023-01-15', status: 'Paid' },
    { id: '2', day: 'Sat - 2023-02-15', status: 'Pending' },
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
  const renderDailyTableItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item.day}</Text>
      <Text style={styles.rowText}>{item.status}</Text>
    </View>
  );

  return (

    <View style={styles.container}>
      <Text style={styles.stdntCategory}>Monthly - {stdntPayment.monthlyPayment} ({stdntSession})</Text>
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
      <Text style={styles.stdntCategory}>Weekly - {stdntPayment.weeklyPayment} ({stdntSession})</Text>
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

      {/* Daily Table */}
      <Text style={styles.stdntCategory}>Daily - {stdntPayment.dailyPayment} ({stdntSession})</Text>
      <Text style={styles.headerTitle}>Daily Payment</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Daily</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <FlatList
        data={dailyPaymentData}
        keyExtractor={(item) => item.id}
        renderItem={renderDailyTableItem}
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
