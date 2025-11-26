'use client';

import { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWithSkeleton({ src, alt, className = '' }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full">
      {/* Skeleton */}
      {!loaded && (
        <div className={`w-full h-48 bg-gray-300 animate-pulse rounded absolute top-0 left-0`}></div>
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
