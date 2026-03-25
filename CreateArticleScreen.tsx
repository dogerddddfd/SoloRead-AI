import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateArticleScreen() {
  const navigation = useNavigation();
  const [vocabularyLevel, setVocabularyLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [chapterCount, setChapterCount] = useState(5);
  const [chapterWords, setChapterWords] = useState(400);
  const [promptExpanded, setPromptExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* 顶部导航栏 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>新增文章</Text>
        <View style={styles.headerRight} />
      </View>
      
      {/* 内容区域 */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{chapterCount}</Text>
            <View style={styles.sliderTrack}>
              {/* 简化的滑块，实际项目中可以使用 @react-native-community/slider */}
              <TouchableOpacity 
                style={[styles.sliderThumb, { left: `${((chapterCount - 3) / 12) * 100}%` }]} 
                onPress={() => {}}
              />
            </View>
            <Text style={styles.sliderRange}>3-15章</Text>
          </View>
        </View>
        
        {/* 章节字数选项 */}
        <View style={styles.optionCard}>
          <Text style={styles.optionLabel}>章节字数</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{chapterWords}</Text>
            <View style={styles.sliderTrack}>
              {/* 简化的滑块，实际项目中可以使用 @react-native-community/slider */}
              <TouchableOpacity 
                style={[styles.sliderThumb, { left: `${((chapterWords - 200) / 600) * 100}%` }]} 
                onPress={() => {}}
              />
            </View>
            <Text style={styles.sliderRange}>200-800词</Text>
          </View>
        </View>
        
        {/* Prompt参考 */}
        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setPromptExpanded(!promptExpanded)}
        >
          <Text style={styles.optionLabel}>折叠，展开显示prompt参考</Text>
          {promptExpanded && (
            <View style={styles.promptContent}>
              <Text style={styles.promptText}>Prompt参考内容占位</Text>
            </View>
          )}
        </TouchableOpacity>
        
        {/* 生成按钮 */}
        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>生成</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    marginTop: 25,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  optionCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  optionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sliderValue: {
    fontSize: 14,
    color: '#333',
    width: 40,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginHorizontal: 16,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    transform: [{ translateX: -8 }],
  },
  sliderRange: {
    fontSize: 14,
    color: '#666',
    width: 80,
    textAlign: 'right',
  },
  promptContent: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  promptText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  generateButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
