import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import LoginPage from "../../pages/login/index";

const LoginModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      setOpen(false);
      setTimeout(() => {
        props.onClose();
      }, 200);
    },
  }));

  return (
    <div
      className="fixed z-40 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen py-5 text-center sm:block">
        <div
          onClick={() => {
            setOpen(!open);
            setTimeout(() => {
              props.onClose();
            }, 200);
          }}
          className={
            open
              ? "ease-in duration-200 opacity-100 fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              : "opacity-0 ease-out duration-300 fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          }
          aria-hidden="true"
        ></div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={
            open
              ? "ease-in duration-200 opacity-100 translate-y-0 sm:scale-100 inline-block bg-white rounded-lg pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle max-w-3xl sm:p-6"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95 ease-out duration-300 inline-block bg-white rounded-lg pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle max-w-3xl sm:p-6"
          }
        >
          <div
            className="font-medium mx-auto"
            onClick={() => {
              setOpen(!open);
              setTimeout(() => {
                props.onClose();
              }, 200);
            }}
          >
            <AiOutlineClose className="cursor-pointer ml-auto" />
          </div>
          <LoginPage
            modal={true}
            closeModal={() => {
              setOpen(!open);
              console.log("NEW MODAL");
              setTimeout(() => {
                props.onClose("add");
              }, 200);
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default LoginModal;
