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

function App() {
  const { solveStep, grid, optionsCount } = useSudoku(createFromString(simple));

  const [modal1, setModal1] = useState(true);
  const [modal2, setModal2] = useState(true);

  const onClick = (btn: string) => {
    console.log("onClick:", { btn });
  };

  const sizes = ["small", "medium"] as const;
  const types = ["primary", "secondary"] as const;

  let buttons = [];
  for (const size of sizes) {
    for (const type of types) {
      buttons.push(
        <>
          <Button
            label={`${size}-${type}`}
            icon={<CloseIcon />}
            onClick={() => onClick(`${size}-${type}-icon`)}
            type={type}
            size={size}
          />
          <Button
            label={`${size}-${type}`}
            onClick={() => onClick(`${size}-${type}`)}
            type={type}
            size={size}
          />
          <Button
            type={type}
            size={size}
            onClick={() => onClick(`${size}-${type}-custom`)}
          >
            <p>{`${size}-${type}-custom`}</p>
          </Button>
        </>
      );
    }
  }

  return (
    <>
      <Resolver />
    </>
  );
}

export default App;
