import styles from "@styles/components/Inputs.module.css";
import { useField } from "formik";
import classNames from "classnames";

export const Inputs = ({ input, ...props}) => {
    const { name, type, placeholder, prefix, suffix, options, required, handler} = input;
    const [field, meta, helpers] = useField(props);
    switch (type) {
        case "text":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>
                <textarea 
                className={styles.field__input}
                placeholder={placeholder}
                {...field}
                {...props}
                />
                {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>
            );

        case "shortText":
            return (<div className={classNames(styles.field, styles[type])}>
                    {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>
                    <input
                        className={styles.field__input}
                        placeholder={placeholder}
                        {...field} 
                        {...props}
                        />
                    {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                        </div>
                </div>
            );
        case "url":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>
                <input
                    type="url"
                    className={styles.field__input}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                    />
                {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>
            );
        case "mail":
            return (<div className={classNames(styles.field, styles[type])}>
                    {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>
                    
                    <input
                        type ="email"
                        className={styles.field__input}
                        placeholder={placeholder}
                        {...field} 
                        {...props}
                        />
                    {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
                </div>
            );
        case "number" : 
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>

                    <input
                        type="number"
                        className={styles.field__input}
                        placeholder={placeholder}
                        {...field}
                        {...props}
                        />
                    {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>)
        case "button": 
            const { setValue } = helpers;
            return (<div className={classNames(styles.field, styles[type])}>
                <button
                    type="button"
                    className={classNames(styles.field__prefix, "link")}
                    onClick={() => { setValue(handler[0](handler[1]()))}}
                    >
                    {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                    </button>
                    </div>
            )
        case "singleSelect":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>
                <select
                    className={styles.field__input}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                    dir="rtl"
                    >
                    {options && Object.keys(options).map((el, i) => (
                        <option key={i} value={el}>{options[el]}</option>
                        ))}
                </select>
                {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>)
        case "multiSelect":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                <div className={styles.field__area}>
                <select
                    multiple
                    className={styles.field__input}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                    dir="rtl"
                >
                    {options && Object.keys(options).map((el, i) => (
                        <option key={i} value={el}>{options[el]}</option>
                    ))}
                </select>
                {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>)
     
        default:
            console.log(`❌ Unsupported input (${type})`);
            return ``;
    }
}
