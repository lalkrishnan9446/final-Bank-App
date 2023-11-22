import React, {useState} from 'react';
import {View, Text, Button,StyleSheet, TextInput} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';
//import { PushNotification } from 'react-native';
//console.log('push', PushNotification);
async function scheduleNotifications(day, setNotificationScheduled) {
  day = parseInt(day, 10); // Specify base 10

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
      const timeUntilNotification = targetDate - now;
      const secondsUntilNotification = Math.floor(timeUntilNotification / 1000);

      await PushNotification.localNotificationSchedule({
        message: `Reminder for the ${day} day of every month `,
        date: new Date(Date.now() + secondsUntilNotification * 1000),
        trigger: {seconds: secondsUntilNotification},
      });

      setNotificationScheduled(true);
    } else {
      Alert.alert('Invalid targetDate');
    }
  } else {
    Alert.alert('Please enter a valid day between 1 and 31.');
  }
}

const Duedate = () => {
  const [inputDay, setInputDay] = useState('');
  const [notificationScheduled, setNotificationScheduled] = useState(false);

  return (
    <View>
          <View style={styles.inputContainer}>
      <Text>Due NotificationsDay</Text>
      <TextInput
        placeholder="Enter a day (1-31)"
        keyboardType="numeric"
        value={inputDay}
        onChangeText={text => setInputDay(text)}
      />
      </View>
      <Button
        title="Schedule a custom notification"
        onPress={() =>
          scheduleNotifications(inputDay, setNotificationScheduled)
        }
      />
      {notificationScheduled && (
        <Text style={{marginTop: 20, color: 'green'}}>
          Notifications for the {inputDay} day of every month have been
          scheduled!
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
  }
})

export default Duedate;
