import type { Route } from './+types/details';
import type { Project, StrapiResponse, StrapiProject } from '~/types';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/projects?filters[documentId][$eq]=${id}&populate=*`
  );

  if (!res.ok) {
    throw new Error('Не вдалося завантажити проєкт');
  }

  const json: StrapiResponse<StrapiProject> = await res.json();

  if (!json.data.length) {
    throw new Response('Не знайдено', { status: 404 });
  }

  const item = json.data[0];

  const project: Project = {
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
  };

  return { project };
}
// export const loader = clientLoader;

export function HydrateFallback() {
  return <div>Завантаження...</div>;
}
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData as { project: Project };
  console.log(project);

  return (
    <>
      {/* Кнопка "Назад" */}
      <Link
        to="/projects"
        className="flex items-center text-blue-500 hover:text-blue-600 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" />
        Назад до проєктів
      </Link>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Зображення проєкту */}
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Інформація про проєкт */}
        <div>
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            {project.title}
          </h1>
          <p className=" text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} &bull;{' '}
            {project.category}
          </p>
          <p className="mb-6">{project.description}</p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Переглянути сайт →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
