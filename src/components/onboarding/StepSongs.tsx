import { Field, FieldArray, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { bumpStep, setSongs } from "@/features/onboardingSlice";
import { Button, ButtonRow, EmptyState, FormAlert, SectionTitle } from "@/ui";

type FormVals = { songs: string[] };

export default function StepSongs() {
  const dispatch = useAppDispatch();
  const fromRedux = useAppSelector((s) => s.onboarding.songs);

  const seed: FormVals = {
    songs: fromRedux.some((x) => x.trim().length > 0) ? [...fromRedux] : [""],
  };

  return (
    <div>
      <SectionTitle>Favorite songs</SectionTitle>

      <EmptyState
        title="Songs"
        description="Add titles. Use Add row for more lines. At least one title is required."
      />

      <Formik<FormVals>
        enableReinitialize
        initialValues={seed}
        validate={(v) => {
          const hits = v.songs.map((s) => s.trim()).filter(Boolean);
          if (!hits.length) return { songs: "Add at least one song." };
          return {};
        }}
        onSubmit={(vals) => {
          dispatch(setSongs(vals.songs));
          dispatch(bumpStep(1));
        }}
      >
        {({ values, errors }) => (
          <Form>
            <FieldArray name="songs">
              {(arr) => (
                <div>
                  {values.songs.map((_, idx) => (
                    <div className="ui-song-row" key={idx}>
                      <Field
                        name={`songs.${idx}`}
                        placeholder={`Song ${idx + 1}`}
                        type="text"
                        className="ui-input"
                        aria-label={`Song ${idx + 1}`}
                      />
                      {values.songs.length > 1 ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => arr.remove(idx)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  ))}
                  <ButtonRow>
                    <Button type="button" variant="ghost" size="sm" onClick={() => arr.push("")}>
                      Add row
                    </Button>
                  </ButtonRow>
                </div>
              )}
            </FieldArray>

            {typeof errors.songs === "string" ? <FormAlert message={errors.songs} /> : null}

            <ButtonRow>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  dispatch(setSongs(values.songs));
                  dispatch(bumpStep(-1));
                }}
              >
                Back
              </Button>
              <Button type="submit" variant="primary">
                Next
              </Button>
            </ButtonRow>
          </Form>
        )}
      </Formik>
    </div>
  );
}
