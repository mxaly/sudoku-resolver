import { Grid as GridComponent } from "@/Components/Grid/Grid";
import { PageLayout } from "@/Components/Layout/PageLayout";
import { getOptionsCount, Grid } from "@/lib/grid";
import { useEffect, useState } from "react";
import { createFromString } from "./lib/grid";
import { init, resolveStep, Resolver } from "./lib/resolver";

const org = `
800 400 010
003 905 600
001 600 000

400 500 060
010 000 038
006 030 070 

000 000 000
009 000 005
070 006 000`;
const inputData = `
063 500 000 
027 000 094
094 000 510

000 000 000
000 009 080
000 048 730

000 450 020
200 036 108
051 002 307
`;

function App() {
  const [resolverState, setResolverState] = useState<Resolver>(
    init(createFromString(org))
  );
  const [optionsCount, setOptionsCount] = useState<number[]>([]);

  useEffect(() => {
    setOptionsCount([...optionsCount, getOptionsCount(resolverState.grid)]);
  }, []);

  const handleNextStep = () => {
    const updated = resolveStep(resolverState);
    setOptionsCount([...optionsCount, getOptionsCount(updated.grid)]);
    setResolverState(updated);
  };

  return (
    <PageLayout flexCenter>
      <GridComponent cells={resolverState.grid} />
      <button onClick={() => handleNextStep()}>solve</button>
      <div>
        {optionsCount.map((o, i) => (
          <span key={i}>{o},</span>
        ))}
      </div>
    </PageLayout>
  );
}

export default App;
