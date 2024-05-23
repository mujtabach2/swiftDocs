import Link from "next/link";

export default function Main() {
  return (
    <>
      <style jsx>{`
        @keyframes gradient-roll {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .gradient-button {
          background: linear-gradient(
            270deg,
            #86e3ce,
            #d4a5a5,
            #ff7e5f,
            #ff7e5f,
            #feb47b
          );
          background-size: 1000% 1000%;
          animation: gradient-roll 5s ease infinite;
        }

        .bubble-text {
          font-family: "Bubbles", Arial, sans-serif;
        }
      `}</style>
      <div className="flex w-[100vw] lg-max-w-[90vw] flex-col p-6 sm:flex-row sm:justify-center sm:mb-10 ">
        <div className="flex-1 items ml-10">
          <h1 className="text-[1.7rem] sm:text-[3rem] mb-4 bubble-text">
            Effortless Document Creation in{" "}
            <span className="">
              <span className="text-[#00Fa9a]">Seconds</span>
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(0)"
                stroke="#000000"
                style={{
                  display: "inline-block",
                  marginLeft: "5px",
                  marginBottom: "40px",
                }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10"
                    stroke="#00Fa9a"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>
              </svg>
            </span>
          </h1>
          <p className="mb-6">
            Unlock the potential of streamlined, professional document
            generation with SwiftDocs.
          </p>

          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>
              Automate your document creation process
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>
              Save time and resources
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔</span>
              Ensure consistency and accuracy
            </li>
          </ul>
          <a href="/login">
            <button className="btn gradient-button text-white px-20 py-2 rounded-xl border-none">
              Get Started
            </button>
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <img
              src={"./logo.png"}
              className="h-[34px] mb-4"
              alt="SwiftDocs Logo"
            />
            <h1 className="text-4xl font-bold text-gray-800">SwiftDocs</h1>
          </div>
        </div>
      </div>
    </>
  );
}
