import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../context/AuthContext";
import { database } from "../services/FirebaseConfig";
import { ref, onValue, remove } from "firebase/database";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Fetch notes from Firebase
  useEffect(() => {
    if (user) {
      const notesRef = ref(database, `Users/${user.uid}/Notes`);
      onValue(notesRef, (snapshot) => {
        const data = snapshot.val();
        const notesArray = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setNotes(notesArray);
        setFilteredNotes(notesArray);
      });
    }
  }, [user]);

  // Search logic: filter notes by title or content
  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.Content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("LoginScreen");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  // Delete note from Firebase
  const handleDeleteNote = (noteId) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const noteRef = ref(database, `Users/${user.uid}/Notes/${noteId}`);
            remove(noteRef)
              .then(() => {
                Alert.alert("Success", "Note deleted successfully.");
              })
              .catch(() => {
                Alert.alert("Error", "Failed to delete note. Please try again.");
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Notes</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search by title or content..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        key={2}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color || "#fff" }]}
            onPress={() => navigation.navigate("EditNoteScreen", { note: item })}
            onLongPress={() => handleDeleteNote(item.id)}
          >
            <View style={styles.cardHeader}>
              <Text numberOfLines={1} style={styles.cardTitle}>
                {item.Title}
              </Text>
            </View>
            <Text numberOfLines={2} style={styles.cardContent}>
              {item.Content}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateNoteScreen")}
      >
        <Icon name="plus" size={30} color="white" />
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "black",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 15,
    backgroundColor: "#C6FFDD",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    height: 130,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    maxWidth: "45%",
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "white",
  },
  cardContent: {
    fontSize: 14,
    color: "white",
    lineHeight: 18,
  },
  flatListContent: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    marginLeft: -35,
    width: 70,
    height: 70,
    backgroundColor: "#f64f59",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default HomeScreen;
