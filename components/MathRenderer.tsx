import React, { useEffect, useRef } from 'react';

// Declare MathJax on window to avoid TS errors
declare global {
  interface Window {
    MathJax: any;
  }
}

interface MathRendererProps {
  content: string;
  className?: string;
  as?: 'div' | 'span' | 'p';
}

export const MathRenderer: React.FC<MathRendererProps> = ({ 
  content, 
  className = '', 
  as: Tag = 'div' 
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.MathJax && containerRef.current) {
      // Trigger MathJax to typeset the element
      window.MathJax.typesetPromise([containerRef.current])
        .catch((err: any) => console.error('MathJax typeset failed:', err));
    }
  }, [content]);

  // We render the content directly. MathJax will find the delimiters ($...$) and replace them with SVGs.
  // Using dangerouslySetInnerHTML allows basic HTML tags (like <br>) from Gemini to work, 
  // though for data.ts it's mostly plain text with latex.
  return (
    <Tag 
      ref={containerRef} 
      className={className}
    >
      {content}
    </Tag>
  );
};
