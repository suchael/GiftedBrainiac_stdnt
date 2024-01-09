import React from 'react';
import { View, ScrollView  } from 'react-native';
import { Table, Row } from 'react-native-table-component';

const PaymentHistoryTable = ({ studentPaymentHistory }) => {
  const tableHead = ['Payment Type', 'Amount Paid', 'Payment Date', 'Expiration Date'];
  const tableData = studentPaymentHistory.map((payment) => [
    payment.paymentType,
    `$${payment.amountPaid}`,
    payment.paymentDate,
    payment.expirationDate,
  ]);

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
        <Row data={tableHead} style={{ height: 70, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6, fontSize: 16, fontWeight: 'bold' }} />
      </Table>
      <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }}>
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={rowData}
            style={{
              height: 56,
              backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
            }}
            textStyle={{ margin: 6, textAlign: 'center' }}
          />
        ))}
      </Table>
    </View>
  );
};

const MyPaymentHistoryScreen = () => {
  const myPaymentHistory = [
    { paymentType: 'Monthly', amountPaid: 100, paymentDate: '2023-01-01', expirationDate: '2023-02-01' },
    { paymentType: 'Monthly', amountPaid: 100, paymentDate: '2023-02-01', expirationDate: '2023-03-01' },
    { paymentType: 'Monthly', amountPaid: 100, paymentDate: '2023-03-01', expirationDate: '2023-04-01' },
    { paymentType: 'Daily', amountPaid: 20, paymentDate: '2023-05-03', expirationDate: '2023-05-03' },
    { paymentType: 'Daily', amountPaid: 20, paymentDate: '2023-05-03', expirationDate: '2023-05-03' },
    { paymentType: 'Daily', amountPaid: 20, paymentDate: '2023-05-03', expirationDate: '2023-05-03' },
    { paymentType: 'Daily', amountPaid: 20, paymentDate: '2023-05-03', expirationDate: '2023-05-03' },
  ];

  return (
    <ScrollView  style={{ flex: 1 }}>
      <PaymentHistoryTable studentPaymentHistory={myPaymentHistory} />
    </ScrollView >
  );
};

export default MyPaymentHistoryScreen;
