import { useAmp } from 'next/amp';
export function Image({ src, width, height, className = '' }) {
  const isAmp = useAmp();
  return isAmp ? <amp-img src={src} width={width} height={height} className={className} /> : <img src={src} width={width} height={height} className={className} />;
}