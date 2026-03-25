import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

export default function AddArticleScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>新增文章</Text>
        <View style={styles.headerRight} />
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        {/* 词汇量选项 */}
        <View style={styles.optionCard}>
          <Text style={styles.optionLabel}>词汇量</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>下拉框</Text>
          </TouchableOpacity>
        </View>

        {/* 话题选项 */}
        <View style={styles.optionCard}>
          <Text style={styles.optionLabel}>话题</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>下拉框</Text>
          </TouchableOpacity>
        </View>

        {/* 章节数选项 */}
        <View style={styles.optionCard}>
          <Text style={styles.optionLabel}>章节数</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>下拉框</Text>
          </TouchableOpacity>
        </View>

        {/* 章节字数选项 */}
        <View style={styles.optionCard}>
          <Text style={styles.optionLabel}>章节字数</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>下拉框</Text>
          </TouchableOpacity>
        </View>

        {/* prompt参考 */}
        <TouchableOpacity style={styles.optionCard}>
          <Text style={styles.optionLabel}>折叠，展开显示prompt参考</Text>
        </TouchableOpacity>

        {/* 生成按钮 */}
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>生成</Text>
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
  backButton: {
    // padding: 8,
  },
  backButtonText: {
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
    padding: 16,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#666',
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
