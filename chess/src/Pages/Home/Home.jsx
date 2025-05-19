import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "15px",
          padding: "40px 60px",
          maxWidth: "400px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#4a148c",
            marginBottom: "15px",
            fontWeight: "700",
            letterSpacing: "2px",
          }}
        >
          Welcome to Chess Arena
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#555",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Choose your preferred timer mode and test your chess skills against AI
          or a friend. Each timer suits different play styles:
        </p>

        <div className="btn-group-vertical" style={{ width: "100%" }}>
          <button
            type="button"
            className="btn btn-outline-primary mb-3"
            style={{
              padding: "12px",
              fontSize: "18px",
              fontWeight: "600",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/play", { state: { timer: 5400 } })}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#667eea")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Classical (90 min)
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary mb-3"
            style={{
              padding: "12px",
              fontSize: "18px",
              fontWeight: "600",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/play", { state: { timer: 300 } })}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a0aec0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Blitz (5 min)
          </button>

          <button
            type="button"
            className="btn btn-outline-info"
            style={{
              padding: "12px",
              fontSize: "18px",
              fontWeight: "600",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/play", { state: { timer: 10 } })}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#63b3ed")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Bullet (10 sec)
          </button>
        </div>

        <small
          style={{
            display: "block",
            marginTop: "25px",
            color: "#888",
            fontStyle: "italic",
          }}
        >
          * Timers are customizable in game settings.
        </small>
      </div>
    </div>
  );
};

export default Home;
