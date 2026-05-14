import { useId } from "react";

type FileFieldProps = {
  label: string;
  hint?: string;
  onChange: (file: File | null) => void;
};

export function FileField({ label, hint, onChange }: FileFieldProps) {
  const uid = useId();
  const inputId = `file-${uid}`;

  return (
    <div className="ui-field ui-file">
      <span className="ui-field__label" id={`${inputId}-lbl`}>
        {label}
      </span>
      {hint ? (
        <p className="ui-field__hint" id={`${inputId}-hint`}>
          {hint}
        </p>
      ) : null}
      <label className="ui-file__zone" htmlFor={inputId}>
        <input
          id={inputId}
          className="ui-file__input"
          type="file"
          accept="image/*"
          aria-labelledby={`${inputId}-lbl`}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        <span className="ui-file__cta">Choose file</span>
        <span className="ui-file__text">PNG, JPEG, or WebP. The file is kept on this device.</span>
      </label>
    </div>
  );
}
