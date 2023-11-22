import React from "react";
import { StyleSheet } from "react-native";

const StyleContext = StyleSheet.create({
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
  
  export default StyleContext