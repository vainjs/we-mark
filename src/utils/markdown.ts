import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * 将 Markdown 文本转换为适合微信公众号的 HTML
 */
export function convertMarkdownToHtml(markdown: string): string {
  // 使用 marked 解析 Markdown
  const rawHtml = marked(markdown);
  
  // 使用 DOMPurify 清理 HTML
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  
  // 应用微信公众号的特定调整
  return cleanHtml;
}
