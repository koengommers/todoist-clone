import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

const Sidebar = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <div className="h-screen w-[305px] bg-neutral-800">
      <ProjectModal
        isOpen={projectModalOpen}
        close={() => setProjectModalOpen(false)}
      />
      <div className="flex items-center px-4 py-8 text-sm font-semibold opacity-50">
        <Link className="flex-grow" href="/projects/active">
          Projects
        </Link>
        <button onClick={() => setProjectModalOpen(true)}>
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
