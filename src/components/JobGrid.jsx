import JobCard from "./JobCard.jsx";

const JobGrid = ({ jobs, highlightedJobId }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    isHighlighted={job.id === highlightedJobId}
                />
            ))}
        </div>
    );
};

export default JobGrid;
