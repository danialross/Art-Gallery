import { createPortal } from "react-dom";
import { CgSpinner } from "react-icons/cg";

export default function LoadingSpinner() {
  return createPortal(
    <div className={"fixed top-0 left-0 w-screen h-screen backdrop-blur"}>
      <div className={"w-full h-full flex justify-center items-center"}>
        <CgSpinner className={"animate-spin text-secondary"} size="4rem" />
      </div>
    </div>,
    document.body,
  );
}
