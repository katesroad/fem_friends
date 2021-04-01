import * as React from "react";
import LELVEMAP from "./levels";
import {
  Form,
  Input,
  Label,
  SearchButton,
  SearchIcon,
  DropdownButton,
  DropdownArrow,
  DropdownOption,
  DropdownPopover,
  DropdownList,
  DropdownInput,
} from "./styles";

export default function NameFilter({ name, onSearch, ...props }) {
  const [search, setSearch] = React.useState(name);
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) onSearch("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!search) {
      onSearch(search);
    }
  };
  return (
    <Form as="form" onSubmit={handleSubmit} {...props}>
      <Label htmlFor="name">
        <Input
          as="input"
          value={search}
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="search challenge"
        />
        <SearchButton type="submit">
          <SearchIcon />
        </SearchButton>
      </Label>
    </Form>
  );
}

export function LevelFilter({ level, onSearch }) {
  const handleChange = (level) => {
    onSearch(level);
  };
  return (
    <LevelFilter>
      <DropdownInput
        aria-labelledby={"region"}
        value={level}
        onChange={(level) => handleChange(level)}
      >
        <DropdownButton arrow={<DropdownArrow />} />
        <DropdownPopover>
          <DropdownList>
            <DropdownOption value="all" key="blank">
              Filter By Level
            </DropdownOption>
            {Object.keys(LELVEMAP).map((key) => (
              <DropdownOption value={key} key={key}>
                {LELVEMAP[key]}
              </DropdownOption>
            ))}
          </DropdownList>
        </DropdownPopover>
      </DropdownInput>
    </LevelFilter>
  );
}
