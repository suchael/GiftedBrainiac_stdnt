import React, {useState} from 'react';
import {StyleSheet, 
				Text, View, 
				SafeAreaView, StatusBar, 
				ScrollView, TouchableOpacity,
				
				} from 'react-native';
				
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Icons
import { Ionicons , FontAwesome } from '@expo/vector-icons';

// My import
import PaymentHistory from "./src/PaymentHistory.js";
import PayNow from "./src/PayNow.js";


const Stack = createNativeStackNavigator();
function App(){
	return(
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home' >
				<Stack.Screen name = "Home" component={Home} options={{headerShown: false, }}/>
				<Stack.Screen name = "PaymentHistory" component={PaymentHistory} options={{ title: 'Payment History' }}/>
				<Stack.Screen name = "PayNow" component={PayNow} options={{ title: 'Pay Now' }}/>
			 </Stack.Navigator>
		</NavigationContainer>
	);
}


const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
    	<StatusBar backgroundColor="lightgray" barStyle="light-content" />
    	<Header/>
    	<Main/>
    </SafeAreaView>
  );
};

function Header(){
	return(
		<View style ={styles.header}>
			<Text style={{fontSize: 21, fontWeight: "600"}}>Gifted Brainiac Tutor </Text>
			<Text style={{fontSize: 19, fontWeight: "500"}}>Gb Tut </Text>
		</View>
	)
}

function Main(){
	const msg = "No payment, No class activity. \nPlease pay your lesson fees between the first 2 days of every month or you risk being sent home."
	const month = "\nJANUARY"
	return(
		<ScrollView >
			<View style ={styles.main}>
				<Text style={{fontSize: 19, fontWeight: "bold", color: "green"}}>
					Ahmed Success,{"\t"}<Text style={{fontSize: 16, fontWeight: "500", color: "black"}}>Welcome</Text>
				</Text>
				<View style ={{flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#888", backgroundColor: "lightgray", padding: 8, marginVertical: 25}}>
					<Text style={{fontSize: 17, fontWeight: "bold", color: "black"}}>
						Note:{"\t"}<Text style={{fontSize: 16, fontWeight: "500", color: "black",}}>{msg}</Text>
					</Text>
				</View>
				<View style = {{justifyContent: "center", alignItems: "center", }}>
					<Text style={{fontSize: 16, fontWeight: "600", color: "black", textAlign: "center"}}>
						Have you paid for the month of {month}?
					</Text>
					<YesButton month ={month}/>
				</View>
				<UserBtn/>
			</View>
		</ScrollView>
	)
}


function YesButton({month}) {
  const [isYes, setIsYes] = useState(true);

  const handlePress = () => {
    console.log(isYes ? 'Paid' : 'Not Paid');
    setIsYes(!isYes);
  };

  return (
  <View style = {{justifyContent: "center", alignItems: "center", }}>
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'lightgray',
        borderRadius: 15,
        borderWidth: 4,
        borderColor: isYes ? 'green' : 'red', // Change border color based on state
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,
      }}
    >
  		    <Ionicons
 		       name={isYes ? 'checkmark-circle' : 'close-circle'} // Change icon based on state
      		  size={40}
  		      color={isYes ? 'green' : 'red'} // Change icon color based on state
  		    />
 		     <Text
     		   style={{
   		       fontSize: 25,
     		     fontWeight: '600',
   		       color: isYes ? 'green' : 'red', // Change text color based on state
      		    textAlign: 'center',
       		 }}
   		   >
       		 {isYes ? 'YES!' : 'NO!'}
     		 </Text>
    		</TouchableOpacity>
    		<Text style ={{textAlign: "center", color: isYes? "green": "red", fontWeight: "bold", fontSize: 17}}>
      		{isYes? "You've paid for": "You've Not paid for"} {month} 
        	</Text>
      </View>
  );
}




function UserBtn() {
  const numberOfButtons = 3;
  const navigation = useNavigation();

  const buttonTexts = ["I want to pay", "Payment history", "Contact us"];

  const onPressHandler = (index) => {
    // Define your navigation logic for each button here
    switch (index) {
      case 0:
        navigation.navigate('PayNow');
        break;
      case 1:
        navigation.navigate('PaymentHistory');
        break;
      case 2:
        navigation.navigate('ContactScreen');
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ marginHorizontal: -15, paddingHorizontal: 15, borderTopWidth: 3, borderColor: "gray", marginTop: 20, paddingVertical: 15 }}>
      {Array.from({ length: numberOfButtons }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressHandler(index)}
          style={{ borderWidth: 2, borderColor: "lightgray", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 8, borderRadius: 15, marginBottom: 10 }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500" }}>
            {buttonTexts[index]}
          </Text>
          <FontAwesome name="angle-right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  main:{
  	paddingHorizontal: 15,
  	marginTop: 30,
  	paddingBottom: 50,
  	flex:1,
  
  },
});

export default App;