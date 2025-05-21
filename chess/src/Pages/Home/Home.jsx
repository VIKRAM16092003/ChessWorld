
import chesshomeimg from "../../assets/chess.jpg";
const Home = () => {
  return (
    <div className="min-h-screen w-[100vw]  h-[100vh] bg-[#EFEEEA]  flex felex-row font-sans pt-0.5">
      <section className="flex flex-col md:flex-row bg-white/10 w-[90%] h-[80vh] md:w-[70%] mx-auto mt-10 border-[0px] border-gray-500 rounded-2xl px-6 py-10 items-center justify-evenly space-y-8 md:space-y-0">
        {/* Text */}
        <div className=" ml-[-51px] text-grey font-[600] mr-3">
          <h1 className="text-[90px] w-[450px] h-[150px] font-bold  leading-tight  mb-3 pr-2">
            PLAY SMARTER <br /> LEARN FASTER
          </h1>
          <p className="text-[16px] text-[#B6B09F] font-[500] font-sans mt-3 mb-3 ">
            In this platform to enchance your skills, <br /> and improve your
            focus !
          </p>
          <button className=" border-[2px] ml-[40px] mt-3   font-[700] px-6 py-2 text-[#FE5D26]  border-[#FE5D26] rounded hover:bg-[#FE5D26] hover:text-black ">
            Get Free Game Analysis
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[2px] h-[500px] bg-gray-400 mx-6"></div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={chesshomeimg}
            alt="Chess Analysis"
            className="shadow-md ml-[110px] max-w-full h-[450px] w-[500px]  h-auto"
          />
        </div>
      </section>

      
    </div>
  );
};

export default Home;