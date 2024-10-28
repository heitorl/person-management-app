const Loading = () => {
  return (
    <div className="w-full h-full justify-center flex flex-col ">
      <div className="p-4 flex justify-center w-full">
        <div className="h-[100px] w-[100px] bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex flex-col space-y-2 p-4">
        <div className="flex-1 p-2 flex justify-between">
          <span className="font-bold text-md bg-gray-200 rounded w-1/3 h-4"></span>
          <span className="bg-gray-200 rounded w-1/3 h-4"></span>
        </div>
        <div className="flex-1 p-2 flex justify-between">
          <span className="font-bold text-md bg-gray-200 rounded w-1/3 h-4"></span>
          <span className="bg-gray-200 rounded w-1/3 h-4"></span>
        </div>
        <div className="flex-1 p-2 flex justify-between">
          <span className="font-bold text-md bg-gray-200 rounded w-1/3 h-4"></span>
          <span className="bg-gray-200 rounded w-1/3 h-4"></span>
        </div>
        <div className="flex-1 p-2 flex justify-between">
          <span className="font-bold text-md bg-gray-200 rounded w-1/3 h-4"></span>
          <span className="bg-gray-200 rounded w-1/3 h-4"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
