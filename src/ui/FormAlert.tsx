type FormAlertProps = {
  message: string;
};

export function FormAlert({ message }: FormAlertProps) {
  return (
    <p className="ui-alert" role="alert">
      {message}
    </p>
  );
}
