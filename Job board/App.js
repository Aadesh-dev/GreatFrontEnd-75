import { useState, useEffect } from "react";

const JOBS_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";

const JOB_ITEM_URL = "https://hacker-news.firebaseio.com/v0/item";

export default function App() {
  const [jobStories, setJobStories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobCounter, setJobCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    if (loading) return;

    setLoading(true);
    let newJobCounter = jobCounter + 6;
    if (newJobCounter > jobStories.length) {
      newJobCounter = jobStories.length;
    }

    //Less verbose way
    //const newJobCounter = Math.min(jobCounter + 6, jobStories.length);

    const jobsToFetch = jobStories.slice(jobCounter, newJobCounter);

    try {
      const responses = await Promise.all(
        jobsToFetch.map((jobToFetch) =>
          fetch(JOB_ITEM_URL + "/" + jobToFetch + ".json")
        )
      );
      responses.forEach((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch job: ${response.status} ${response.statusText}`
          );
        }
      });
      const newJobs = await Promise.all(
        responses.map((response) => response.json())
      );

      setJobs([...jobs, ...newJobs]);
      setJobCounter(newJobCounter);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const prependZero = (number) => {
    if (number < 10) {
      return "0" + number;
    }

    return number;
  };

  const formatDate = (time) => {
    return new Date(time * 1000).toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Manual way of formatting
    // const dateObj = new Date(time * 1000);
    // const date = dateObj.getDate();
    // const month = dateObj.getMonth() + 1;
    // const year = dateObj.getFullYear();
    // const hours = dateObj.getHours();
    // const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    // const minutes = dateObj.getMinutes();
    // const seconds = dateObj.getSeconds();

    // return `${prependZero(month)}/${prependZero(date)}/${year}, ${prependZero(
    //   displayHours
    // )}:${prependZero(minutes)}:${prependZero(seconds)} ${
    //   hours < 12 ? "AM" : "PM"
    // }`;
  };

  useEffect(() => {
    const fetchJobStories = async () => {
      try {
        const response = await fetch(JOBS_URL);

        // Handle non-2xx HTTP responses
        if (!response.ok) {
          throw new Error(
            `Failed to fetch job stories: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Validate the data structure if necessary
        if (!Array.isArray(data)) {
          throw new Error("Unexpected data format received from API.");
        }

        setJobStories(data);
      } catch (error) {
        console.error("Error fetching job stories:", error);
        setJobStories([]); // Optionally reset to empty array on error
      }
    };

    fetchJobStories();
  }, []);

  useEffect(() => {
    if (jobStories.length) {
      fetchJobs();
    }
  }, [jobStories.length]);

  return (
    <div className="job-board">
      <h2 className="header">Hacker News Jobs Board</h2>
      {jobs.length ? (
        <>
          <div className="jobs-container">
            {jobs.map((job) => (
              <div className="job-card" id={job.id}>
                <h3 className="job-title">
                  {job.url ? (
                    <a href={job.url} target="_blank" className="job-link">
                      {job.title}
                    </a>
                  ) : (
                    job.title
                  )}
                </h3>
                <p className="job-info">
                  By {job.by} · {formatDate(job.time)}
                </p>
              </div>
            ))}
          </div>
          {jobCounter < jobStories.length && (
            <button
              className="load-more"
              onClick={fetchJobs}
              disabled={loading}
              aria-label="Load more job postings"
            >
              {loading ? "Loading..." : "Load more jobs"}
            </button>
          )}
        </>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}
