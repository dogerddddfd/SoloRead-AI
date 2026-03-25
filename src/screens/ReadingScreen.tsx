import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ReadingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.sideButton}>
          <Text style={styles.sideButtonText}>侧边</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>新聊天</Text>
        <View style={styles.headerRight} />
      </View>

      {/* 中间内容区域 */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddArticle')}>
          <Text style={styles.cardText}>还没有文章记录，点击创建</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sideButton: {
    // padding: 8,
  },
  sideButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
