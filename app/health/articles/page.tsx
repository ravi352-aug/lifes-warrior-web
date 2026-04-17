'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Tag } from 'lucide-react';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, articles } from '@/lib/mockData';

export default function ArticlesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['wellness', 'disease', 'nutrition', 'fitness', 'mental-health'];

  const filteredArticles = selectedCategory
    ? articles.filter((article) => article.category === selectedCategory)
    : articles;

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="space-y-6 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Articles</h1>
          <p className="mt-1 text-gray-600">
            Explore health tips, wellness guides, and medical insights
          </p>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <button
              key={article.id}
              onClick={() => router.push(`/health/articles/${article.id}`)}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-all hover:shadow-lg active:scale-95"
            >
              <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-200 to-purple-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium capitalize text-blue-700">
                    {article.category}
                  </span>
                </div>
                <h3 className="mb-2 line-clamp-2 font-bold text-gray-900">
                  {article.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    <span>{article.tags.length} tags</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="rounded-lg bg-gray-50 p-8 text-center">
            <p className="text-gray-600">No articles found in this category</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
