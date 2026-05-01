import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);

  const API = 'http://localhost:3000'; // will fix below

  const fetchItems = async () => {
    const res = await fetch(`${API}/items`);
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch(`${API}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item, date }),
    });

    setItem('');
    setDate('');
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Expiry Tracker</Text>

      <TextInput placeholder="Item" value={item} onChangeText={setItem} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />

      <Button title="Add" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(i: any) => i.id.toString()}
        renderItem={({ item }: any) => (
          <Text>{item.item} - {item.date}</Text>
        )}
      />
    </View>
  );
}