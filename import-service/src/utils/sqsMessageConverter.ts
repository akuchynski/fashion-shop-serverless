export const getAttributesFromCsvRow = ({
  id,
  title,
  description,
  price,
  count,
}) => {
  return {
    id: {
      DataType: "String",
      StringValue: id,
    },
    title: {
      DataType: "String",
      StringValue: title,
    },
    description: {
      DataType: "String",
      StringValue: description,
    },
    price: {
      DataType: "Number",
      StringValue: price,
    },
    count: {
      DataType: "Number",
      StringValue: count,
    },
  };
};
