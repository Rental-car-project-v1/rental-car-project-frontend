import clsx from "clsx"
import { ADDITIONAL_FUNCTIONS } from "../../shared/constants/carConstants";

export default function AdditionalFunctions({
    className = '',
    additionalFunctions = [],
    onChange,
    disabled
}) {

    const handleCheckBoxChange = (event) => {
        const { value, checked } = event.target
        const newFunc = checked
            ? [...additionalFunctions, removeWhitespace(value)].filter((func, index, self) => self.findIndex(t => equalFunc(t, func)) === index)
            : additionalFunctions.filter(func => !equalFunc(func, value))
        onChange(newFunc);
    }

    const removeWhitespace = (str) => str.replace(/\s+/g, '')

    const equalFunc = (t1, t2) => {
        return removeWhitespace(t1).toLowerCase() === removeWhitespace(t2).toLowerCase()
    }

    return (
        <div className={clsx("row", className)}>
            {ADDITIONAL_FUNCTIONS.map((item, index) => 
                <div key={index} className="col-6 col-md-4">
                    <div className="form-check mb-3">
                        <input className="form-check-input"
                            type="checkbox"
                            value={item.name}
                            id={`funcCheckChecked${index}`} 
                            onChange={handleCheckBoxChange}
                            checked={additionalFunctions.some(t => equalFunc(t, item.name))}
                            disabled={disabled}
                        />
                        <label className="form-check-label d-flex align-items-center gap-1"
                            htmlFor={`funcCheckChecked${index}`}
                        >
                            { item.icon }
                            { item.name }
                        </label>
                    </div>
                </div>
            )}
        </div>
    )
}