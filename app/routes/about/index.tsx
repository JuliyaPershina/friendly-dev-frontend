const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
      {/* Вступ */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
        <img
          src="/images/photo.jpg"
          alt="Профіль"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Привіт, я Юлія! 👋
          </h1>
          <p className="text-gray-300 text-lg">
            Я — front-end розробниця на етапі зростання, яка створює сучасні
            веб-інтерфейси та документує свій шлях у веб-розробці.
          </p>
        </div>
      </div>

      {/* Секція біографії */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">Моя місія</h2>
        <p className="text-gray-300 leading-relaxed">
          Ділитися практичними знаннями, реальними прикладами й чесним досвідом,
          щоб процес навчання веб-розробці був простішим і приємнішим.
        </p>
      </div>

      {/* Стек технологій */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          🚀 Технології, які я використовую
        </h2>
        <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
          {[
            'HTML',
            'CSS',
            'JavaScript',
            'React',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Node.js',
            'Strapi',
            'PostgreSQL',
          ].map((tech) => (
            <li key={tech} className="bg-gray-700 px-3 py-1 rounded-md">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
