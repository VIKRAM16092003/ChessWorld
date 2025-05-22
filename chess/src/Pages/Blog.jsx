import React from "react";

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
    <div className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-3xl shadow-2xl mt-10">
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-600">
        ChessWorld Blog
      </h2>

      <div className="space-y-10">
        {posts.map((post, index) => (
          <article
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 cursor-pointer group"
          >
            <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 mb-2">
              {post.title}
            </h3>
            <time
              dateTime={post.date}
              className="block text-sm text-gray-500 mb-4 tracking-wide"
            >
              {post.date}
            </time>
            <p className="text-gray-700 leading-relaxed">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
