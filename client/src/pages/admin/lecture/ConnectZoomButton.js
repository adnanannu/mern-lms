import React from "react";

const ConnectZoom = () => {
  const handleConnectZoom = () => {
    // Redirect to your backend OAuth route
    window.location.href = "/api/zoom/connect";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h2>Connect Your Zoom Account</h2>
      <p>Click the button below to authorize your Zoom account.</p>
      <button
        onClick={handleConnectZoom}
        style={{
          padding: "12px 24px",
          backgroundColor: "#2D8CFF",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        Connect Zoom
      </button>
    </div>
  );
};

export default ConnectZoom;
