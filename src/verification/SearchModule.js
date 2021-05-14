const formValidate = {
  inputSelected: [
    "inputSelected",
    {
      rules: [
        {
          required: true,
          message: "Please select the type of query"
        }
      ]
    }
  ],
  inputValue: [
    "inputValue",
    {
      maxLength: 12,
      rules: [
        {
        }
      ]
    },
    "inputHyphenValue",
    {
      maxLength: 15,
      rules: [
        {
          required: true,
          message: "Please enter the value to be queried"
        }
      ]
    }
  ],
  name: [
    "name",
    {
      rules: [
        {
          required: true,
          min: 1,
          max: 40,
          message: "Please enter the value to be queried"
        }
      ]
    }
  ],
  dateSelected: [
    "dateSelected",
    {
      rules: [
        {
          required: true
        }
      ]
    }
  ],
  startTime: [
    "startTime",
    {
      rules: [{ type: "object" }]
    }
  ],
  endTime: [
    "endTime",
    {
      rules: [{ type: "object" }]
    }
  ],
  inputStartDate: [
    "inputStartDate",
    {
      rules: [{ type: "object" }]
    }
  ],
  inputEndDate: [
    "inputEndDate",
    {
      rules: [{ type: "object" }]
    }
  ]
};
export default formValidate;
