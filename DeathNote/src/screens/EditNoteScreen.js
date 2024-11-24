import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native"; // Get the route params
import { updateNote, deleteNote } from "../services/NoteService"; // Services for note operations
import { auth } from "../services/FirebaseConfig"; // Import Firebase Auth to get user ID

const EditNoteScreen = ({ navigation }) => {
  const route = useRoute(); // Get the note passed from HomeScreen
  const { note } = route.params; // Destructure note data
  const [title, setTitle] = useState(note.Title); // Initial title from passed note
  const [content, setContent] = useState(note.Content); // Initial content from passed note

  const uid = auth.currentUser?.uid; // Get the user ID from Firebase Authentication

  // Update the note in Firebase
  const handleUpdateNote = async () => {
    if (!title || !content) {
      Alert.alert("Error", "Both title and content are required!");
      return;
    }

    if (!uid) {
      Alert.alert("Error", "User is not authenticated.");
      return;
    }

    try {
      await updateNote(uid, note.id, { Title: title, Content: content });
      Alert.alert("Success", "Note updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update the note. Please try again.");
    }
  };

  // Delete the note from Firebase
  const handleDeleteNote = async () => {
    if (!uid) {
      Alert.alert("Error", "User is not authenticated.");
      return;
    }

    try {
      await deleteNote(uid, note.id);
      Alert.alert("Success", "Note deleted successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to delete the note. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Note</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteNote}
        >
          <Icon name="trash" size={30} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <Icon name="pencil" size={20} color="#45b649" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Edit Note Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View style={styles.inputWithIcon}>
          <Icon name="file-text" size={20} color="#45b649" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Edit Note Content"
            placeholderTextColor="gray"
            value={content}
            multiline
            numberOfLines={6}
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateNote}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Soft background color
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "black", // Clean white background
    position: "relative",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    flex: 1,
  },
  deleteButton: {
    position: "absolute",
    right: 15,
  },
  inputContainer: {
    margin: 20,
    paddingTop: 15,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "yellow", // Soft border color
    borderRadius: 15, // Rounded corners for inputs
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff", // White background for inputs

  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: "red",
    paddingLeft: 5,
  },
  textArea: {
    height: 300, // Increase height for better visibility
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
    elevation: 4, // Elevation to make it pop
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default EditNoteScreen;
