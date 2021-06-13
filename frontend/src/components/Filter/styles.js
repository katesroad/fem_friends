import { Button } from 'components/lib'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components/macro'
import { FaAngleDown } from 'react-icons/fa'
import * as mediaQueries from 'styles/media-queries'
import { themeStyles } from 'styles/styles'
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox'
import '@reach/listbox/styles.css'

const DropdownButton = styled(ListboxButton)`
	display: flex;0
	justify-content: flex-start;
	align-items: center;
	padding: 0.5rem 0.5rem;
	border: 0;
	outline: 0;
`

const DropdownArrow = styled(FaAngleDown)`
  font-size: 1.5rem;
  color: var(--colors-text);
`

const DropdownOption = styled(ListboxOption)`
  ${themeStyles}
  padding: 0.35rem 0.5rem;
  text-transform: capitalize;
  cursor: pointer;
`

const DropdownPopover = styled(ListboxPopover)`
  border: 0;
  margin: 0;
  ${themeStyles}
`

const DropdownInput = styled(ListboxInput)`
  padding-top: 2px;
  padding-bottom: 2px;
  border: 0;
  margin: 0;
`

const DropdownList = styled(ListboxList)`
  padding-top: 1px;
  padding-bottom: 2px;
  border: 0;
  margin: 0;
`

const Filter = styled.div`
  display: block;
  padding: 0.3rem 0;
  border-radius: 0.2rem;
  box-shadow: 1px 2px 5px var(--shadow);
  transition: all 0.3s ease 0s;
  ${mediaQueries.small} {
    width: 50%;
  }
`

const LevelFilter = styled(Filter)`
  ${mediaQueries.medium} {
    display: block;
    width: 40%;
    max-width: 240px;
  }
`
LevelFilter.displayName = 'LevelFilter'

const Form = styled(Filter)`
  width: 100%;
  font-size: 1rem;
`
Form.displayName = 'FORM'

const Input = styled.input`
  width: 80%;
  padding: 0.7rem;
  font-size: 1.25rem;
  color: var(--colors-text);
  background-color: transparent;
`

const Label = styled.label`
  display: flex;
  align-items: center;
`

const SearchButton = styled(Button)`
  background-color: transparent;
`

const SearchIcon = styled(FaSearch)`
  font-size: 1.25rem;
`

export {
  LevelFilter,
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
}
