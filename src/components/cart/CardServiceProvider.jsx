import React from 'react';

function CardServiceProvider() {
  return (
    <div className="flex gap-5 w-[1250px] h-[572px] mx-[92px] my-[169px] max-md:flex-col max-md:gap-0">
      <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/88eec0c58b6347f6ea4b921b1bb44ceb05303037a5711a999099cb53749d4a97?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
          alt="Service provider's work"
          className="grow w-full aspect-[1.25] max-md:mt-9 max-md:max-w-full"
        />
      </div>
      <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col px-5 py-5 bg-white rounded-md border border-solid border-black border-opacity-10 max-md:max-w-full">
            <div className="flex gap-5 px-px max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto self-start text-xl font-bold text-black">
                Service Provider{" "}
              </div>
              <div className="flex flex-col flex-1 justify-center px-0.5 py-0.5 text-base text-yellow-500 bg-white rounded-md border border-yellow-500 border-solid">
                <div className="flex gap-1 justify-center">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5259c2a129b4b01199fccfd4a3f659eb2fd73d8fae99ed565849ffd54c635c3?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
                    alt=""
                    className="shrink-0 my-auto aspect-square w-[21px]"
                  />
                  <div className=''>Report Provider</div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-3.5 max-md:flex-wrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9020031e34a7e96d52116222c39aad1401b792da79e478941ddc4f05e8ad313?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
                alt="Pu Chhveng's profile picture"
                className="shrink-0 aspect-[0.97] w-[89px] rounded-full"
              />
              <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit">
                <div className="text-xl text-black">Pu Chhveng</div>
                <div className="mt-3.5 text-lg text-stone-400">
                  Member since 2024
                </div>
                <div className="flex gap-2.5 mt-3.5">
                  <div className="flex gap-1.5 self-start">
                    {[...Array(5)].map((_, index) => (
                      <img
                        key={index}
                        loading="lazy"
                        src={`https://cdn.builder.io/api/v1/image/assets/TEMP/949bad3af455e01c65aa293644bd64b3296890589dc04e8b287fa84447c8df49?apiKey=9deb1edcb31d45a78fce95c6c11be899&${index + 4}-`}
                        alt=""
                        className="shrink-0 aspect-square w-[18px]"
                      />
                    ))}
                  </div>
                  <div className="flex-auto text-base text-stone-400">
                    5.0​ (120 reviews)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start pt-7 pr-20 pb-4 pl-6 mt-5 text-base bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full">
            <div className="text-xl font-bold text-black">
              Computer keyboard repair
            </div>
            <div className="flex gap-1.5 mt-2.5 text-stone-400">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b182aec46bb9a82f6aedb04f2826e87f5221bb9e421746124e3e46202317a846?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
                alt=""
                className="shrink-0 w-4 aspect-square"
              />
              <div className="flex-auto">Toul kork, Phnom Penh</div>
            </div>
            <div className="flex gap-2 mt-2 text-white whitespace-nowrap max-md:pr-5">
              <div className="justify-center px-2.5 py-2 bg-yellow-500 rounded-md">
                Electronics
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/209b4bf090de0319655077a531d4776c7a9363e8ffd057c1d1e2a2beec28a76e?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
                alt=""
                className="shrink-0 self-start aspect-square w-[23px]"
              />
            </div>
          </div>
          <div className="flex flex-col px-12 py-9 mt-2 bg-white rounded-md border border-solid border-black border-opacity-10 max-md:px-5 max-md:max-w-full">
            <div className="self-center text-2xl font-semibold text-black text-opacity-80">
              Price $1
            </div>
          </div>
          <div className="flex gap-3.5 px-16 py-4 mt-6 text-xl text-white bg-blue-900 rounded-md max-md:px-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9e12e42745237984b70f3515b7b96186f2bbb5044e220d8c6baa9cdf329a895?apiKey=9deb1edcb31d45a78fce95c6c11be899&"
              alt=""
              className=" shrink-0 w-7 aspect-square"
            />
            <div className="text-center flex-auto my-auto">Contact: 012 13 14 15</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardServiceProvider;
