import clsx from "clsx"
import { TERMS_OF_USE } from "../../shared/constants/carConstants";

export default function TermsOfUse({
  className = '',
  terms = [],
  onChange,
  disabled
}) {
  const handleCheckBoxChange = (event) => {
    const { value, checked } = event.target
    const newTerms = checked
      ? [...terms, removeWhitespace(value)].filter(
          (term, index, self) =>
            self.findIndex((t) => equalTerm(t, term)) === index
        )
      : terms.filter((term) => !equalTerm(term, value))
    onChange(newTerms)
  }

  const removeWhitespace = (str) => str.replace(/\s+/g, '')

  const equalTerm = (t1, t2) => {
    return removeWhitespace(t1) === removeWhitespace(t2)
  }

  return (
    <div className={clsx('row', className)}>
      {TERMS_OF_USE.map((item, index) => (
        <div key={index} className="col-6">
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value={item}
              id={`termCheckChecked${index}`}
              onChange={handleCheckBoxChange}
              checked={terms.some((t) => equalTerm(t, item))}
              disabled={disabled}
            />
            <label
              className="form-check-label"
              htmlFor={`termCheckChecked${index}`}
            >
              {item}
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}
