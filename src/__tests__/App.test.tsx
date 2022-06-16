import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  const renderComponent = () => render(<App />);

  it('should allow typing of digits', () => {
    renderComponent();

    const inputEls = screen.queryAllByRole('textbox');

    expect(inputEls).toHaveLength(6);

    inputEls.forEach((inputEl) => {
      const digit = faker.datatype.number({ min: 0, max: 9 }).toString();

      fireEvent.change(inputEl, {
        target: { value: digit },
      });

      expect(inputEl).toHaveValue(digit);
    });
  });
});
