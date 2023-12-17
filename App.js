import React, {useState} from 'react';
import {StyleSheet, 
				Text, View, 
				SafeAreaView, StatusBar, 
				ScrollView, TouchableOpacity,
				
				} from 'react-native';

import { Ionicons } from '@expo/vector-icons';



const App = () => {
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
		<ScrollView contentContainerStyle={{flex: 1}}>
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