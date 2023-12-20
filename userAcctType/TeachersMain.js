import React from 'react';
import { View, Text, StyleSheet,FlatList, TouchableOpacity } from 'react-native';
// Icons
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export default function MyComponent(){
    const monthlyPaymentData = [
        { id: '1', week: 'Mon', subject: 'Phy/Chem', time: '4-6PM' },
        { id: '2', week: 'Tues', subject: 'Chem/Phy', time: '2-4PM' },
        { id: '3', week: 'Wed', subject: 'Phy/Chem', time: '4-6PM' },
        { id: '4', week: 'Thur', subject: 'Phy/Chem', time: '4-6PM' },
        { id: '5', week: 'Fri', subject: 'Phy/Chem', time: '4-6PM' },
      ];
      const renderMonthlyTableItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.rowText}>{item.week}</Text>
          <Text style={styles.rowText}>{item.subject}</Text>
          <Text style={styles.rowText}>{item.time}</Text>
        </View>
      );

  return (
    <View style={styles.container}>
      <Text style={styles.stdntCategory}>Mr Sucess, welcome</Text>
      {/* Monthly Table */}
      <Text style={styles.headerTitle}>Your timetable</Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Week</Text>
        <Text style={styles.headerText}>Subject</Text>
        <Text style={styles.headerText}>Time</Text>
      </View>
      <FlatList
        data={monthlyPaymentData}
        keyExtractor={(item) => item.id}
        renderItem={renderMonthlyTableItem}
      />
      <PaymentHistoryBtn/>
    </View>
  );
};



function PaymentHistoryBtn() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        onPress={()=>{navigation.navigate("TeacherPaymentHistoryBtn")}}
        style={{
          borderWidth: 2,
          borderColor: "lightgray",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 8,
          borderRadius: 15,
          marginVertical: 10,
          backgroundColor: "green",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
          Payment History
        </Text>
        <FontAwesome name="angle-right" size={24} color="white" />
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      stdntCategory: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "600",
        color: "green",
        textAlign: "center",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
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
