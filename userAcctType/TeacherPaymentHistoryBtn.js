import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Calendar = () => {
  const monthsData = [
    {
      month: "January",
      weeks: [
        {
          id: "1",
          present: 2,
          status: "Paid",
          date: "2023-01-01",
          amount: 100,
        },
        {
          id: "2",
          present: 0,
          status: "Pending",
          date: "2023-01-08",
          amount: 150,
        },
        {
          id: "3",
          present: 1,
          status: "Paid",
          date: "2023-01-15",
          amount: 120,
        },
        {
          id: "4",
          present: 3,
          status: "Pending",
          date: "2023-01-22",
          amount: 90,
        },
      ],
    },
    {
      month: "February",
      weeks: [
        {
          id: "1",
          present: 1,
          status: "Paid",
          date: "2023-02-01",
          amount: 130,
        },
        {
          id: "2",
          present: 3,
          status: "Pending",
          date: "2023-02-08",
          amount: 110,
        },
        {
          id: "3",
          present: 0,
          status: "Paid",
          date: "2023-02-15",
          amount: 140,
        },
        {
          id: "4",
          present: 2,
          status: "Pending",
          date: "2023-02-22",
          amount: 95,
        },
      ],
    },
    {
      month: "March",
      weeks: [
        {
          id: "1",
          present: 3,
          status: "Paid",
          date: "2023-03-01",
          amount: 105,
        },
        {
          id: "2",
          present: 1,
          status: "Pending",
          date: "2023-03-08",
          amount: 125,
        },
        {
          id: "3",
          present: 2,
          status: "Paid",
          date: "2023-03-15",
          amount: 115,
        },
        {
          id: "4",
          present: 0,
          status: "Pending",
          date: "2023-03-22",
          amount: 100,
        },
      ],
    },
    // Add data for other months as needed
  ];

  const renderTableItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRowClick(item)} style={styles.btn}>
      <View style={styles.tableRow}>
        <Text style={styles.tableCell}>{`Week ${item.id}`}</Text>
        <Text style={styles.tableCell}>{item.present}</Text>
        <Text
          style={[
            styles.tableCell,
            { color: item.status == "Paid" ? "green" : "red" },
          ]}
        >
          {item.status}
        </Text>
        <Text style={styles.tableCell}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleRowClick = (rowData) => {
    alert(`You were paid ₦${rowData.amount} on ${rowData.date}`)
    console.log("Clicked on row:", rowData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={monthsData}
        keyExtractor={(item) => item.month}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.monthTitle}>{item.month}</Text>
            <View style={styles.tableRow}>
              <Text
                style={[styles.tableCell, { fontWeight: "600", fontSize: 17 }]}
              >
                Week
              </Text>
              <Text
                style={[styles.tableCell, { fontWeight: "600", fontSize: 17 }]}
              >
                Present
              </Text>
              <Text
                style={[styles.tableCell, { fontWeight: "600", fontSize: 17 }]}
              >
                Status
              </Text>
              <Text
                style={[styles.tableCell, { fontWeight: "600", fontSize: 17 }]}
              >
                Date
              </Text>
            </View>
            <FlatList
              data={item.weeks}
              keyExtractor={(week) => week.id}
              renderItem={renderTableItem}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 30,
    paddingHorizontal: 16, 
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  btn: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 2,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tableCell: {
    flex: 1,
    alignItems: "center",
    fontSize: 16,
  },
});

export default Calendar;
