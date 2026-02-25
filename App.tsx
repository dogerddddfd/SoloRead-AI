import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { initAllDatabases, getBooks, insertBook } from './src/database';

export default function App() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 初始化数据库并获取测试数据
    const loadData = async () => {
      try {
        await initAllDatabases();

        // 插入测试书籍
        await insertBook('1', 'Test Book', 'English Learning');

        // 获取所有书籍
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SoloRead AI</Text>
      <Text style={styles.subtitle}>Database Test</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.dataContainer}>
          <Text style={styles.dataTitle}>Books:</Text>
          {books.map((book) => (
            <View key={book.id} style={styles.dataItem}>
              <Text>Title: {book.title}</Text>
              <Text>Topic: {book.topic}</Text>
              <Text>Created At: {new Date(book.created_at).toLocaleString()}</Text>
            </View>
          ))}
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});