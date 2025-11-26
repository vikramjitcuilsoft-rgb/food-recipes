'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();

  const HIDE_SEGMENTS = ['country', 'meal', 'category', 'recipes']; // 👈 hide this segment completely

  const segments = pathname.split('/').filter(Boolean);

  // Remove specific segments like "country"
  const filteredSegments = segments.filter(segment => !HIDE_SEGMENTS.includes(segment));

  const breadcrumbs = filteredSegments.map((segment, index) => {
    const href = '/' + filteredSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      href,
      label: label.replace(/-/g, ' '),
      isLast: index === filteredSegments.length - 1
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-800">
            Home
          </Link>
        </li>

        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>

            {breadcrumb.isLast ? (
              <span className="font-medium text-gray-900">{breadcrumb.label}</span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="text-gray-500 hover:text-gray-700"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
