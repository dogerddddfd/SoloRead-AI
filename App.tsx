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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Reading"
          component={ReadingScreen}
          options={{
            title: '阅读',
            tabBarLabel: '阅读',
            headerTitleAlign: 'center'
          }}
        />
        <Tab.Screen
          name="Vocabulary"
          component={VocabularyScreen}
          options={{
            title: '生词',
            tabBarLabel: '生词',
            headerTitleAlign: 'center'
          }}
        />
        <Tab.Screen
          name="Sentence"
          component={SentenceScreen}
          options={{
            title: '造句',
            tabBarLabel: '造句',
            headerTitleAlign: 'center'
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: '设置',
            tabBarLabel: '设置',
            headerTitleAlign: 'center'
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
