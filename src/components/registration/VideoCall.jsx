import zoom from "../../assets/zoom.svg";
import "./VideoCall.css";

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
];

const VideoCall = ({
  formData,
  onFormDataChange,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
}) => {
  const handleInputChange = (field, value) => {
    onFormDataChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.videoMode && formData.selectedDate && formData.selectedTime) {
      onNext();
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2 className="step-title">Get On a Video</h2>
        <p className="step-question">What video calling mode do you prefer?</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="video-options-grid">
          <label
            className={`video-option-tile ${
              formData.videoMode === "zoom" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="videoMode"
              value="zoom"
              checked={formData.videoMode === "zoom"}
              onChange={(e) => handleInputChange("videoMode", e.target.value)}
            />
            <div className="video-option-content">
              <div className="video-option-icon">
                <img src={zoom} alt="Zoom" />
              </div>
              <div>
                <h3>Zoom</h3>
                <p>Encrypted HD video calling with waiting room.</p>
              </div>
            </div>
          </label>
        </div>

        <div className="date-time-grid">
          <div className="date-picker-card">
            <div className="date-picker-header">
              <h4>Select a date</h4>
              <p>Pick a suitable date for the video call</p>
            </div>
            <div className="date-picker-input">
              <input
                type="date"
                id="selectedDate"
                value={formData.selectedDate}
                onChange={(e) =>
                  handleInputChange("selectedDate", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="time-picker-card">
            <div className="time-picker-header">
              <h4>Select a time</h4>
              <p>Choose an available slot</p>
            </div>
            <div className="time-slots-grid">
              {timeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={`time-slot ${
                    formData.selectedTime === slot ? "selected" : ""
                  }`}
                  onClick={() => handleInputChange("selectedTime", slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-back" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-next">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoCall;
