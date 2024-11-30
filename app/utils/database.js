
// import * as SQLite from 'expo-sqlite';

// export const db = SQLite.openDatabaseAsync('gallery.db');

// export const initDatabase = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS images (
//           id INTEGER PRIMARY KEY AUTOINCREMENT, 
//           user_id TEXT,
//           uri TEXT, 
//           latitude REAL, 
//           longitude REAL, 
//           timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//         )`,
//         [],
//         () => resolve(),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// export const saveImage = (userId, uri, latitude, longitude) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'INSERT INTO images (user_id, uri, latitude, longitude) VALUES (?, ?, ?, ?)',
//         [userId, uri, latitude, longitude],
//         (_, resultSet) => resolve(resultSet),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// export const getUserImages = (userId) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM images WHERE user_id = ? ORDER BY timestamp DESC',
//         [userId],
//         (_, { rows }) => resolve(rows._array),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };


// import * as SQLite from 'expo-sqlite';

// export const db = SQLite.openDatabaseAsync('gallery.db');

// export const initDatabase = async () => {
//   try {
//     await db.transaction(async tx => {
//       await tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS images (
//           id INTEGER PRIMARY KEY AUTOINCREMENT, 
//           user_id TEXT,
//           uri TEXT, 
//           latitude REAL, 
//           longitude REAL, 
//           timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//         )`
//       );
//     });
//   } catch (error) {
//     console.error('Error initializing database:', error);
//     throw error;
//   }
// };

// export const saveImage = async (userId, uri, latitude, longitude) => {
//   try {
//     await db.transactionAsync(async tx => {
//       await tx.executeSql(
//         'INSERT INTO images (user_id, uri, latitude, longitude) VALUES (?, ?, ?, ?)',
//         [userId, uri, latitude, longitude]
//       );
//     });
//   } catch (error) {
//     console.error('Error saving image:', error);
//     throw error;
//   }
// };

// export const getUserImages = async (userId) => {
//   try {
//     const result = await db.transactionAsync(async tx => {
//       const { rows } = await tx.executeSql(
//         'SELECT * FROM images WHERE user_id = ? ORDER BY timestamp DESC',
//         [userId]
//       );
//       return rows._array;
//     });
//     return result;
//   } catch (error) {
//     console.error('Error retrieving images:', error);
//     throw error;
//   }
// };



import * as SQLite from 'expo-sqlite';

// Open or create the database asynchronously
const db = SQLite.openDatabaseAsync('gallery.db');

// Initialize the database
export const initDatabase = async () => {
  try {
    // Use runAsync instead of transaction
    await (await db).runAsync(
      `CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id TEXT, 
        uri TEXT, 
        latitude REAL, 
        longitude REAL, 
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    );
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

// Save an image to the database
export const saveImage = async (userId, uri, latitude, longitude) => {
  try {
    const result = await (await db).runAsync(
      'INSERT INTO images (user_id, uri, latitude, longitude) VALUES (?, ?, ?, ?)',
      [userId, uri, latitude, longitude]
    );
    console.log('✅ Image saved:', result);
    return result;
  } catch (error) {
    console.error('❌ Error saving image:', error);
    throw error;
  }
};

// Retrieve images for a specific user
export const getUserImages = async (userId) => {
  try {
    const result = await (await db).getAllAsync(
      'SELECT * FROM images WHERE user_id = ? ORDER BY timestamp DESC',
      [userId]
    );
    console.log('✅ Images retrieved:', result);
    return result;
  } catch (error) {
    console.error('❌ Error retrieving images:', error);
    throw error;
  }
};