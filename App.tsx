import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  MD3DarkTheme,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ShoppingItem = {
  id: string;
  product: string;
  amount: string;
};

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FF922B",
    onPrimary: "#1A1027",
    secondary: "#C084FC",
    background: "#120D1D",
    surface: "#21162F",
    surfaceVariant: "#33243F",
    onSurface: "#FFF6EA",
    onSurfaceVariant: "#D6C6E1",
    outline: "#765A80",
  },
};

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItem = () => {
    if (!product.trim() || !amount.trim()) {
      return;
    }

    const newItem: ShoppingItem = {
      id: Date.now().toString() + Math.random().toString(),
      product: product.trim(),
      amount: amount.trim(),
    };

    setItems((previousItems) => [...previousItems, newItem]);

    setProduct("");
    setAmount("");
  };

  const deleteItem = (id: string) => {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
            ListHeaderComponent={
              <View>
                <Text style={styles.emoji}>🎃</Text>

                <Text variant="headlineMedium" style={styles.title}>
                  Halloween-ostoslista
                </Text>

                <Text variant="bodyMedium" style={styles.subtitle}>
                  Lisää ostoksesi noitakattilaan!
                </Text>

                <Card style={styles.formCard}>
                  <Card.Content>
                    <TextInput
                      placeholder="Mitä ostat?"
                      accessibilityLabel="Tuotteen nimi"
                      value={product}
                      onChangeText={setProduct}
                      mode="outlined"
                      style={styles.input}
                      outlineColor="#765A80"
                      activeOutlineColor="#FF922B"
                      left={<TextInput.Icon icon="tag-outline" color="#FF922B" />}
                    />

                    <TextInput
                      placeholder="Kuinka paljon? esim. 2 kg"
                      accessibilityLabel="Tuotteen määrä"
                      value={amount}
                      onChangeText={setAmount}
                      mode="outlined"
                      style={styles.input}
                      outlineColor="#765A80"
                      activeOutlineColor="#FF922B"
                      left={<TextInput.Icon icon="numeric" color="#FF922B" />}
                    />

                    <Button
                      mode="contained"
                      icon="plus"
                      onPress={addItem}
                      disabled={!product.trim() || !amount.trim()}
                      style={styles.addButton}
                      labelStyle={styles.buttonText}
                    >
                      Lisää ostoslistaan
                    </Button>
                  </Card.Content>
                </Card>

                <View style={styles.listHeader}>
                  <Text variant="titleLarge" style={styles.listTitle}>
                    🦇 Ostokset
                  </Text>

                  <Text style={styles.count}>{items.length} tuotetta</Text>
                </View>
              </View>
            }
            renderItem={({ item }) => (
              <Card style={styles.itemCard}>
                <Card.Content style={styles.itemContent}>
                  <View style={styles.itemDetails}>
                    <Text variant="titleMedium" style={styles.productName}>
                      {item.product}
                    </Text>

                    <Text variant="bodyMedium" style={styles.amount}>
                      {item.amount}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => deleteItem(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Poista ${item.product}`}
                    hitSlop={10}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteText}>X</Text>
                  </Pressable>
                </Card.Content>
              </Card>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>🕸️</Text>

                <Text variant="bodyLarge" style={styles.emptyText}>
                  Ostoslista on vielä tyhjä
                </Text>
              </View>
            }
          />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120D1D",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emoji: {
    fontSize: 48,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    color: "#FF922B",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#C9B8D7",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  formCard: {
    backgroundColor: "#21162F",
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#493254",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#21162F",
  },
  addButton: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 5,
  },
  buttonText: {
    fontWeight: "bold",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  listTitle: {
    color: "#FF922B",
    fontWeight: "bold",
  },
  count: {
    color: "#C9B8D7",
  },
  itemCard: {
    backgroundColor: "#21162F",
    marginBottom: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#493254",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    color: "#FFF6EA",
    fontWeight: "bold",
  },
  amount: {
    color: "#C9B8D7",
    marginTop: 4,
  },
  deleteButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "#FF6B6B",
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyEmoji: {
    fontSize: 45,
    marginBottom: 12,
  },
  emptyText: {
    color: "#A998B8",
  },
});
