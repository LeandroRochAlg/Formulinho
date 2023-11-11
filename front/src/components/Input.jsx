const Input = ({ label, type, name, placeholder }) => {
    return (
        <div className="form-field">
        <label>{label}</label>
        <input type={type} name={name} placeholder={placeholder} />
        </div>
    );
    }

export default Input;