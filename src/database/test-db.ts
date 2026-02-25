import * as SQLite from 'expo-sqlite';

// 打开数据库
export const openTestDatabase = async () => {
  return await SQLite.openDatabaseAsync('soloread.db');
};

// 初始化数据库
export const initTestDatabase = async () => {
  try {
    const db = await openTestDatabase();
    
    // 使用execAsync执行批量操作
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value TEXT NOT NULL
      );
      INSERT OR IGNORE INTO test (name, value) VALUES ('test_key', 'test_value');
    `);
    
    console.log('Test database initialized successfully');
  } catch (error) {
    console.error('Error initializing test database:', error);
    throw error;
  }
};

// 查询测试数据
export const getTestData = async () => {
  try {
    const db = await openTestDatabase();
    const allRows = await db.getAllAsync('SELECT * FROM test');
    return allRows as Array<{id: number, name: string, value: string}>;
  } catch (error) {
    console.error('Error querying test data:', error);
    throw error;
  }
};

// 插入测试数据
export const insertTestData = async (name: string, value: string) => {
  try {
    const db = await openTestDatabase();
    const result = await db.runAsync(
      'INSERT INTO test (name, value) VALUES (?, ?)',
      name,
      value
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting test data:', error);
    throw error;
  }
};

// 更新测试数据
export const updateTestData = async (id: number, name: string, value: string) => {
  try {
    const db = await openTestDatabase();
    const result = await db.runAsync(
      'UPDATE test SET name = ?, value = ? WHERE id = ?',
      name,
      value,
      id
    );
    return result.changes;
  } catch (error) {
    console.error('Error updating test data:', error);
    throw error;
  }
};

// 删除测试数据
export const deleteTestData = async (id: number) => {
  try {
    const db = await openTestDatabase();
    const result = await db.runAsync(
      'DELETE FROM test WHERE id = ?',
      id
    );
    return result.changes;
  } catch (error) {
    console.error('Error deleting test data:', error);
    throw error;
  }
};