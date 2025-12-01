import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./icons";

export default function App() {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        },
      );

      const data = await response.json();
      if (data.message === "Success!") {
        if (liked) {
          setLiked(false);
        } else {
          setLiked(true);
        }
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`like-button like-button--${liked ? "liked" : hovered ? "hovered" : "default"}`}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={handleClick}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {loading ? (
          <SpinnerIcon
            className={`like-button__icon ${liked ? "liked-button__icon--liked" : "liked-button__icon--default"}`}
          />
        ) : (
          <HeartIcon
            className={`like-button__icon ${liked ? "liked-button__icon--liked" : "liked-button__icon--default"}`}
          />
        )}
        {liked ? "Liked" : "Like"}
      </button>
      <p className="error">{error}</p>
    </div>
  );
}
