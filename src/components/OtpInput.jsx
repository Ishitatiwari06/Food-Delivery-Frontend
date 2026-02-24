
export default function OtpInput({ otp, setOtp, onVerify, loading }) {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Enter OTP sent to your email</h3>
      <div className="mb-4 w-full flex justify-center">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
          className="w-48 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Enter 6-digit OTP"
        />
      </div>
      <button
        onClick={onVerify}
        disabled={loading || otp.length !== 6}
        className={`w-40 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
}
