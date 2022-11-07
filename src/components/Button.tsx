import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "rounded py-2 text-sm disabled:opacity-30 font-semibold px-4 leading-snug",
  {
    variants: {
      variant: {
        primary: "bg-red-500 hover:bg-red-600",
        secondary: "bg-neutral-600",
      },
    },
  }
);

const Button = ({
  variant,
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<"button"> &
  VariantProps<typeof buttonStyles>) => {
  return (
    <button className={buttonStyles({ variant })} {...props}>
      {children}
    </button>
  );
};

export default Button;
