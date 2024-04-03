import { type NextPage } from "next";
import { useProtectedView } from "~/hooks/useProtectedView";

const Dash: NextPage = () => {
  useProtectedView();
  
  return (
    <div>
      <p>Holas</p>
    </div>
  );
};
export default Dash;
