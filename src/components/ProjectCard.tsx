import { Project } from "../lib/fakeProjects";
import { FaTwitter, FaTelegramPlane, FaGlobe, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 rounded-xl shadow-md text-white mb-4 hover:bg-gray-800 transition">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold">{project.name}</div>

        {/* Tags */}
        {project.tags && (
          <div className="flex gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-gray-700 text-white px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-green-400">
        <span>Key: {project.key}</span>
        <span>Followers: {project.followers}</span>
        <span>Tweets: {project.tweets}</span>
        <span>Lists: {project.lists}</span>
        <span className="text-white">Created: {project.created}</span>

        {/* Links */}
        <div className="flex items-center gap-3 ml-4 text-white">
          {project.twitter && (
            <a href={project.twitter} target="_blank" rel="noopener noreferrer" title="X">
              <FaTwitter className="text-blue-400 hover:text-blue-500" />
            </a>
          )}
          {project.telegram && (
            <a href={project.telegram} target="_blank" rel="noopener noreferrer" title="Telegram">
              <FaTelegramPlane className="text-blue-400 hover:text-blue-500" />
            </a>
          )}
          {project.website && (
            <a href={project.website} target="_blank" rel="noopener noreferrer" title="Website">
              <FaGlobe className="text-white hover:text-gray-300" />
            </a>
          )}
        </div>

        {/* Follow Button */}
        <button
          onClick={() => setLiked(!liked)}
          title="Follow"
          className="ml-4 focus:outline-none"
        >
          {liked ? (
            <FaHeart className="text-red-500 hover:text-red-600 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-500 text-lg" />
          )}
        </button>
      </div>
    </div>
  );
}