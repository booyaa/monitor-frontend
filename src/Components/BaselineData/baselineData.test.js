import React from "react";
import BaselineData from ".";
import { shallow, mount } from "enzyme";

class BaselinePage {
  constructor(title, formData) {
    this.page = shallow(<BaselineData title={title} formData={formData} />);
  }

  title() {
    return this.page.find("[data-test='title']").text();
  }

  summary(section) {
    return this.page.find(`[data-test='summary-${section}']`).text();
  }
}

describe("Baseline Data", () => {
  describe("Example 1", () => {
    let title = "HIF Data";
    let summary = {
      bidReference: "1234",
      projectTitle: "Project Cats",
      leadAuthority: "Cat Mayor",
      jointBidAreas: "Dog Hater",
      projectDescription: "Down with the dogs",
      greenOrBrownField: "Greenfield",
      noOfHousingSites: "55",
      totalArea: "67",
      hifFundingAmount: "5000382910",
      descriptionOfInfrastructure: "Really tall building",
      descriptionOfWiderProjectDeliverables: "There will be some trees outside"
    };
    let formData = { summary: summary };
    let page = new BaselinePage(title, formData);

    it("Displays the Project Name", () => {
      expect(page.title()).toEqual("HIF Data");
    });

    it("Displays the Summary", () => {
      expect(page.summary("bidReference")).toEqual("1234");
      expect(page.summary("projectTitle")).toEqual("Project Cats");
      expect(page.summary("leadAuthority")).toEqual("Cat Mayor");
      expect(page.summary("jointBidAreas")).toEqual("Dog Hater");
      expect(page.summary("projectDescription")).toEqual("Down with the dogs");
      expect(page.summary("greenOrBrownField")).toEqual("Greenfield");
      expect(page.summary("noOfHousingSites")).toEqual("55");
      expect(page.summary("totalArea")).toEqual("67");
      expect(page.summary("hifFundingAmount")).toEqual("5000382910");
      expect(page.summary("descriptionOfInfrastructure")).toEqual(
        "Really tall building"
      );
      expect(page.summary("descriptionOfWiderProjectDeliverables")).toEqual(
        "There will be some trees outside"
      );
    });
  });

  describe("Example 2", () => {
    let title = "My House Building Project";
    let formData = {
      summary: {
        bidReference: "ABC123",
        projectTitle: "Project Dogs",
        leadAuthority: "Count Cat",
        jointBidAreas: "Down with the Dogs Co.",
        projectDescription: "Cats only building",
        greenOrBrownField: "Brownfield",
        noOfHousingSites: "15",
        totalArea: "28",
        hifFundingAmount: "9876543",
        descriptionOfInfrastructure: "Giant cat box",
        descriptionOfWiderProjectDeliverables:
          "Lots of scratching posts"
      }
    };
    let page = new BaselinePage(title, formData);

    it("Displays the Project Name", () => {
      expect(page.title()).toEqual("My House Building Project");
    });

    it("Displays the summary", () => {
      expect(page.summary("bidReference")).toEqual("ABC123");
      expect(page.summary("projectTitle")).toEqual("Project Dogs");
      expect(page.summary("leadAuthority")).toEqual("Count Cat");
      expect(page.summary("jointBidAreas")).toEqual("Down with the Dogs Co.");
      expect(page.summary("projectDescription")).toEqual("Cats only building");
      expect(page.summary("greenOrBrownField")).toEqual("Brownfield");
      expect(page.summary("noOfHousingSites")).toEqual("15");
      expect(page.summary("totalArea")).toEqual("28");
      expect(page.summary("hifFundingAmount")).toEqual("9876543");
      expect(page.summary("descriptionOfInfrastructure")).toEqual(
        "Giant cat box"
      );
      expect(page.summary("descriptionOfWiderProjectDeliverables")).toEqual(
        "Lots of scratching posts"
      );
    });
  });
});
