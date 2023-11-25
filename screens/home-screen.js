import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import PushNotification from 'react-native-push-notification';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cardBillDate, setCardBillDate] = useState("");
  const [inputDay, setInputDay] = useState('');
  const [notificationScheduled, setNotificationScheduled] = useState(false);

  useEffect(() => {
    // Cancel all existing notifications when the component mounts
    PushNotification.cancelAllLocalNotifications();

    // Set notificationScheduled to false when the component mounts
    setNotificationScheduled(false);

    return () => {
      // Cleanup logic when the component unmounts
      PushNotification.cancelAllLocalNotifications();
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  const handleAddCard = async () => {
    const newCard = {
      cardnumber: cardNumber,
      holdername: holderName,
      expirationdate: expirationDate,
      cardbilldate: cardBillDate,
    };

    let storedData = [];
    try {
      const storedDataJSON = await AsyncStorage.getItem("storedData");
      if (storedDataJSON) {
        storedData = JSON.parse(storedDataJSON);
      }
    } catch (error) {
      console.error("Error retrieving stored data:", error);
    }

    storedData.push(newCard);

    try {
      await AsyncStorage.setItem("storedData", JSON.stringify(storedData));
      console.log("Card data saved successfully");
    } catch (error) {
      console.error("Error saving card data:", error);
    }

    setCardNumber("");
    setHolderName("");
    setExpirationDate("");
    setCardBillDate("");

    // Schedule notifications when a new card is added
    scheduleNotifications(inputDay);

    navigation.navigate("MainScreen", { displayedData: storedData });
  };

  async function scheduleNotifications(day) {
    day = parseInt(day, 10);

    if (!isNaN(day) && day >= 1 && day <= 31) {
      console.log('Scheduled day:', day);

      const now = new Date();
      const targetDate = new Date(now.getFullYear(), now.getMonth(), day, 19, 24);

      console.log('Target Date:', targetDate);

      if (targetDate < now) {
        targetDate.setMonth(targetDate.getMonth() + 1);
      }

      console.log('Updated Target Date:', targetDate);

      if (targetDate instanceof Date && targetDate) {
        for (let i = 0; i < 5; i++) {
          const timeUntilNotification = targetDate - now;
          const secondsUntilNotification = Math.floor(timeUntilNotification / 1000);

          console.log(`Scheduled notification for the ${day} day of next month at ${targetDate}`);

          await PushNotification.localNotificationSchedule({
            message: `Reminder for the ${day} day of every month `,
            date: new Date(Date.now() + secondsUntilNotification * 1000),
            trigger: { seconds: secondsUntilNotification },
          });

          // Schedule for the next month
          targetDate.setMonth(targetDate.getMonth() + 1);
        }

        setNotificationScheduled(true);
      } else {
        Alert.alert('Invalid targetDate');
      }
    } else {
      Alert.alert('Please enter a valid day between 1 and 31.');
    }
  }

  const Duedate = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a day (1-31)"
            placeholderTextColor={styles.placeholder.color}
            keyboardType="numeric"
            value={inputDay}
            onChangeText={text => setInputDay(text)}
          />
        </View>
        
        {notificationScheduled && (
          <Text style={{ marginTop: 20, color: 'green' }}>
            Notifications for the {inputDay} day of every month have been
            scheduled!
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Enter Your Card Details</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCardNumber(text)}
          value={cardNumber}
          placeholder="Card Number"
          placeholderTextColor={styles.placeholder.color}
          keyboardType="numeric"
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/flat_round/40/000000/secured-letter.png",
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setHolderName(text)}
          value={holderName}
          placeholder="Card Holder Name"
          placeholderTextColor={styles.placeholder.color}
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/color/40/000000/circled-user-male-skin-type-3.png",
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setExpirationDate(text)}
          value={expirationDate}
          placeholder="Due Date"
          placeholderTextColor={styles.placeholder.color}
          keyboardType="numeric"
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/color/70/000000/to-do.png",
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCardBillDate(text)}
          value={cardBillDate}
          placeholder="Bill Date"
          placeholderTextColor={styles.placeholder.color}
          keyboardType="numeric"
        />
        <Image
          style={styles.inputIcon}
          source={{
            uri: "https://img.icons8.com/dusk/70/000000/visual-game-boy.png",
          }}
        />
      </View>

      <Duedate />

      <TouchableOpacity
        style={[styles.button, styles.successButton]}
        onPress={handleAddCard}
      >
        <Text style={styles.buttonText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "azure",
    width: "100%",
    height: 80,
    justifyContent: "center",
     borderRadius: 30,
   
  
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#808080",
    
  },
  placeholder: {
    color: 'black', // Set your desired color here
    fontStyle: 'italic', // You can add other styles as needed
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
    color:"black"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    flex: 1,
    color:"black",
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 30,
    borderWidth: 0.2,
    borderColor: "#eee",
    borderBottomWidth: 8,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  successButton: {
    backgroundColor: "steelblue",
    borderColor: "dodgerblue",
    shadowColor: "#3aa245",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default HomeScreen;
