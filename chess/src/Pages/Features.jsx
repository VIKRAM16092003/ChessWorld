import { Link } from "react-router-dom";
import report from "../assets/report2.jpg";
import puzzle from "../assets/puzzle.jpg";
import opening from "../assets/recommender.jpeg";
import tracker from "../assets/tracker1.png";

function Features() {
  return (
    <section className="text-center px-4 py-12 text-black">
      <div className="ml-[95%] mt-[-3%]">
        <Link to="/">
          <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition mt-[50px]">
            Back
          </button>
        </Link>
      </div>

      <h2 className="bg-black text-white rounded">
        FEATURES
      </h2>

      <div className="flex justify-center gap-8 flex-wrap">
        {[ 
          { img: report, alt: "Report", title: "Personalized Reports" },
          { img: puzzle, alt: "Puzzles", title: "Suggested Puzzles" },
          { img: opening, alt: "Opening", title: "Recommender" },
          { img: tracker, alt: "Tracker", title: "Progress Tracker" }
        ].map(({ img, alt, title }, index) => (
          <table
            key={index}
            className="shadow-lg rounded-xl p-4 bg-white"
            style={{ width: "16rem", borderCollapse: "separate", borderSpacing: "0 1rem" }}
          >
            <tbody>
              <tr>
                <td className="pb-4">
                  <img src={img} alt={alt} className="w-70 h-24 mx-auto rounded" />
                </td>
              </tr>
              <tr>
                <td className="text-center font-semibold text-lg">{title}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </section>
  );

}

export default Features;
