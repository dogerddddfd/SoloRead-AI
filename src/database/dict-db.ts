import * as SQLite from 'expo-sqlite';

// 打开词典数据库
export const openDictDatabase = async () => {
  return await SQLite.openDatabaseAsync('dict.db');
};

// 初始化词典数据库
export const initDictDatabase = async () => {
  try {
    const db = await openDictDatabase();

    // 创建词典表并建立索引
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      CREATE TABLE IF NOT EXISTS dict (
        word TEXT PRIMARY KEY,
        phonetic TEXT,
        translation TEXT,
        definition TEXT
      );
      
      CREATE INDEX IF NOT EXISTS idx_word ON dict(word);
    `);

    console.log('Dictionary database initialized successfully');
  } catch (error) {
    console.error('Error initializing dictionary database:', error);
    throw error;
  }
};

// 插入词典条目
export const insertDictEntry = async (word: string, phonetic: string, translation: string, definition: string) => {
  try {
    const db = await openDictDatabase();
    await db.runAsync(
      'INSERT OR REPLACE INTO dict (word, phonetic, translation, definition) VALUES (?, ?, ?, ?)',
      word,
      phonetic,
      translation,
      definition
    );
    return word;
  } catch (error) {
    console.error('Error inserting dict entry:', error);
    throw error;
  }
};

// 批量插入词典条目
export const bulkInsertDictEntries = async (entries: Array<{ word: string, phonetic: string, translation: string, definition: string }>) => {
  try {
    const db = await openDictDatabase();

    // 使用事务批量插入
    await db.execAsync('BEGIN TRANSACTION');

    for (const entry of entries) {
      await db.runAsync(
        'INSERT OR REPLACE INTO dict (word, phonetic, translation, definition) VALUES (?, ?, ?, ?)',
        entry.word,
        entry.phonetic,
        entry.translation,
        entry.definition
      );
    }
    
    await db.execAsync('COMMIT');
    console.log(`Inserted ${entries.length} dictionary entries`);
  } catch (error) {
    console.error('Error bulk inserting dict entries:', error);
    throw error;
  }
};

// 查找词典条目
export const lookupDictEntry = async (word: string) => {
  try {
    const db = await openDictDatabase();
    
    // 小写化查询
    const normalizedWord = word.toLowerCase().trim();
    
    // 精确匹配
    const result = await db.getFirstAsync(
      'SELECT * FROM dict WHERE word = ?',
      normalizedWord
    );
    
    if (result) {
      return result;
    }
    
    // 简单词形回退（s / ed / ing）
    let fallbackWord = normalizedWord;
    
    // 去掉 s 后缀
    if (fallbackWord.endsWith('s')) {
      fallbackWord = fallbackWord.slice(0, -1);
      const fallbackResult = await db.getFirstAsync(
        'SELECT * FROM dict WHERE word = ?',
        fallbackWord
      );
      if (fallbackResult) {
        return fallbackResult;
      }
    }
    
    // 去掉 ed 后缀
    if (normalizedWord.endsWith('ed')) {
      fallbackWord = normalizedWord.slice(0, -2);
      const fallbackResult = await db.getFirstAsync(
        'SELECT * FROM dict WHERE word = ?',
        fallbackWord
      );
      if (fallbackResult) {
        return fallbackResult;
      }
    }
    
    // 去掉 ing 后缀
    if (normalizedWord.endsWith('ing')) {
      fallbackWord = normalizedWord.slice(0, -3);
      const fallbackResult = await db.getFirstAsync(
        'SELECT * FROM dict WHERE word = ?',
        fallbackWord
      );
      if (fallbackResult) {
        return fallbackResult;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error looking up dict entry:', error);
    throw error;
  }
};

// 检查词典是否为空
export const isDictEmpty = async () => {
  try {
    const db = await openDictDatabase();
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM dict');
    return (result as any).count === 0;
  } catch (error) {
    console.error('Error checking if dict is empty:', error);
    throw error;
  }
};