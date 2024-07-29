// HtmlIframe.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HtmlIframeProps {
  htmlContent: string;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
}

const HtmlIframe: React.FC<HtmlIframeProps> = ({
  htmlContent,
  width = '100%',
  height = '100%',
  title = 'HTML Frame',
  className
}) => {
  // Create a Blob URL for the HTML content
  const createIframeSrc = (html: string): string => {
    return URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  };

  const iframeSrc = createIframeSrc(htmlContent);

  return (
    <iframe className={twMerge(`min-h-screen min-w-full`, className)}
      src={iframeSrc}
      width={width}
      height={height}
      title={title}
      style={{ border: 'none' }}
    ></iframe>
  );
};

export default HtmlIframe;
