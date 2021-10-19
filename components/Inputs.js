import styles from "@styles/components/Inputs.module.css";
import { useField } from "formik";
import classNames from "classnames";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

export const Inputs = ({ input, ...props}) => {
    const { name, type, placeholder, prefix, suffix, options, required, handler, description} = input;
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;
    switch (type) {
        case "text":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                {description && (<span className={styles.field__description}>{description} </span>)}
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
                {description && (<span className={styles.field__description}>{description} </span>)}
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
        case "adress":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                {description && (<span className={styles.field__description}>{description} </span>)}
                <div className={styles.field__area}>
                    <input
                        className={styles.field__input}
                        placeholder={placeholder}
                        autoComplete="street-address"
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
                {description && (<span className={styles.field__description}>{description} </span>)}
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
                {description && (<span className={styles.field__description}>{description} </span>)}
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
        case "number":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                {description && (<span className={styles.field__description}>{description} </span>)}
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
            case "date":
            return (<div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                {description && (<span className={styles.field__description}>{description} </span>)}
                <div className={styles.field__area}>
                    <input
                        type="date"
                        className={styles.field__input}
                        placeholder={placeholder}
                        {...field}
                        {...props}
                    />
                    {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>)
        case "button": 
            return (
            <div className={classNames(styles.field, styles[type])}>
                <button
                    type="button"
                    className={classNames(styles.field__prefix, "link")}
                    onClick={() => { setValue(handler[0](handler[1]()))}}
                    >
                    {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                    </button>
                    </div>
            )
        case "select":
            return (
            <div className={classNames(styles.field, styles[type])}>
                {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                    {description && (<span className={styles.field__description}>{description} </span>)}
                    <div className={styles.field__area}>
                        <Select 
                            className={styles.field__input}
                            classNamePrefix="select"
                            value={options ? options.find(option => option.value === field.value) : ''}
                            onChange={(option) => {setValue(option.value)}}
                            onBlur={field.onBlur}
                            options={options}
                        />
                    {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                </div>
            </div>)
        case "creatableSelect":
            return (
                <div className={classNames(styles.field, styles[type])}>
                    {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                    {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                    {description && (<span className={styles.field__description}>{description} </span>)}
                    <div className={styles.field__area}>
                        <CreatableSelect
                            className={styles.field__input}
                            classNamePrefix="select"
                            isMulti
                            onChange={(values) => {setValue(values.map(el => el.value))}}
                            options={options}
                        />
                        {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                    </div>
                </div>)
        case "multiSelect":
            return (
                <div className={classNames(styles.field, styles[type])}>
                    {meta.touched && meta.error ? (<div className={styles.field__error}>{meta.error}</div>) : null}
                    {prefix && (<span className={styles.field__prefix}>{prefix} {required && (<strong className={styles.required}>*</strong>)}</span>)}
                    {description && (<span className={styles.field__description}>{description} </span>)}
                    <div className={styles.field__area}>
                        <Select
                            className={styles.field__input}
                            styles={{padding:"0 !important"}}
                            classNamePrefix="select"
                            // value={options ? options.find(option => option.value === field.value) : ''}
                            isMulti
                            onChange={(values) => {setValue(values.map(el => el.value))}}
                            onBlur={field.onBlur}
                            options={options}
                        />
                        {suffix && (<label className={styles.field__suffix}>{suffix}</label>)}
                    </div>
                </div>)
     
        default:
            console.log(`❌ Unsupported input (${type})`);
            return ``;
    }
}
