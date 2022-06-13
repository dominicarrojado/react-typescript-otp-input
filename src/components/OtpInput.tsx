import './OtpInput.css';

type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function OtpInput(props: Props) {
  return (
    <div className="otp-group">
      {[1, 2, 3, 4, 5, 6].map((value, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={1}
          className="otp-input"
          value={value}
        />
      ))}
    </div>
  );
}
