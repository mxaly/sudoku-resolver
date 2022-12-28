import { simple } from "@/examples";
import { useSudoku } from "@/hooks/useSudoku";
import { createFromString } from "@/lib/grid";
import { Resolver } from "@/Pages/Resolver/Resolver";
import { Modal } from "@/Components/Base/Modal/Modal";
import { useState } from "react";
import { Panel } from "@/Components/Base/Panel/Panel";
import { Button } from "@/Components/Base/Button/Button";
import { PageLayout } from "./Components/Layout/PageLayout";

import { ReactComponent as CloseIcon } from "@/assets/icons/close-circle.svg";
import { Styleguide } from "./Pages/Styleguide";

function App() {
  const { solveStep, grid, optionsCount } = useSudoku(createFromString(simple));

  const [modal1, setModal1] = useState(true);
  const [modal2, setModal2] = useState(true);

  return (
    <>
      <Resolver />
    </>
  );
}

export default App;
