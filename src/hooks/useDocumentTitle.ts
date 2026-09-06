import { useEffect } from 'react';

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const defaultTitle = 'TeknoGen - Portal Berita AI, Aplikasi, & Perkembangan Teknologi';
    const defaultDesc = 'Portal informasi teknologi modern berbahasa Indonesia yang berfokus pada Artificial Intelligence (AI), Aplikasi, dan Perkembangan Teknologi terkini.';

    document.title = title ? `${title} | TeknoGen` : defaultTitle;

    const finalDesc = description || defaultDesc;

    // Update meta tags for SEO & sharing
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', finalDesc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title ? `${title} | TeknoGen` : defaultTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDesc);
  }, [title, description]);
}
