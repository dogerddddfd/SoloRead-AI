import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pingAI, AISettings } from '../ai';

interface Model {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  alias?: string;
}

export default function SettingsScreen() {
  const [models, setModels] = useState<Model[]>([]);
  const [showAddModel, setShowAddModel] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [newModelBaseUrl, setNewModelBaseUrl] = useState('');
  const [newModelApiKey, setNewModelApiKey] = useState('');
  const [newModelAlias, setNewModelAlias] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });
  const [isPinging, setIsPinging] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [editModelName, setEditModelName] = useState('');
  const [editModelBaseUrl, setEditModelBaseUrl] = useState('');
  const [editModelApiKey, setEditModelApiKey] = useState('');
  const [editModelAlias, setEditModelAlias] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedModels = await AsyncStorage.getItem('models');
      if (savedModels) setModels(JSON.parse(savedModels));
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('models', JSON.stringify(models));
    } catch (error) {
      console.error('Failed to save settings:', error);
      Alert.alert('错误', '保存设置失败');
    }
  };

  const addModel = () => {
    // 简单验证
    if (!newModelName.trim()) {
      Alert.alert('错误', '请输入模型名称');
      return;
    }
    
    if (!newModelBaseUrl.trim()) {
      Alert.alert('错误', '请输入 Base URL');
      return;
    }
    
    if (!newModelApiKey.trim()) {
      Alert.alert('错误', '请输入 API Key');
      return;
    }

    // 验证 Base URL 格式
    if (!/^https?:\/\/.+/.test(newModelBaseUrl)) {
      Alert.alert('错误', 'Base URL 格式不正确，请以 http:// 或 https:// 开头');
      return;
    }

    const newModel: Model = {
      id: Date.now().toString(),
      name: newModelName.trim(),
      baseUrl: newModelBaseUrl.trim(),
      apiKey: newModelApiKey.trim(),
      alias: newModelAlias.trim() || undefined,
    };

    setModels([...models, newModel]);
    setNewModelName('');
    setNewModelBaseUrl('');
    setNewModelApiKey('');
    setNewModelAlias('');
    setShowAddModel(false);
    saveSettings();
  };

  const removeModel = (id: string) => {
    setModels(models.filter(model => model.id !== id));
    setShowOptions(false);
    saveSettings();
  };

  const editModel = (model: Model) => {
    setSelectedModel(model);
    setEditModelName(model.name);
    setEditModelBaseUrl(model.baseUrl);
    setEditModelApiKey(model.apiKey);
    setEditModelAlias(model.alias || '');
    setShowOptions(false);
    setShowEditModel(true);
  };

  const saveEditModel = () => {
    if (!selectedModel) return;

    // 简单验证
    if (!editModelName.trim()) {
      Alert.alert('错误', '请输入模型名称');
      return;
    }
    
    if (!editModelBaseUrl.trim()) {
      Alert.alert('错误', '请输入 Base URL');
      return;
    }
    
    if (!editModelApiKey.trim()) {
      Alert.alert('错误', '请输入 API Key');
      return;
    }

    // 验证 Base URL 格式
    if (!/^https?:\/\/.+/.test(editModelBaseUrl)) {
      Alert.alert('错误', 'Base URL 格式不正确，请以 http:// 或 https:// 开头');
      return;
    }

    const updatedModel: Model = {
      ...selectedModel,
      name: editModelName.trim(),
      baseUrl: editModelBaseUrl.trim(),
      apiKey: editModelApiKey.trim(),
      alias: editModelAlias.trim() || undefined,
    };

    setModels(models.map(model => model.id === selectedModel.id ? updatedModel : model));
    setShowEditModel(false);
    saveSettings();
  };

  const pingApi = async (model: Model) => {
    setIsPinging(true);
    setShowOptions(false);

    try {
      const settings: AISettings = {
        url: model.baseUrl,
        key: model.apiKey,
        model: model.name,
      };

      const result = await pingAI(settings);

      if (result.success) {
        Alert.alert('成功', `Ping 成功！\n模型: ${result.model || model.name}\n\nAI 回复: ${result.message}`);
      } else {
        Alert.alert('失败', `Ping 失败: ${result.message}`);
      }
    } catch (error) {
      Alert.alert('错误', `Ping 出错: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsPinging(false);
    }
  };

  const showModelOptions = (model: Model, event: any) => {
    setSelectedModel(model);
    setOptionsPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY
    });
    setShowOptions(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 模型管理卡片 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>AI 模型设置</Text>
          
          {/* 已有模型列表 */}
          {models.length > 0 && (
            <View style={styles.modelList}>
              {models.map((model) => (
                <View key={model.id} style={styles.modelItem}>
                  <View style={styles.modelInfo}>
                    <Text style={styles.modelName}>{model.alias || model.name}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.moreButton}
                    onPress={(event) => showModelOptions(model, event)}
                  >
                    <Text style={styles.moreButtonText}>更多选项</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* 添加模型卡片 */}
          {showAddModel ? (
            <View style={styles.addModelForm}>
              <Text style={styles.formTitle}>添加模型</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>AI API Key</Text>
                <TextInput
                  style={styles.input}
                  value={newModelApiKey}
                  onChangeText={setNewModelApiKey}
                  placeholder="请输入 API Key"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>AI Base URL</Text>
                <TextInput
                  style={styles.input}
                  value={newModelBaseUrl}
                  onChangeText={setNewModelBaseUrl}
                  placeholder="请输入 Base URL"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>模型</Text>
                <TextInput
                  style={styles.input}
                  value={newModelName}
                  onChangeText={setNewModelName}
                  placeholder="请输入模型名称"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>设置名称（可选）</Text>
                <TextInput
                  style={styles.input}
                  value={newModelAlias}
                  onChangeText={setNewModelAlias}
                  placeholder="请输入别名"
                />
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModel(false)}>
                  <Text style={styles.cancelButtonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={addModel}>
                  <Text style={styles.saveButtonText}>确定</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity style={styles.addModelButton} onPress={() => setShowAddModel(true)}>
              <Text style={styles.addModelButtonText}>添加模型</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* 加载指示器 */}
      {isPinging && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>正在测试连接...</Text>
          </View>
        </View>
      )}

      {/* 模型选项浮窗 */}
      {showOptions && selectedModel && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showOptions}
          onRequestClose={() => setShowOptions(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setShowOptions(false)}>
            <View style={styles.optionsContainer}>
              <View style={[styles.optionsMenu, { top: optionsPosition.y, right: 20 }]}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => pingApi(selectedModel)}
                >
                  <Text style={styles.menuItemText}>ping</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => editModel(selectedModel)}
                >
                  <Text style={styles.menuItemText}>修改</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => removeModel(selectedModel.id)}
                >
                  <Text style={[styles.menuItemText, { color: '#ff3b30' }]}>删除</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* 修改模型表单 */}
      {showEditModel && selectedModel && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showEditModel}
          onRequestClose={() => setShowEditModel(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.editModelForm}>
              <Text style={styles.formTitle}>修改模型</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>AI API Key</Text>
                <TextInput
                  style={styles.input}
                  value={editModelApiKey}
                  onChangeText={setEditModelApiKey}
                  placeholder="请输入 API Key"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>AI Base URL</Text>
                <TextInput
                  style={styles.input}
                  value={editModelBaseUrl}
                  onChangeText={setEditModelBaseUrl}
                  placeholder="请输入 Base URL"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>模型</Text>
                <TextInput
                  style={styles.input}
                  value={editModelName}
                  onChangeText={setEditModelName}
                  placeholder="请输入模型名称"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>设置名称（可选）</Text>
                <TextInput
                  style={styles.input}
                  value={editModelAlias}
                  onChangeText={setEditModelAlias}
                  placeholder="请输入别名"
                />
              </View>

              <View style={styles.formButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowEditModel(false)}>
                  <Text style={styles.cancelButtonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveEditModel}>
                  <Text style={styles.saveButtonText}>确定</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  modelList: {
    marginBottom: 16,
  },
  modelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  addModelForm: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    flex: 1,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  addModelButton: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addModelButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    flex: 1,
  },
  optionsMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 120,
  },
  menuItem: {
    padding: 12,
    borderRadius: 4,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModelForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
});