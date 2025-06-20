import { Project } from "../types/project";
interface Props {
  projects: Project[];
}

export default function ProjectTable({ projects }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="px-4 py-2">Project</th>
            <th className="px-4 py-2">Key</th>
            <th className="px-4 py-2">Followers</th>
            <th className="px-4 py-2">Tweets</th>
            <th className="px-4 py-2">Lists</th>
            <th className="px-4 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2 font-medium text-gray-800">{p.name}</td>
              <td className="px-4 py-2 text-green-600">{p.key}</td>
              <td className="px-4 py-2">{p.followers}</td>
              <td className="px-4 py-2">{p.tweets}</td>
              <td className="px-4 py-2">{p.lists}</td>
              <td className="px-4 py-2">{p.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}