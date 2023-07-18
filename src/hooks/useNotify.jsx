import { toast } from "react-toastify";

const useNotify = () => {
  const notify = (type, message) =>
    toast(`${message}`, {
      type: type,
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return { notify };
};

export default useNotify;
