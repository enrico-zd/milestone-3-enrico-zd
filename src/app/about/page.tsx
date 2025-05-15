import Navigation from '../components/Navigation';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">About RevoShop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple e-commerce platform created as a personal project to showcase web development skills.
          </p>
        </div>

        {/* Project Description */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-gray-600 mb-4">
            RevoShop is a demonstration e-commerce site built with Next.js and TypeScript. 
            This project was created to practice modern web development techniques and showcase 
            my skills in building responsive, user-friendly interfaces.
          </p>
          <p className="text-gray-600">
            The site features product listings, dynamic product pages.
          </p>
        </div>

        {/* Technologies Used */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold">Next.js</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold">TypeScript</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold">Tailwind CSS</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold">React</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold">RESTful APIs</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <h3 className="font-semibold">Responsive Design</h3>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">About the Developer</h2>
          <p className="text-gray-600 mb-4">
            This project was developed by Enrico as part of the RevoU Full-Stack program.
          </p>
          <a 
            href="https://github.com/enrico-zd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View My GitHub
          </a>
        </div>
      </div>
    </>
  );
}