import type { Route } from './+types/index';
// import type { PostMeta } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import PostFilter from '~/components/PostFilter';
import type { Post } from '~/types';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=*`);

  if (!res.ok) {
    throw new Error('Не вдалося завантажити пости');
  }

  const json = await res.json();

  const posts: Post[] = json.data.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt ?? '',
    date: item.date,
    content: item.content,
  }));

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: Post[] };

  console.log(typeof posts, posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const postsPerPage = 3;

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">📝 Блог</h2>
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1); // Скидання на першу сторінку при фільтрації
        }}
      />
      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-gray-400 text-center">Постів не знайдено.</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BlogPage;
