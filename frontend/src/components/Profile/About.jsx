import React from "react";

const About = ({ user }) => {
	return (
		<>
      <div className="flex items-center gap-2">
        <p>Twitter: </p>
        <a
				className="text-blue-700 font-mono tracking-tightest text-sm cursor-pointer hover:text-blue-800 hover:underline"
				title="Twitter"
				href="https://twitter.com/"
				target="_blank"
			>
				{user.handle}
			</a>
      </div>
			
		</>
	);
};

export default About;
