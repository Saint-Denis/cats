const setOptions = data => {
  return (
    data &&
    data.reduce(
      (acc, curr) => {
        return [
          ...acc,
          {
            value: curr.name,
            label: curr.name.toLowerCase(),
            id: curr.id
          }
        ];
      },
      [{ value: "none", label: "none" }]
    )
  );
};

export default setOptions;
