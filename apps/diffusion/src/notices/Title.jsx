import React from "react";

export default function Title({ fields, notice, content, small }) {
	const hasVisibleFields = !!fields.filter((f) =>
		Array.isArray(notice[f]) ? notice[f].length : notice[f],
	).length;

	if (hasVisibleFields) {
		return (
			<>
				<h2 className={small ? "small" : ""}>{content}</h2>
				<style jsx>{`
            h2 {
              color: #19414c;
              font-weight: 600;
              font-size: 26px;
              margin-bottom: 20px;
            }
            h2.small {
              font-size: 22px;
            }
          `}</style>
			</>
		);
	}

	return null;
}
