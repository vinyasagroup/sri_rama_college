import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface AutoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const AutoTextarea = ({ value, ...props }: AutoTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <Textarea
      ref={ref}
      value={value}
      onInput={resize}
      rows={2} // 👈 small initially
      className="resize-none overflow-hidden min-h-[40px] rounded-xl"
      {...props}
    />
  );
};

export default AutoTextarea;