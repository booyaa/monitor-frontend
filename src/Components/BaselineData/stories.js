import React from "react";
import BaselineData from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Baseline Data", module).add("Default", () => {
  let schema = {
    title: "person",
    type: "object",
    properties: {
      meow: { type: "string", title: "Meow" },
      croak: { type: "string", title: "Ribbit" }
    },
    dependencies: {
      meow: {
        oneOf: [
          {
            properties: {
              meow: {
                enum: ["Yes"]
              },
              woof: {
                type: "string",
                title: "Woof"
              }
            }
          }
        ]
      },
      croak: {
        oneOf: [
          {
            properties: {
              croak: {
                enum: ["Yes"]
              },
              caw: {
                type: "string",
                title: "Bird Noise"
              }
            }
          }
        ]
      }
    }
  };
  let data = {
    meow: "Yes",
    woof: "No",
    croak: "No",
    caw: "Buckaw"
  };
  return <BaselineData schema={schema} data={data} />;
});
