'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/shared/Navigation';
import { currentUser, articles } from '@/lib/mockData';

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const article = articles.find((a) => a.id === articleId);

  if (!article) {
    return (
      <MainLayout
        headerProps={{
          userName: currentUser.name,
          userAvatar: currentUser.avatar,
        }}
      >
        <div className="px-4 py-8 text-center">
          <p className="text-gray-600">Article not found</p>
          <Button
            onClick={() => router.push('/health/articles')}
            className="mt-4"
          >
            Back to Articles
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Find related articles
  const relatedArticles = articles.filter(
    (a) => a.category === article.category && a.id !== article.id
  );

  return (
    <MainLayout
      headerProps={{
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
      }}
    >
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-4">
        {/* Back Button */}
        <button
          onClick={() => router.push('/health/articles')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          {/* Featured Image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-200 to-purple-200">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title and Meta */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min read</span>
              </div>
              <div className="text-xs">
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose max-w-none space-y-4 text-gray-700">
          <p className="text-lg leading-relaxed">{article.content}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900">Related Articles</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedArticles.slice(0, 2).map((related) => (
                <button
                  key={related.id}
                  onClick={() => router.push(`/health/articles/${related.id}`)}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-all hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 font-semibold text-gray-900">
                      {related.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                      {related.excerpt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
