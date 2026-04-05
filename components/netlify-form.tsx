"use client";

import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useState
} from "react";

type NetlifyFormContextValue = {
  isSubmitting: boolean;
};

const NetlifyFormContext = createContext<NetlifyFormContextValue>({
  isSubmitting: false
});

type NetlifyFormProps = {
  name: string;
  formName: string;
  children: ReactNode;
};

function formDataToUrlEncoded(form: HTMLFormElement): string {
  const formData = new FormData(form);
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      params.append(key, value);
    }
  }
  return params.toString();
}

export function NetlifyForm({ name, formName, children }: NetlifyFormProps) {
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isSubmitting = status === "pending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("pending");
    setErrorMessage(null);
    try {
      const body = formDataToUrlEncoded(form);
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(`Something went wrong (${res.status}). Please try again.`);
      }
    } catch (e) {
      setStatus("error");
      setErrorMessage(e instanceof Error ? e.message : "Network error. Please try again.");
    }
  }

  return (
    <NetlifyFormContext.Provider value={{ isSubmitting }}>
      <div className="netlify-form-wrap">
        <form name={name} onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value={formName} />
          {children}
        </form>
        {status === "ok" ? (
          <p className="form-feedback form-feedback--success" role="status">
            Thank you — your submission was received.
          </p>
        ) : null}
        {status === "error" && errorMessage ? (
          <p className="form-feedback form-feedback--error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </NetlifyFormContext.Provider>
  );
}

type FormSubmitButtonProps = {
  label?: string;
  pendingLabel?: string;
};

export function FormSubmitButton({
  label = "Submit",
  pendingLabel = "Sending…"
}: FormSubmitButtonProps) {
  const { isSubmitting } = useContext(NetlifyFormContext);
  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? pendingLabel : label}
    </button>
  );
}
