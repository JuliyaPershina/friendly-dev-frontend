import { useState } from 'react';
import type { Route } from './+types/index';
import type { Project, StrapiProject, StrapiResponse } from '~/types';
import ProjectCard from '~/components/Project-Card';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );

  if (!res.ok) {
    throw new Error('Не вдалося завантажити проєкти');
  }

  const json: StrapiResponse<StrapiProject> = await res.json();

  const projects = json.data.map((item: StrapiProject) => ({
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
  }));

  return { projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  console.log(projects);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const [selectedCategory, setSelectedCategory] = useState('All');

  
  // Отримання унікальних категорій
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  
  // Фільтрація за категорією
  const filteredProjects =
  selectedCategory === 'All'
  ? projects
  : projects.filter((p) => p.category === selectedCategory);
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl font-bold mb-8 ">🚀 Проєкти</h2>

      {/* Фільтр категорій */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              // Скидання номера сторінки до 1 при зміні категорії
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 auto-rows-[1fr]"
        >
          {currentProjects.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;
