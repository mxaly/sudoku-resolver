import { render } from "@testing-library/react";
import { PageLayout } from "./PageLayout";

describe("PageLayout", () => {
  it("should render", async () => {
    const MyBodyComponent = () => <div>test_1</div>;

    const wrapper = render(
      <PageLayout>
        <MyBodyComponent />
      </PageLayout>
    );

    const body = await wrapper.findByText("test_1");
    expect(body).not.toBeUndefined();
  });
});
