import { Toaster, ToastIcon, resolveValue } from 'react-hot-toast';

const CustomToaster = () => {
  return (
    <Toaster position="top-center">
      {(t) => (
        <div
          className={`rounded-lg border-slate-400 bg-white px-6 py-4 ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
          <ToastIcon toast={t} />
          <p className="mt-3">{resolveValue(t.message)}</p>
        </div>
      )}
    </Toaster>
  );
};

export default CustomToaster;
