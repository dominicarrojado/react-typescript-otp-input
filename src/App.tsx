import { useState } from 'react';
import OtpInput from './components/OtpInput';
import './App.css';

export default function App() {
  const [otp, setOtp] = useState('');
  const onChange = (value: string) => setOtp(value);

  return (
    <div className="container">
      <h1>React TypeScript OTP Input</h1>
      <OtpInput value={otp} valueLength={6} onChange={onChange} />
      <footer className="footer">
        <a href="https://dominicarrojado.com/posts/how-to-create-your-own-otp-input-in-react-and-typescript-with-tests-part-1/">
          Learn how to build this OTP input in React and TypeScript
        </a>
      </footer>
    </div>
  );
}
