//  agent icon (simple componet renders svg
import React from "react";

export const AgentIcon = () => {
  return (
    <svg
      className="agent-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 9.97414V4.16705C7.5 3.50401 7.76339 2.86813 8.23223 2.39929C8.70107 1.93045 9.33696 1.66705 10 1.66705C10.663 1.66705 11.2989 1.93045 11.7678 2.39929C12.2366 2.86813 12.5 3.50401 12.5 4.16705V5.00289M12.5 10.0016V15.8337C12.5 16.4968 12.2366 17.1326 11.7678 17.6015C11.2989 18.0703 10.663 18.3337 10 18.3337C9.33696 18.3337 8.70107 18.0703 8.23223 17.6015C7.76339 17.1326 7.5 16.4968 7.5 15.8337V14.9879"
        stroke="rgb(13,14,15)"
        stroke-linecap="round"
      />
      <path
        d="M9.99935 12.5001H4.15935C2.78268 12.5001 1.66602 11.3809 1.66602 10.0001C1.66602 8.61923 2.78268 7.50006 4.15935 7.50006H4.99477M9.99935 7.50006H15.8281C16.4917 7.49951 17.1284 7.76258 17.5981 8.23141C18.0678 8.70024 18.332 9.33643 18.3327 10.0001C18.3327 11.3809 17.2114 12.5001 15.8281 12.5001H15.0268"
        stroke="rgb(13,14,15)"
        stroke-linecap="round"
      />
    </svg>
  );
};
