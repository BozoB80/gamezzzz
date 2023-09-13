interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="relative mx-auto p-1 sm:p-4 xl:p-0">
      {children}
    </div>
  );
}

export default Container;