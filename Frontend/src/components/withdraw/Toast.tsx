import { CheckCircle2, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast = ({ message, type }: ToastProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg ${
          type === "success" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {type === "success" ? (
          <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
        )}
        <p
          className={`text-sm font-medium ${
            type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toast;
