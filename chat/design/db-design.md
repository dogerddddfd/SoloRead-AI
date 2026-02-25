使用 SQLite，本地数据库文件。

# app
---

## books
- id TEXT PRIMARY KEY
- title TEXT
- topic TEXT
- created_at INTEGER

---

## chapters
- id TEXT PRIMARY KEY
- book_id TEXT
- chapter_index INTEGER
- title TEXT
- content TEXT
- created_at INTEGER

## words

* word TEXT PRIMARY KEY
* review_count INTEGER
* last_seen_at INTEGER
* last_practiced_at INTEGER
* created_at INTEGER

---

## sentence_practice

* id TEXT PRIMARY KEY
* word TEXT
* scenario TEXT
* user_sentence TEXT
* ai_feedback TEXT
* created_at INTEGER

---

# dict（词典表）

* word TEXT PRIMARY KEY
* phonetic TEXT
* translation TEXT
* definition TEXT

必须建立索引：

CREATE INDEX idx_word ON dict(word);

禁止：

* JSON 全量加载
* 内存查词
* 模糊搜索

查词流程：

1. 小写化
2. 去标点
3. 精确匹配
4. 简单词形回退（s / ed / ing）
