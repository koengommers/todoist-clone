import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ProjectModal from "./ProjectModal";
import { trpc } from "../utils/trpc";

const Sidebar = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const { data: projects } = trpc.projects.list.useQuery();

  return (
    <div className="h-screen w-[305px] bg-neutral-800 px-4 py-8">
      <ProjectModal
        isOpen={projectModalOpen}
        close={() => setProjectModalOpen(false)}
      />
      <div className="flex items-center rounded-md p-2 text-sm font-semibold text-neutral-100/50 hover:bg-neutral-600">
        <Link className="flex-grow" href="/projects/active">
          Projects
        </Link>
        <button onClick={() => setProjectModalOpen(true)}>
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <ul>
        {projects &&
          projects.map((project) => (
            <li key={project.id}>
              <Link
                className="block rounded-md p-2 text-sm hover:bg-neutral-600"
                href={`/project/${project.id}`}
              >
                {project.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
