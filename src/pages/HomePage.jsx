import { Box, DateInput, Text, RangeSelector, Stack } from "grommet";
import "../App.css";
import { useState } from "react";

function HomePage() {
  const [values, setValues] = useState([3, 7]);
  return (
    <div className="App">
      <Stack>
        <Box direction="row" justify="between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
            <Box key={value} pad="small" border={false}>
              <Text style={{ fontFamily: "monospace" }}>{value}</Text>
            </Box>
          ))}
        </Box>
        <RangeSelector
          direction="horizontal"
          invert={false}
          min={0}
          max={9}
          size="full"
          round="small"
          values={values}
          onChange={(values) => setValues(values)}
        />
      </Stack>

      <Box width="small">
        <DateInput
          size="small"
          format="dd/mm/yyyy"
          value={new Date().toISOString()}
          onChange={({ value }) => {}}
        />
      </Box>
    </div>
  );
}

export default HomePage;
