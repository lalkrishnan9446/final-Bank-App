import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";

const CardItem = ({ item, onDelete }) => (
  <View style={styles.cardItem}>
    <Text style={styles.cardNumber}>Card Number: {item.cardnumber}</Text>
    <Text style={styles.cardInfoValue}>Card Holder Name: {item.holdername}</Text>
    <Text style={styles.cardInfoValue}>Due Date: {item.expirationdate}</Text>
    <Text style={styles.cardInfoValue}>Bill Date: {item.cardbilldate}</Text>
    <TouchableOpacity onPress={() => onDelete(item)} style={styles.deleteButton}>
      <Image
        style={styles.inputIcon}
        source={{
          uri: "https://img.icons8.com/color/70/000000/shutdown.png",
        }}
      />
    </TouchableOpacity>
  </View>
);

const MainScreen = ({ route }) => {
  const [cardData, setCardData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getCardData = async () => {
    try {
      const storedDataJSON = await AsyncStorage.getItem("storedData");
      if (storedDataJSON) {
        const storedData = JSON.parse(storedDataJSON);
        setCardData(storedData);
      }
    } catch (error) {
      console.error("Error retrieving stored data:", error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.navigate("HomeScreen");
  };

  const deleteCard = (cardToDelete) => {
    const updatedCardData = cardData.filter((item) => item !== cardToDelete);
    setCardData(updatedCardData);
    AsyncStorage.setItem("storedData", JSON.stringify(updatedCardData));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCardData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup function, called when the component is unmounted
      console.log("MainScreen component unmounted");
      // You can perform additional cleanup here if needed
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Credit Card</Text>
      </View>
      <FlatList
        data={cardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardItem item={item} onDelete={deleteCard} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity onPress={navigateToHomeScreen} style={styles.addButton}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

MainScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  cardItem:  {
    marginHorizontal: 10,
    backgroundColor: "lightsteelblue",
    width: 300,
    height: 180,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: "powderblue",
    borderBottomWidth: 6,
    borderBottomColor: "#ccc",
  },
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "aliceblue",
    width: "100%",
    height: 80,
    justifyContent: "center",
    borderRadius: 10,


    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#808080",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
  },
  inputIcon: {
    width: 30,
    height: 30,
    bottom: 3,
    marginRight: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "steelblue",
    borderColor: "dodgerblue",

    borderRadius: 60,

    alignItems: "center",

    borderWidth: 2,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addText: {
    fontSize: 30,
    color: "#C0C0C0",
  },
  cardInfoValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardNumber: {
    fontSize: 18,
    letterSpacing: 4,
    marginBottom: 10,
  },
  deleteButton: {
  
      backgroundColor: "mediumvioletred",
    
     
      width: 50,
      height: 50,
    padding: 10,
   
    marginTop: 10,
    position: "absolute",
    bottom: 20,
    right: 20,
   
    
   
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: "violet",
     shadowColor: "#3aa245",
    borderBottomWidth: 6,


  },
  buttonText: {
    color: "#FFFFFF", // White text for buttons
    textAlign: "center",
  },

});

export default MainScreen;
