import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../context/AuthContext"; // To access the user
import { addNote } from "../services/NoteService"; // Add note to Firebase

const CreateNoteScreen = ({ navigation }) => {
  const { user } = useAuth(); // Get user from context
  const [title, setTitle] = useState(""); // Note title state
  const [content, setContent] = useState(""); // Note content state

  // Save the note to Firebase
  const handleSaveNote = async () => {
    if (!title || !content) {
      Alert.alert("Error", "Both title and content are required!");
      return;
    }
    
    try {
      // Assuming 'addNote' handles the Firebase interaction to store notes
      await addNote(user.uid, { Title: title, Content: content });
      Alert.alert("Success", "Note saved successfully!");
      navigation.goBack(); // Go back to home screen after saving the note
    } catch (error) {
      Alert.alert("Error", "Failed to save the note. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Note</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <Icon name="pencil" size={20} color="#45b649" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter Note Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View style={styles.inputWithIcon}>
          <Icon name="file-text" size={20} color="#45b649" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter Note Content"
            placeholderTextColor="gray"
            value={content}
            multiline
            numberOfLines={6}
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "black",
    position: "relative",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  inputContainer: {
    margin: 20,
    paddingTop:15
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "yellow", // Soft border color
    borderRadius: 15, // Rounded corners for inputs
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "white", // White background for inputs
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "red",
    paddingLeft:5
  },
  textArea: {
    height: 300,
    textAlignVertical: "top",
    fontSize: 17,
  },
  saveButton: {
    backgroundColor: "#FF6347",
    borderRadius: 30, // Rounded corners
    paddingVertical: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CreateNoteScreen;
