import probeImage from "@/assets/section3-binary-test.jpg";

export function ImagePipelineProbe() {
  return (
    <div className="hidden" aria-hidden="true">
      <img src={probeImage} alt="" />
    </div>
  );
}
