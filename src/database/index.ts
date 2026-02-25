import { initAppDatabase } from './app-db';
import { initDictDatabase } from './dict-db';

// 初始化所有数据库
export const initAllDatabases = async () => {
  try {
    console.log('Initializing databases...');
    
    // 初始化主应用数据库
    await initAppDatabase();
    
    // 初始化词典数据库
    await initDictDatabase();
    
    console.log('All databases initialized successfully');
  } catch (error) {
    console.error('Error initializing databases:', error);
    throw error;
  }
};

// 导出所有数据库操作函数
export * from './app-db';
export * from './dict-db';