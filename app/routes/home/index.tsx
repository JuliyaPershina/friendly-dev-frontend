import type { Route } from './+types/index';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import FeaturedProjects from '~/components/featured-projects';
import AboutPreview from '~/components/About-preview';
import type { PostMeta } from '~/types';
import LatestPosts from '~/components/LatestPosts';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);

  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?populate=*`),
    fetch(new URL('/data/posts-meta.json', url)),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Не вдалося завантажити проєкти або пости');
  };

  const json: StrapiResponse<StrapiProject> = await projectRes.json();

  const [projects, posts] = await Promise.all([
    json.data.map((item: StrapiProject) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${item.image.url}`
      : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
  })),
    postRes.json(),
  ]);

  return { projects, posts };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects, posts } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} limit={3} />
    </>
  );
};

export default HomePage;
