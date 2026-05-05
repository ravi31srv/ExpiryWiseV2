import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, Platform, StyleSheet } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);

  // Use 10.0.2.2 for Android Emulator, localhost for iOS/Web. 
  // If testing on a physical device, change this to your computer's local IP (e.g., http://192.168.1.x:3000)
  const API = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API}/items`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const addItem = async () => {
    if (!item.trim()) {
      Alert.alert('Invalid Input', 'Item name cannot be empty.');
      return;
    }

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateRegex.test(date)) {
      Alert.alert('Invalid Date', 'Date must be in YYYY-MM-DD format.');
      return;
    }

    try {
      const res = await fetch(`${API}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, date }),
      });

      const responseData = await res.json();
      if (!res.ok) {
        Alert.alert('Error', responseData.error || 'Failed to add item');
        return;
      }

      setItem('');
      setDate('');
      fetchItems();
    } catch (error) {
      console.error('Add item error:', error);
      Alert.alert('Network Error', 'Failed to connect to the server. Check if backend is running.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const calculateDaysLeft = (expiryDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expiryDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusInfo = (date: string) => {
    const daysLeft = calculateDaysLeft(date);
    console.log({ daysLeft })
    if (daysLeft < 0) return { text: 'Expired', color: 'red' };
    if (daysLeft <= 3) return { text: 'Expiring Soon', color: 'orange' };
    return { text: 'Safe', color: 'green' };
  };

  const sortedItems = [...items].sort((a: any, b: any) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expiry Tracker</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Item Name"
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <Button title="Add Item" onPress={addItem} />
      </View>

      <FlatList
        data={sortedItems}
        keyExtractor={(i: any) => i.id.toString()}
        renderItem={({ item }: any) => {
          const status = getStatusInfo(item.date);
          return (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.itemName}>{item.item}</Text>
                <Text style={styles.itemDate}>Expires: {item.date}</Text>
              </View>
              <Text style={[styles.statusText, { color: status.color }]}>
                {status.text}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDate: {
    color: '#666',
    marginTop: 4,
  },
  statusText: {
    fontWeight: 'bold',
  },
});