const mapThemeColorToClass = (themeColor) => {
  if (themeColor === "synthwave") {
    return "bg-[#1d232a]";
  } else {
    return "bg-gray-200";
  }
};

export default function Pricing({ theme }) {
  const themeClass = mapThemeColorToClass(theme);
  return (
    <div class="flex flex-col p-6 gap-3 justify-center sm:flex-row sm:justify-center">
      <style jsx>{`
        .blue-to-green {
          background: linear-gradient(90deg, #0d9caa, #6bba83);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blue-to-green-btn:hover {
          border: 2px solid white;
        }

        .pink-to-purple {
          background: linear-gradient(90deg, #e9507f, #5373b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .orange-to-red {
          background: linear-gradient(90deg, #f79236, #ef5079);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blue-to-green-btn {
          background: linear-gradient(90deg, #0d9caa, #6bba83);
          color: white;
        }

        .pink-to-purple-btn:hover {
          border: 2px solid white;
        }

        .pink-to-purple-btn {
          background: linear-gradient(90deg, #e9507f, #5373b8);
          color: white;
        }

        .orange-to-red-btn:hover {
          border: 2px solid white;
        }

        .orange-to-red-btn {
          background: linear-gradient(90deg, #f79236, #ef5079);
          color: white;
        }
      `}</style>
    <div className={`card w-96 shadow-xl ${theme === "synthwave" ? "bg-gray-900" : "bg-white"}`}>

        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">7-Day Plan</h2>
          <p className="mt-4">
            <span className="text-[3rem] font-bold mr-1 blue-to-green">
              $10
            </span>
            <span>USD</span>
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✔</span> Unlimited documents
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Access to all document types
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Basic AI content suggestions
            </li>
          </ul>
          <div className="card-actions justify-center mt-6">
            <button className="btn blue-to-green-btn px-28">
              Get 7-Day Plan
            </button>
            <p className="text-center mt-1 text-[0.7rem]">
              One-time payment. No subscription &#128515;
            </p>
          </div>
        </div>
      </div>

      <div className={`card w-96 shadow-xl ${theme === "synthwave" ? "bg-gray-900" : "bg-white"} border border-2 border-[#5373b8] indicator`}>
        <span className="indicator-item indicator-top  border-none text-white indicator-center badge bg-gradient-to-r from-[#e9507f] to-[#5373b8]">
          Most Loved
        </span>
        <div className="card-body p-10 ">
          <h2 className="card-title text-2xl font-bold">30-Day Plan</h2>
          <p className="mt-4">
            <span className="text-[3rem] font-bold  pink-to-purple">$20</span>{" "}
            <span>USD</span>
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✔</span> Unlimited documents
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Access to all document types
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Personalized generation options
            </li>
          </ul>
          <div className="card-actions justify-center mt-6">
            <button className="btn pink-to-purple-btn px-28">
              Get 30-Day Plan
            </button>
            <p className="text-center mt-1 text-[0.7rem]">
              One-time payment. No subscription &#128515;
            </p>
          </div>
        </div>
      </div>

      <div className={`card w-96 shadow-xl ${theme === "synthwave" ? "bg-gray-900" : "bg-white"}`}>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">180-Day Plan</h2>
          <p className="mt-4">
            <span className="text-[3rem] font-bold  orange-to-red">$99</span>{" "}
            <span>USD</span>
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <span className="mr-2">✔</span> Unlimited documents
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Access to all document types
            </li>
            <li className="flex items-center">
              <span className="mr-2">✔</span> Advanced AI content suggestions
            </li>
          </ul>
          <div className="card-actions justify-center mt-6">
            <button className="btn orange-to-red-btn px-28">
              Get 180-Day Plan
            </button>
            <p className="text-center mt-1 text-[0.7rem]">
              One-time payment. No subscription &#128515;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
