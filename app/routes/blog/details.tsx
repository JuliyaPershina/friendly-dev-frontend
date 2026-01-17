import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
// import type { PostMeta } from '~/types';
import { Link } from 'react-router';
import type { Post } from '~/types';

export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!res.ok) {
    throw new Error('Не вдалося завантажити пост');
  }

  const json = await res.json();

  const item = json.data[0];

  if (!item) {
    throw new Response('Не знайдено', { status: 404 });
  }
  // console.log("item:", item);

  const post = {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    date: item.date,
    content: item.content,
  };


  return { post };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    post: Post;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { post } = loaderData;

  console.log("post:", post);
  console.log(typeof post.content, post.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>

      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="text-center">
        <Link
          to="/blog"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ← Повернутися до постів
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetailsPage;
