export const Section = ({ ClassName, children }) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen home-container">
      <div className="bg-zinc-900 opacity-80 text-white w-[90vw] h-[90vh]">
        {children}
      </div>
    </div>
  );
};
