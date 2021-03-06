import React from "react";
import { storiesOf } from "@storybook/react";

import VarianceField from ".";

storiesOf("Variance", module)
  .add("With only baseline data", () => (
    <VarianceField
      formData={{ baseline: "2020-01-01" }}
      onChange={formData => console.log(formData)}
      schema={{ title: "Storybook variance" }}
    />
  ))
  .add("With only filled in data", () => (
    <VarianceField
      formData={{ baseline: "2020-01-01", percentComplete: 10 }}
      onChange={formData => console.log(formData)}
      schema={{ title: "Storybook variance" }}
    />
  ))
  .add("Delayed", () => (
    <VarianceField
      formData={{ baseline: "2020-01-01", status: "Delayed" }}
      onChange={formData => console.log(formData)}
      schema={{ title: "Storybook variance" }}
    />
  ))
  .add("Delayed with data", () => (
    <VarianceField
      formData={{
        baseline: "2020-01-01",
        status: "Delayed",
        percentComplete: 15,
        current: "2022-01-01",
        reason: "Cats got in the way"
      }}
      onChange={formData => console.log(formData)}
      schema={{ title: "Storybook variance" }}
    />
  ))
  .add("Completed", () => (
    <VarianceField
      formData={{ baseline: "2020-01-01", status: "Completed" }}
      onChange={formData => console.log(formData)}
      schema={{ title: "Storybook variance" }}
    />
  ))
  .add("Completed with data", () => (
    <VarianceField
      formData={{
        baseline: "2020-01-01",
        status: "Completed",
        completedDate: "2025-01-01"
      }}
      onChange={formData => console.log(formData)}
      schema={{ title: "Storybook variance" }}
    />
  ));
