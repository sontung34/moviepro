export const groupOptions = 
[{
  label: "language",
  options: [{label: "EN",value: "EN", name: "lang"}]
},
{
  label: "rating",
  options: [
    {
      value: "7",
      label: "Higher than 7",
      name: "rating"
    },
    {
      value: "5",
      label: "Higher than 5",
      name: "rating"
    }
  ]
},
{
  label: "release",
  options: [
    {
      value: "10",
      label: "In the last 10 years",
      name: "release"
      
    }
  ]
}
]
export const groupedStyles = {
  control: (provided) => ({ ...provided, borderRadius: 0 }),
  option: (provided) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: "black",
  }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
};