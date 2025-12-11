type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div
      className={`mx-auto max-w-5xl pt-4 md:pt-12 w-full ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
}
