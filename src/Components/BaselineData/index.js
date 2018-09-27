import React from "react";

export default class BaselineData extends React.Component {
  render() {
    return (
      <div>
        <p data-test="title">{this.props.title}</p>
        <p data-test="summary-bidReference">
          {this.props.formData.summary.bidReference}
        </p>
        <p data-test="summary-projectTitle">
          {this.props.formData.summary.projectTitle}
        </p>
        <p data-test="summary-leadAuthority">
          {this.props.formData.summary.leadAuthority}
        </p>
        <p data-test="summary-jointBidAreas">
          {this.props.formData.summary.jointBidAreas}
        </p>
        <p data-test="summary-projectDescription">
          {this.props.formData.summary.projectDescription}
        </p>
        <p data-test="summary-greenOrBrownField">
          {this.props.formData.summary.greenOrBrownField}
        </p>
        <p data-test="summary-noOfHousingSites">
          {this.props.formData.summary.noOfHousingSites}
        </p>
        <p data-test="summary-totalArea">
          {this.props.formData.summary.totalArea}
        </p>
        <p data-test="summary-hifFundingAmount">
          {this.props.formData.summary.hifFundingAmount}
        </p>
        <p data-test="summary-descriptionOfInfrastructure">
          {this.props.formData.summary.descriptionOfInfrastructure}
        </p>
        <p data-test="summary-descriptionOfWiderProjectDeliverables">
          {this.props.formData.summary.descriptionOfWiderProjectDeliverables}
        </p>
      </div>
    );
  }
}
