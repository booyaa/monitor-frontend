import React from "react";

export default class BaselineData extends React.Component {
  renderObjectData = (obj, schema) => {
    if (schema.type == "array") {
      return obj.map(item => {
        return this.renderObjectData(item, schema.items);
      });
    }
    return Object.entries(obj).map(([key, value]) => {
      let propertySchema = this.findInSchema(schema, key);
      if (propertySchema.type == "object") {
        return this.renderObjectData(obj[key], propertySchema);
      } else {
        return (
          <div key={key}>
            <h4 data-test={`title-${key}`}>{propertySchema.title}</h4>
            <p data-test={key}>{value}</p>
          </div>
        );
      }
    });
  };

  findInSchema = (schema, key) => {
    if (key in schema.properties) {
      return schema.properties[key];
    } else {
      return this.findInDependencies(schema, key);
    }
  };

  findInDependencies = (schema, key) => {
    let allDependencies = Object.values(schema.dependencies);
    let foundPropertySchema;
    allDependencies.forEach(dependency => {
      let properties = this.findInDependency(dependency, key);
      if (properties) {
        foundPropertySchema = properties;
      }
    });
    return foundPropertySchema;
  };

  findInDependency = (dependency, key) => {
    let dependencyOptions = dependency.oneOf;
    let dependencyConditions = dependencyOptions.find(item => {
      return key in item.properties;
    });
    if (dependencyConditions) {
      return dependencyConditions.properties[key];
    }
  };

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 data-test="title">{this.props.schema.title}</h2>
        </div>
        <div className="panel-body">
          {this.renderObjectData(this.props.formData, this.props.schema)}
        </div>
      </div>
    );
  }
}
