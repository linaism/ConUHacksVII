import ReactSlider from "react-slider";
import "./slider.css";
const Slider = ({ onChange, currentIndex }) => {
  return (
    <ReactSlider
      className="horizontal-slider"
      thumbClassName="example-thumb"
      trackClassName="example-track"
      value={currentIndex}
      min={0}
      max={240000}
      defaultValue={0}
    />
  );
};
export default Slider;