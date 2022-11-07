import { Dialog } from "@headlessui/react";
import Button from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1),
});
type FormValues = z.infer<typeof schema>;

const ProjectModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // TODO: Mutate server state
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <Dialog open={isOpen} onClose={close}>
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-start justify-center p-8">
        <Dialog.Panel
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm rounded-xl bg-neutral-900 shadow-2xl"
        >
          <div className="py-4 px-5 font-semibold">Add project</div>
          <div className="border-t border-b border-white/10 p-5">
            <label htmlFor="name" className="block pb-2 text-sm font-semibold">
              Name
            </label>
            <input
              id="name"
              className="block w-full rounded border border-white/10 bg-transparent p-1 leading-none outline-blue-500 transition-[outline] focus-visible:outline"
              {...register("name")}
            />
          </div>
          <div className="flex justify-end gap-2 px-5 py-3">
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="primary" disabled={!isValid}>
              Add
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProjectModal;
