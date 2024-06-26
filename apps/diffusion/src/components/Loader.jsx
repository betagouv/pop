import React from "react";

export default ({ isOpen = true }) =>
	isOpen ? (
		<div className="loader-container">
			<div id="loader" />
			<style jsx>{`
        #loader {
          border: 16px solid #eaeaec;
          border-top: 16px solid #c43a2f;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        .loader-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
		</div>
	) : null;
