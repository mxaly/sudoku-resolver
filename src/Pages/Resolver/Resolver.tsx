import { Grid as GridComponent } from "@/Components/Grid/Grid";
import { PageLayout } from "@/Components/Layout/PageLayout";
import { simple } from "@/examples";
import { useSudoku } from "@/hooks/useSudoku";
import { createFromString } from "@/lib/grid";

export function Resolver() {
  const {solveStep, grid, optionsCount} = useSudoku(createFromString(simple))

  return (
    <PageLayout flexCenter>
      <GridComponent cells={grid} />
      <button onClick={solveStep}>solve</button>
      <div>
        {optionsCount}
      </div>
    </PageLayout>
  );
}
