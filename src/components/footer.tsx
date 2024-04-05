import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-row justify-between py-4">
      <p className="text-center">
        Made With ❤️ by Manuel Adé
      </p>
      <p className="text-center">
        Powered by <a href="https://create.t3.gg/">T3</a> &{" "}
        <a href="https://turso.tech/">Turso</a>
      </p>
    </footer>
  );
};

export default Footer;
