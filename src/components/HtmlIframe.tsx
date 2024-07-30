// HtmlIframe.tsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HtmlIframeProps {
  htmlContent?: string;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
  scrollbar?: 'yes' | 'no';
  type?: 'src' | 'string';
  src?: string | null;
}

const HtmlIframe: React.FC<HtmlIframeProps> = ({
  htmlContent = '',
  width = '100%',
  height = '250px',
  title = 'HTML Frame',
  className,
  scrollbar = 'yes',
  type = 'string',
  src = null
}) => {
  const createIframeSrc = (html: string): string => {
    return URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  };

  let iframeSrc = undefined;
  if (type === 'string')
    iframeSrc = createIframeSrc(htmlContent);
  else
    iframeSrc = src;

  return (
    <iframe
      className={twMerge(``, className)}
      src={iframeSrc!}
      width={width}
      height={height}
      title={title}
      style={{ border: 'none' }}
      scrolling={scrollbar}
    ></iframe>
  );
};

export default HtmlIframe;
