/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { withContextSelector } from "./hocs/with-context-selector";
import { FormProvider, useFormContext } from "./context";

const pageCss = css``;

const Name = () => {
  const { name, setName } = useFormContext();
  console.log("Name component re-render");
  return (
    <input onChange={(event) => setName(event.target.value)} value={name} />
  );
};

const CountriesWithFormId = ({
  formId,
  countryName
}: {
  formId: string;
  countryName: string;
}) => {
  console.log("Countries with selector re-render");
  return (
    <div>
      <h3>List of countries for form: {formId}</h3>
      Selected country: {countryName}
      <ul>
        <li>Australia</li>
        <li>USA</li>
      </ul>
    </div>
  );
};

const CountriesWithFormIdSelector = withContextSelector(CountriesWithFormId, {
  formId: (data) => data.id,
  countryName: (data) => data.country
});

const Form = () => {
  return (
    <form css={pageCss}>
      <Name />
      <CountriesWithFormIdSelector />
    </form>
  );
};

export const Page = () => {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  );
};
