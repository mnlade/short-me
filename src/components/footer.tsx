import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mx-2 flex flex-row justify-between px-2 py-4">
      <p className="text-center text-sm text-muted-foreground">
        Made With ❤️ by Manuel Adé
      </p>
      <p className="text-center text-sm text-muted-foreground">
        Powered by <a href="https://create.t3.gg/">T3</a> &{" "}
        <a href="https://turso.tech/">Turso</a>
      </p>
    </footer>
  );
};

export default Footer;
