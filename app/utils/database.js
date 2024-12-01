// import * as SQLite from 'expo-sqlite';

// // Open or create the database asynchronously
// const db = SQLite.openDatabaseAsync('gallery.db');

// // Initialize the database
// export const initDatabase = async () => {
//   try {
//     // Use runAsync instead of transaction
//     await (await db).runAsync(
//       `CREATE TABLE IF NOT EXISTS images (
//         id INTEGER PRIMARY KEY AUTOINCREMENT, 
//         user_id TEXT, 
//         uri TEXT, 
//         latitude REAL, 
//         longitude REAL, 
//         timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
//       )`
//     );
//     console.log('✅ Database initialized');
//   } catch (error) {
//     console.error('❌ Error initializing database:', error);
//     throw error;
//   }
// };

// // Save an image to the database
// export const saveImage = async (userId, uri, latitude, longitude) => {
//   try {
//     const result = await (await db).runAsync(
//       'INSERT INTO images (user_id, uri, latitude, longitude) VALUES (?, ?, ?, ?)',
//       [userId, uri, latitude, longitude]
//     );
//     console.log('✅ Image saved:', result);
//     return result;
//   } catch (error) {
//     console.error('❌ Error saving image:', error);
//     throw error;
//   }
// };

// // Retrieve images for a specific user
// export const getUserImages = async (userId) => {
//   try {
//     const result = await (await db).getAllAsync(
//       'SELECT * FROM images WHERE user_id = ? ORDER BY timestamp DESC',
//       [userId]
//     );
//     console.log('✅ Images retrieved:', result);
//     return result;
//   } catch (error) {
//     console.error('❌ Error retrieving images:', error);
//     throw error;
//   }
// };


import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

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
        location TEXT,
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

// Delete an image by its ID
export const deleteImage = async (imageId) => {
  try {
    // First, get the URI of the image to delete from file system
    const imageToDelete = await (await db).getFirstAsync(
      'SELECT uri FROM images WHERE id = ?',
      [imageId]
    );

    if (!imageToDelete) {
      console.error('❌ Image not found');
      return false;
    }

    // Delete the image file from the file system
    if (imageToDelete.uri) {
      try {
        await FileSystem.deleteAsync(imageToDelete.uri, { idempotent: true });
      } catch (fileDeleteError) {
        console.error('❌ Error deleting file:', fileDeleteError);
        // Continue with database deletion even if file deletion fails
      }
    }

    // Delete the image record from the database
    const result = await (await db).runAsync(
      'DELETE FROM images WHERE id = ?',
      [imageId]
    );

    console.log('✅ Image deleted:', result);
    return true;
  } catch (error) {
    console.error('❌ Error deleting image:', error);
    throw error;
  }
};