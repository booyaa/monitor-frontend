import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";

export default class ArraySubform extends React.Component {
  schema = () => {
    return this.props.schema.items.properties[this.props.selectedFormSection];
  };

  formData = () => {
    return this.props.data[this.props.selectedIndex][
      this.props.selectedFormSection
    ];
  };

  uiSchema = () => {
    return this.props.uiSchema[this.props.selectedFormSection];
  };

  onFormChange = ({ formData }) => {
    let updatedData = [...this.props.data];
    updatedData[this.props.selectedIndex][
      this.props.selectedFormSection
    ] = formData;

    this.props.onChange(updatedData);
  };

  render() {
    return (
      <div>
        <Form
          fields={this.props.fields}
          formData={this.formData()}
          schema={this.schema()}
          onChange={this.onFormChange}
          uiSchema={this.uiSchema()}
        />
      </div>
    );
  }
}

ArraySubform.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  selectedFormSection: PropTypes.string.isRequired,
  uiSchema: PropTypes.object.isRequired
};
