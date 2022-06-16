import { fireEvent, render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import OtpInput, { Props } from '../OtpInput';

describe('<OtpInput />', () => {
  const renderComponent = (props: Props) => render(<OtpInput {...props} />);

  it('should accept value & valueLength props', () => {
    const value = faker.datatype.number({ min: 0, max: 999999 }).toString();
    const valueArray = value.split('');
    const valueLength = value.length;

    renderComponent({
      value,
      valueLength,
      onChange: jest.fn(),
    });

    const inputEls = screen.queryAllByRole('textbox');

    expect(inputEls).toHaveLength(valueLength);

    inputEls.forEach((inputEl, idx) => {
      expect(inputEl).toHaveValue(valueArray[idx]);
    });
  });

  it('should allow typing of digits', () => {
    const valueLength = faker.datatype.number({ min: 2, max: 6 });
    const onChange = jest.fn();

    renderComponent({
      valueLength,
      onChange,
      value: '',
    });

    const inputEls = screen.queryAllByRole('textbox');

    expect(inputEls).toHaveLength(valueLength);

    inputEls.forEach((inputEl, idx) => {
      const digit = faker.datatype.number({ min: 0, max: 9 }).toString();

      fireEvent.change(inputEl, {
        target: { value: digit },
      });

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(digit);

      const inputFocused = inputEls[idx + 1] || inputEl;

      expect(inputFocused).toHaveFocus();

      onChange.mockReset();
    });
  });

  it('should NOT allow typing of non-digits', () => {
    const valueLength = faker.datatype.number({ min: 2, max: 6 });
    const onChange = jest.fn();

    renderComponent({
      valueLength,
      onChange,
      value: '',
    });

    const inputEls = screen.queryAllByRole('textbox');

    expect(inputEls).toHaveLength(valueLength);

    inputEls.forEach((inputEl) => {
      const nonDigit = faker.random.alpha(1);

      fireEvent.change(inputEl, {
        target: { value: nonDigit },
      });

      expect(onChange).not.toBeCalled();

      onChange.mockReset();
    });
  });

  it('should allow deleting of digits (focus on previous element)', () => {
    const value = faker.datatype.number({ min: 10, max: 999999 }).toString();
    const valueLength = value.length;
    const lastIdx = valueLength - 1;
    const onChange = jest.fn();

    renderComponent({
      value,
      valueLength,
      onChange,
    });

    const inputEls = screen.queryAllByRole('textbox');

    expect(inputEls).toHaveLength(valueLength);

    for (let idx = lastIdx; idx > -1; idx--) {
      const inputEl = inputEls[idx];
      const target = { value: '' };

      fireEvent.change(inputEl, { target });
      fireEvent.keyDown(inputEl, {
        target,
        key: 'Backspace',
      });

      const valueArray = value.split('');

      valueArray[idx] = ' ';

      const expectedValue = valueArray.join('');

      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(expectedValue);

      const inputFocused = inputEls[idx - 1] || inputEl;

      expect(inputFocused).toHaveFocus();

      onChange.mockReset();
    }
  });

  it('should allow deleting of digits (do NOT focus on previous element)', () => {
    const value = faker.datatype.number({ min: 10, max: 999999 }).toString();
    const valueArray = value.split('');
    const valueLength = value.length;
    const lastIdx = valueLength - 1;

    renderComponent({
      value,
      valueLength,
      onChange: jest.fn(),
    });

    const inputEls = screen.queryAllByRole('textbox');

    expect(inputEls).toHaveLength(valueLength);

    for (let idx = lastIdx; idx > 0; idx--) {
      const inputEl = inputEls[idx];

      fireEvent.keyDown(inputEl, {
        key: 'Backspace',
        target: { value: valueArray[idx] },
      });

      const prevInputEl = inputEls[idx - 1];

      expect(prevInputEl).not.toHaveFocus();
    }
  });

  it('should handle paste event', () => {
    const value = faker.datatype.number({ min: 10, max: 999999 }).toString();
    const valueLength = value.length;
    const onChange = jest.fn();

    renderComponent({
      valueLength,
      onChange,
      value: '',
    });

    const inputEls = screen.queryAllByRole('textbox');
    const randomIdx = faker.datatype.number({ min: 0, max: valueLength - 1 });
    const randomInputEl = inputEls[randomIdx];

    fireEvent.change(randomInputEl, { target: { value } });

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(value);

    expect(randomInputEl).not.toHaveFocus();
  });
});
