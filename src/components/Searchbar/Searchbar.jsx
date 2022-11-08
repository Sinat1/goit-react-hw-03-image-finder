import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchFormBtn,
  StyledSearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { Component } from 'react';

class Searchbar extends Component {
  state = {
    requestName: '',
  };

  handleRequestChange = event => {
    this.setState({ requestName: event.currentTarget.value.toLowerCase() });
  };

  handleSumbit = event => {
    event.preventDefault();
    if (this.state.requestName.trim() === '') {
      return toast.warning('Type something in the input');
    }
    this.props.onSubmit(this.state.requestName);
    this.setState({ requestName: '' });
  };

  render() {
    return (
      <StyledSearchbar>
        <StyledSearchForm onSubmit={this.handleSumbit}>
          <StyledSearchFormBtn type="submit">
            <SearchIcon />
          </StyledSearchFormBtn>

          <StyledSearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.requestName}
            onChange={this.handleRequestChange}
          />
        </StyledSearchForm>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
