import { readTextFile, writeTextFile, createDir } from '@tauri-apps/api/fs';
import { appDataDir } from '@tauri-apps/api/path';

/**
 * 保存内容到本地文件
 */
export async function saveContent(content: string, filename: string): Promise<void> {
  try {
    const dataDir = await appDataDir();
    // 确保目录存在
    await createDir(dataDir, { recursive: true });
    await writeTextFile(`${dataDir}/${filename}`, content);
  } catch (err) {
    console.error('Error saving content:', err);
    throw err;
  }
}

/**
 * 从本地文件加载内容
 */
export async function loadContent(filename: string): Promise<string> {
  try {
    const dataDir = await appDataDir();
    return await readTextFile(`${dataDir}/${filename}`);
  } catch (err) {
    console.error('Error loading content:', err);
    throw err;
  }
}
