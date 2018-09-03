export default class GenerateSidebarItems {
  execute(schema, data) {
    let items = {};

    if (schema.type === "array") {
      items = this.generateItemsForArray(schema, data);
    } else {
      items = this.generateItemsForProperties(schema.properties);
    }

    return { items };
  }

  generateItemsForArray(schema, data) {
    let items = {};

    data.forEach((_, i) => {
      let children = this.generateItemsForProperties(
        schema.items.properties,
        i
      );

      items[i] = {
        title: `${schema.items.title} ${i + 1}`,
        children
      };
    });

    return items;
  }

  generateItemsForProperties(properties, index) {
    let items = {};
    Object.entries(properties).map(
      ([key, value]) =>
        (items[key] = { title: value.title, subSection: key, index: index})
    );

    return items;
  }
}
