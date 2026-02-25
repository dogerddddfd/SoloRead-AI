import * as SQLite from 'expo-sqlite';

// 打开主应用数据库
export const openAppDatabase = async () => {
  return await SQLite.openDatabaseAsync('app.db');
};

// 初始化主应用数据库
export const initAppDatabase = async () => {
  try {
    const db = await openAppDatabase();
    
    // 创建表
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      
      -- 书籍表
      CREATE TABLE IF NOT EXISTS books (
        id TEXT PRIMARY KEY,
        title TEXT,
        topic TEXT,
        created_at INTEGER
      );
      
      -- 章节表
      CREATE TABLE IF NOT EXISTS chapters (
        id TEXT PRIMARY KEY,
        book_id TEXT,
        chapter_index INTEGER,
        title TEXT,
        content TEXT,
        created_at INTEGER,
        FOREIGN KEY (book_id) REFERENCES books(id)
      );
      
      -- 生词表
      CREATE TABLE IF NOT EXISTS words (
        word TEXT PRIMARY KEY,
        review_count INTEGER DEFAULT 0,
        last_seen_at INTEGER,
        last_practiced_at INTEGER,
        created_at INTEGER
      );
      
      -- 造句练习表
      CREATE TABLE IF NOT EXISTS sentence_practice (
        id TEXT PRIMARY KEY,
        word TEXT,
        scenario TEXT,
        user_sentence TEXT,
        ai_feedback TEXT,
        created_at INTEGER,
        FOREIGN KEY (word) REFERENCES words(word)
      );
    `);
    
    console.log('App database initialized successfully');
  } catch (error) {
    console.error('Error initializing app database:', error);
    throw error;
  }
};

// 插入书籍
export const insertBook = async (id: string, title: string, topic: string) => {
  try {
    const db = await openAppDatabase();
    const now = Date.now();
    await db.runAsync(
      'INSERT INTO books (id, title, topic, created_at) VALUES (?, ?, ?, ?)',
      id,
      title,
      topic,
      now
    );
    return id;
  } catch (error) {
    console.error('Error inserting book:', error);
    throw error;
  }
};

// 获取所有书籍
export const getBooks = async () => {
  try {
    const db = await openAppDatabase();
    return await db.getAllAsync('SELECT * FROM books ORDER BY created_at DESC');
  } catch (error) {
    console.error('Error getting books:', error);
    throw error;
  }
};

// 插入章节
export const insertChapter = async (id: string, bookId: string, chapterIndex: number, title: string, content: string) => {
  try {
    const db = await openAppDatabase();
    const now = Date.now();
    await db.runAsync(
      'INSERT INTO chapters (id, book_id, chapter_index, title, content, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      id,
      bookId,
      chapterIndex,
      title,
      content,
      now
    );
    return id;
  } catch (error) {
    console.error('Error inserting chapter:', error);
    throw error;
  }
};

// 获取书籍的所有章节
export const getChaptersByBookId = async (bookId: string) => {
  try {
    const db = await openAppDatabase();
    return await db.getAllAsync(
      'SELECT * FROM chapters WHERE book_id = ? ORDER BY chapter_index ASC',
      bookId
    );
  } catch (error) {
    console.error('Error getting chapters:', error);
    throw error;
  }
};

// 插入生词
export const insertWord = async (word: string) => {
  try {
    const db = await openAppDatabase();
    const now = Date.now();
    await db.runAsync(
      'INSERT OR IGNORE INTO words (word, review_count, last_seen_at, last_practiced_at, created_at) VALUES (?, ?, ?, ?, ?)',
      word,
      0,
      now,
      now,
      now
    );
    return word;
  } catch (error) {
    console.error('Error inserting word:', error);
    throw error;
  }
};

// 获取所有生词
export const getWords = async () => {
  try {
    const db = await openAppDatabase();
    return await db.getAllAsync('SELECT * FROM words ORDER BY created_at DESC');
  } catch (error) {
    console.error('Error getting words:', error);
    throw error;
  }
};

// 插入造句练习
export const insertSentencePractice = async (id: string, word: string, scenario: string, userSentence: string, aiFeedback: string) => {
  try {
    const db = await openAppDatabase();
    const now = Date.now();
    await db.runAsync(
      'INSERT INTO sentence_practice (id, word, scenario, user_sentence, ai_feedback, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      id,
      word,
      scenario,
      userSentence,
      aiFeedback,
      now
    );
    return id;
  } catch (error) {
    console.error('Error inserting sentence practice:', error);
    throw error;
  }
};

// 更新单词练习记录
export const updateWordPractice = async (word: string) => {
  try {
    const db = await openAppDatabase();
    const now = Date.now();
    await db.runAsync(
      'UPDATE words SET review_count = review_count + 1, last_practiced_at = ? WHERE word = ?',
      now,
      word
    );
  } catch (error) {
    console.error('Error updating word practice:', error);
    throw error;
  }
};