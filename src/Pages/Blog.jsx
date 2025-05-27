import React from "react";
import chesshomeimg from "../assets/chessbgimg.jpg";

const Blog = () => {
  const posts = [
    {
      title: "5 Tips to Improve Your Chess Game",
      date: "May 15, 2025",
      summary:
        "Discover five practical tips every chess player can use to improve their performance and strategy over time.",
    },
    {
      title: "Understanding Chess Openings: A Beginner's Guide",
      date: "May 10, 2025",
      summary:
        "Learn the basics of chess openings and why the first few moves of the game are crucial for long-term success.",
    },
    {
      title: "How to Analyze Your Chess Games",
      date: "May 1, 2025",
      summary:
        "Analyzing your games is one of the fastest ways to improve. Learn how to review mistakes and recognize patterns.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-start"
      style={{ backgroundImage: `url(${chesshomeimg})` }}
    >
      <div className="w-full max-w-6xl backdrop-blur-md bg-black/60 rounded-3xl shadow-2xl text-white p-10 space-y-14">
        
        {/* Blog Heading */}
        <header className="text-center">
          <h2 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
            ChessWorld Blog
          </h2>
          <p className="text-gray-300 text-lg">
            Explore strategies, tutorials, and tips to enhance your chess journey.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white/10 border border-white/20 backdrop-blur-lg p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <h3 className="text-xl font-semibold text-white group-hover:text-yellow-300 transition duration-200 mb-2">
                {post.title}
              </h3>
              <time
                dateTime={post.date}
                className="block text-sm text-gray-400 mb-4 tracking-wide"
              >
                {post.date}
              </time>
              <p className="text-gray-200">{post.summary}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Blog;
