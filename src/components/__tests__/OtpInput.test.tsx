import { render, screen } from '@testing-library/react';
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
});
