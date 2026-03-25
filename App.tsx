import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// 导入页面组件
import ReadingScreen from './src/screens/ReadingScreen';
import VocabularyScreen from './src/screens/VocabularyScreen';
import SentenceScreen from './src/screens/SentenceScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AddArticleScreen from './src/screens/AddArticleScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Reading"
          component={ReadingScreen}
          options={{
            tabBarLabel: '阅读',
          }}
        />
        <Tab.Screen
          name="AddArticle"
          component={AddArticleScreen}
          options={{
            tabBarLabel: '添加',
            tabBarItemStyle: { display: "none" }
          }}
        />
        <Tab.Screen
          name="Vocabulary"
          component={VocabularyScreen}
          options={{
            tabBarLabel: '生词'
          }}
        />
        <Tab.Screen
          name="Sentence"
          component={SentenceScreen}
          options={{
            tabBarLabel: '造句'
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: '设置'
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
