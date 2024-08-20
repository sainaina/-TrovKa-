export const RatingReview = () => {
  return (
    <div className="flex flex-col p-5 max-w-[600px] h-[270px] max-md:px-5 bg-blue-100 rounded-lg m-2">
      <div className="py-1 text-2xl font-semibold leading-6 whitespace-nowrap text-zinc-800 max-md:max-w-full">
        Rating
      </div>

      <div className="mt-2.5 text-base leading-6 w-[300px] text-zinc-800 max-md:max-w-full">
        Rating and reviews are verified and are from people who use the service
      </div>
      <div className="mt-4 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col whitespace-nowrap max-md:mt-10">
              <div className="text-5xl font-semibold leading-5 text-zinc-800 max-md:text-4xl">
                4.5
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bff77abc7f0ec84422514e29ec2321bab572c783329828af115186ce1c73e84?apiKey=8b32437f92524bbfbf6990207cb61e76&"
                className="mt-7 w-20 aspect-[5]"
                alt="Rating"
              />
              <div className="mt-2 text-xl leading-5 text-zinc-800 text-opacity-60 max-md:mr-1.5">
                2,256,896
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-10">
              {["5", "4", "3", "2", "1"].map((rating, index) => (
                <div className="flex gap-2.5 mt-2" key={index}>
                  <div className="text-lg font-medium leading-5 text-zinc-800">
                    {rating}
                  </div>
                  <div className="flex flex-col justify-center my-auto w-full">
                    <div className="flex justify-between rounded-3xl bg-zinc-300">
                      <div
                        className={`h-2.5 rounded-3xl ${
                          rating === "1"
                            ? "bg-blue-500 w-[34px]"
                            : "bg-blue-500"
                        }`}
                        style={{
                          width:
                            rating === "1"
                              ? "34px"
                              : `${rating * 20 - index * 5}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
