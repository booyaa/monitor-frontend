import GenerateDisabledUISchema from ".";

describe("GenerateDisabledUISchema", () => {
  let useCase;

  beforeEach(() => {
    useCase = new GenerateDisabledUISchema();
  });

  describe("Example one", () => {
    it("Generates a ui schema from a single field", () => {
      let schema = {
        type: "object",
        properties: {
          a: { type: "string" }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({ a: { "ui:disabled": true } });
    });

    it("Generates a ui schema from a multiple fields", () => {
      let schema = {
        type: "object",
        properties: {
          a: { type: "string" },
          b: { type: "string" }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({
        a: { "ui:disabled": true },
        b: { "ui:disabled": true }
      });
    });

    it("Generates a ui schema from a nested object", () => {
      let schema = {
        type: "object",
        properties: {
          a: {
            type: "object",
            properties: {
              b: { type: "string" }
            }
          }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({
        a: { b: { "ui:disabled": true } }
      });
    });

    it("Generates a ui schema from a nested nested object", () => {
      let schema = {
        type: "object",
        properties: {
          a: {
            type: "object",
            properties: {
              b: {
                type: "object",
                properties: { c: { type: "string" } }
              }
            }
          }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({
        a: { b: { c: { "ui:disabled": true } } }
      });
    });

    it("Generates a ui schema from an array of items", () => {
      let schema = {
        type: "object",
        properties: {
          a: {
            type: "array",
            items: {
              type: "object",
              properties: {
                b: { type: "string" },
                c: { type: "string" }
              }
            }
          }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({
        a: {
          "ui:options": { addable: false, orderable: false, removable: false },
          items: { b: { "ui:disabled": true }, c: { "ui:disabled": true } }
        }
      });
    });

    it("Generates a ui schema from an object with dependencies", () => {
      let schema = {
        type: "object",
        properties: {
          a: {
            type: "object",
            properties: {
              cats: { readonly: true }
            },
            dependencies: {
              x: {
                oneOf: [
                  {
                    properties: {
                      meow: {
                        type: "object",
                        properties: {
                          cat: { type: "string" }
                        }
                      },
                      quack: { readonly: true }
                    }
                  }
                ]
              }
            }
          }
        }
      };

      let response = useCase.execute(schema);
      expect(response).toEqual({
        a: {
          cats: { "ui:disabled": true },
          meow: { cat: { "ui:disabled": true } },
          quack: { "ui:disabled": true }
        }
      });
    });
  });

  describe("Example two", () => {
    it("Generates a ui schema from a single field", () => {
      let schema = {
        type: "object",
        properties: {
          b: { type: "string" }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({ b: { "ui:disabled": true } });
    });

    it("Generates a ui schema from a multiple fields", () => {
      let schema = {
        type: "object",
        properties: {
          d: { type: "string" },
          f: { type: "string" }
        }
      };

      let response = useCase.execute(schema);
      expect(response).toEqual({
        d: { "ui:disabled": true },
        f: { "ui:disabled": true }
      });
    });

    it("Generates a ui schema from a nested object", () => {
      let schema = {
        type: "object",
        properties: {
          d: {
            type: "object",
            properties: {
              e: { type: "string" }
            }
          }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({
        d: { e: { "ui:disabled": true } }
      });
    });

    it("Generates a ui schema from an object with dependencies", () => {
      let schema = {
        type: "object",
        properties: {
          b: {
            type: "object",
            properties: {
              dogs: { readonly: true }
            },
            dependencies: {
              y: {
                oneOf: [
                  {
                    properties: {
                      woof: {
                        type: "object",
                        properties: {
                          moo: { type: "string" }
                        }
                      },
                      cluck: { readonly: true }
                    }
                  }
                ]
              }
            }
          }
        }
      };

      let response = useCase.execute(schema);
      expect(response).toEqual({
        b: {
          dogs: { "ui:disabled": true },
          woof: { moo: { "ui:disabled": true } },
          cluck: { "ui:disabled": true }
        }
      });
    });
  });

  describe("With hidden fields", () => {
    describe("In an object", () => {
      describe("Example one", () => {
        it("Marks the field as hidden", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "hidden" } }
          });
        });
      });

      describe("Example two", () => {
        it("Marks the field as hidden", () => {
          let schema = {
            type: "object",
            properties: {
              c: {
                type: "object",
                properties: {
                  d: { type: "string", hidden: true }
                }
              },
              e: {
                type: "object",
                properties: {
                  f: { type: "string", hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            c: { d: { "ui:widget": "hidden" } },
            e: { f: { "ui:widget": "hidden" } }
          });
        });
      });

      describe("With dependencies", () => {
        it("Generates a ui schema from an object with dependencies", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  cats: { readonly: true }
                },
                dependencies: {
                  x: {
                    oneOf: [
                      {
                        properties: {
                          meow: {
                            type: "object",
                            properties: {
                              cat: { hidden: true, type: "string" }
                            }
                          },
                          quack: { readonly: true }
                        }
                      }
                    ]
                  }
                }
              }
            }
          };

          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: {
              cats: { "ui:disabled": true },
              meow: { cat: { "ui:widget": "hidden" } },
              quack: { "ui:disabled": true }
            }
          });
        });
      });

      describe("With a readonly hidden field", () => {
        it("Marks the field as hidden", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", readonly: true, hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "hidden" } }
          });
        });
      });
    });
  });
});
